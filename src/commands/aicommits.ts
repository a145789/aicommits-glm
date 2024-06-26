import {
  confirm,
  intro,
  isCancel,
  outro,
  select,
  spinner,
} from "@clack/prompts"
import { execa } from "execa"
import { bgCyan, black, dim, green, red } from "kolorist"
import { getConfig } from "../utils/config.js"
import { KnownError, handleCliError } from "../utils/error.js"
import {
  assertGitRepo,
  getDetectedMessage,
  getStagedDiff,
} from "../utils/git.js"
import { generateCommitMessage } from "../utils/glm.js"

export default async function (
  generate: number | undefined,
  excludeFiles: string[],
  stageAll: boolean,
  commitType: string | undefined,
  rawArgv: string[],
) {
  try {
    intro(bgCyan(black(" aicommits ")))
    await assertGitRepo()

    const detectingFiles = spinner()

    if (stageAll) {
      // This should be equivalent behavior to `git commit --all`
      await execa("git", ["add", "--update"])
    }

    detectingFiles.start("Detecting staged files")
    const staged = await getStagedDiff(excludeFiles)

    if (!staged) {
      detectingFiles.stop("Detecting staged files")
      throw new KnownError(
        "No staged changes found. Stage your changes manually, or automatically stage all changes with the `--all` flag.",
      )
    }

    detectingFiles.stop(
      `${getDetectedMessage(staged.files)}:\n${staged.files
        .map((file) => `     ${file}`)
        .join("\n")}`,
    )

    const { env } = process
    const config = await getConfig({
      AI_KEY: env.AI_KEY || env.AI_API_KEY,
      proxy:
        env.https_proxy || env.HTTPS_PROXY || env.http_proxy || env.HTTP_PROXY,
      generate: generate?.toString(),
      type: commitType?.toString(),
    })

    const s = spinner()
    s.start("The AI is analyzing your changes")

    const messages = await generateCommitMessage(
      config.AI_KEY,
      config.model,
      config.locale,
      staged.diff,
      config.generate,
      config["max-length"],
      config.type,
      config.timeout,
      config.proxy,
    )

    s.stop()

    if (messages.length === 0) {
      throw new KnownError("No commit messages were generated. Try again.")
    }

    let message: string
    if (messages.length === 1) {
      ;[message] = messages
      const confirmed = await confirm({
        message: `Use this commit message?\n\n   ${message}\n`,
      })

      if (!confirmed || isCancel(confirmed)) {
        outro("Commit cancelled")
        process.exit(0)
      }
    } else {
      const selected = await select({
        message: `Pick a commit message to use: ${dim("(Ctrl+c to exit)")}`,
        options: messages.map((value) => ({ label: value, value })),
      })

      if (isCancel(selected)) {
        outro("Commit cancelled")
        process.exit(0)
      }

      message = selected as string
    }

    await execa("git", ["commit", "-m", message, ...rawArgv])

    outro(`${green("✔")} Successfully committed!`)
    process.exit(0)
  } catch (error: any) {
    outro(`${red("✖")} ${error.message}`)
    handleCliError(error)
    process.exit(1)
  }
}
