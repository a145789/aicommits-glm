import type { CommitType } from "./config.js"

const commitTypeFormats: Record<CommitType, string> = {
  "": "<commit message>",
  conventional: "<type>(<optional scope>): <commit message>",
}
const specifyCommitFormat = (type: CommitType) =>
  `The output response must be in format:\n${commitTypeFormats[type]}`

const commitTypes: Record<CommitType, string> = {
  "": "",

  /**
   * References:
   * Commitlint:
   * https://github.com/conventional-changelog/commitlint/blob/18fbed7ea86ac0ec9d5449b4979b762ec4305a92/%40commitlint/config-conventional/index.js#L40-L100
   *
   * Conventional Changelog:
   * https://github.com/conventional-changelog/conventional-changelog/blob/d0e5d5926c8addba74bc962553dd8bcfba90e228/packages/conventional-changelog-conventionalcommits/writer-opts.js#L182-L193
   */
  conventional: `Choose a type from the type-to-description JSON below that best describes the git diff:\n${JSON.stringify(
    {
      docs: "Documentation only changes",
      style:
        "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      refactor: "A code change that neither fixes a bug nor adds a feature",
      perf: "A code change that improves performance",
      test: "Adding missing tests or correcting existing tests",
      build: "Changes that affect the build system or external dependencies",
      ci: "Changes to our CI configuration files and scripts",
      chore: "Other changes that don't modify src or test files",
      revert: "Reverts a previous commit",
      feat: "A new feature",
      fix: "A bug fix",
    },
    null,
    2,
  )}`,
}

export const generatePrompt = (
  locale: string,
  maxLength: number,
  type: CommitType,
) =>
  [
    `You are an advanced AI programming assistant tasked with summarizing code changes into a concise and meaningful commit message.   Compose a commit message that:
    - Strictly synthesizes meaningful information from the provided code diff
    - Utilizes any additional user-provided context to comprehend the rationale behind the code changes
    - Is clear and brief, with an informal yet professional tone, and without superfluous descriptions
    - Avoids unnecessary phrases such as "this commit", "this change", and the like
    - Avoids direct mention of specific code identifiers, names, or file names, unless they are crucial for understanding the purpose of the changes
    - Most importantly emphasizes the 'why' of the change, its benefits, or the problem it addresses rather than only the 'what' that changed
    
    Follow the user's instructions carefully, don't repeat yourself, don't include the code in the output, or make anything up!`,
    "Generate a concise git commit message written in present tense for the following code diff with the given specifications below:",
    `Message language: ${locale}`,
    `Commit message must be a maximum of ${maxLength} characters.`,
    "Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.",
    commitTypes[type],
    specifyCommitFormat(type),
  ]
    .filter(Boolean)
    .join("\n")
