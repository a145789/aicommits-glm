import { intro, outro, spinner } from "@clack/prompts"
import fs from "fs/promises"
import { bgCyan, black, green, red } from "kolorist"
import { getConfig } from "../utils/config.js"
import { KnownError, handleCliError } from "../utils/error.js"
import { getStagedDiff } from "../utils/git.js"
import { generateCommitMessage } from "../utils/glm.js"

const [messageFilePath, commitSource] = process.argv.slice(2)

export default () =>
  (async () => {
    if (!messageFilePath) {
      throw new KnownError(
        'Commit message file path is missing. This file should be called from the "prepare-commit-msg" git hook',
      )
    }

    // If a commit message is passed in, ignore
    if (commitSource) {
      return
    }

    // All staged files can be ignored by our filter
    const staged = await getStagedDiff()
    if (!staged) {
      return
    }

    intro(bgCyan(black(" aicommits ")))

    const { env } = process
    const config = await getConfig({
      proxy:
        env.https_proxy || env.HTTPS_PROXY || env.http_proxy || env.HTTP_PROXY,
    })

    const s = spinner()
    s.start("The AI is analyzing your changes")
    let messages: string[]
    try {
      messages = await generateCommitMessage(
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
    } finally {
      s.stop("Changes analyzed")
    }

    /**
     * When `--no-edit` is passed in, the base commit message is empty,
     * and even when you use pass in comments via #, they are ignored.
     *
     * Note: `--no-edit` cannot be detected in argvs so this is the only way to check
     */
    const baseMessage = await fs.readFile(messageFilePath, "utf8")
    const supportsComments = baseMessage !== ""
    const hasMultipleMessages = messages.length > 1

    let instructions = ""

    if (supportsComments) {
      instructions = `# 🤖 AI generated commit${
        hasMultipleMessages ? "s" : ""
      }\n`
    }

    if (hasMultipleMessages) {
      if (supportsComments) {
        instructions +=
          "# Select one of the following messages by uncommeting:\n"
      }
      instructions += `\n${messages
        .map((message) => `# ${message}`)
        .join("\n")}`
    } else {
      if (supportsComments) {
        instructions += "# Edit the message below and commit:\n"
      }
      instructions += `\n${messages[0]}\n`
    }

    await fs.appendFile(messageFilePath, instructions)
    outro(`${green("✔")} Saved commit message!`)
  })().catch((error) => {
    outro(`${red("✖")} ${error.message}`)
    handleCliError(error)
    process.exit(1)
  })
