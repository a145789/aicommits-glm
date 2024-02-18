import os from "os"
import path from "path"
import fs from "fs/promises"
import ini from "ini"
import { KnownError } from "./error.js"
import { fileExists } from "./fs.js"
import { cwd } from "process"

const commitTypes = ["", "conventional"] as const

export type CommitType = (typeof commitTypes)[number]

export type Model = "glm-4" | "glm-3-turbo"

export const hasOwn = (object: unknown, key: PropertyKey) =>
  Object.prototype.hasOwnProperty.call(object, key)

const parseAssert = (name: string, condition: any, message: string) => {
  if (!condition) {
    throw new KnownError(`Invalid config property ${name}: ${message}`)
  }
}

const configParsers = {
  AI_KEY(key?: string) {
    if (!key) {
      throw new KnownError(
        "Please set your AI API key via `aicommits config set AI_KEY=<your token>`",
      )
    }

    return key
  },
  locale(locale?: string) {
    if (!locale) {
      return "zh-CN"
    }

    parseAssert("locale", locale, "Cannot be empty")
    parseAssert(
      "locale",
      /^[a-z-]+$/i.test(locale),
      "Must be a valid locale (letters and dashes/underscores). You can consult the list of codes in: https://wikipedia.org/wiki/List_of_ISO_639-1_codes",
    )
    return locale
  },
  generate(count?: string) {
    if (!count) {
      return 1
    }

    parseAssert("generate", /^\d+$/.test(count), "Must be an integer")

    const parsed = Number(count)
    parseAssert("generate", parsed > 0, "Must be greater than 0")
    parseAssert("generate", parsed <= 5, "Must be less or equal to 5")

    return parsed
  },
  type(type?: string) {
    if (!type) {
      return ""
    }

    parseAssert(
      "type",
      commitTypes.includes(type as CommitType),
      "Invalid commit type",
    )

    return type as CommitType
  },
  proxy(url?: string) {
    if (!url || url.length === 0) {
      return undefined
    }

    parseAssert("proxy", /^https?:\/\//.test(url), "Must be a valid URL")

    return url
  },
  model(model?: string): Model {
    if (!model || model.length === 0) {
      return "glm-4"
    }

    return model as Model
  },
  timeout(timeout?: string) {
    if (!timeout) {
      return 10_000
    }

    parseAssert("timeout", /^\d+$/.test(timeout), "Must be an integer")

    const parsed = Number(timeout)
    parseAssert("timeout", parsed >= 500, "Must be greater than 500ms")

    return parsed
  },
  "max-length"(maxLength?: string) {
    if (!maxLength) {
      return 50
    }

    parseAssert("max-length", /^\d+$/.test(maxLength), "Must be an integer")

    const parsed = Number(maxLength)
    parseAssert(
      "max-length",
      parsed >= 20,
      "Must be greater than 20 characters",
    )

    return parsed
  },
} as const

type ConfigKeys = keyof typeof configParsers

type RawConfig = {
  [key in ConfigKeys]?: string
}

export type ValidConfig = {
  [Key in ConfigKeys]: ReturnType<(typeof configParsers)[Key]>
}

const configPath = path.join(os.homedir(), ".aicommits")
const workSpaceConfigPath = path.join(cwd(), ".aicommits")

const readConfigFile = async (): Promise<{
  globConfig: RawConfig
  workSpaceConfig: RawConfig
}> => {
  const configExists = await fileExists(configPath)
  const workSpaceConfigExists = await fileExists(workSpaceConfigPath)

  let workSpaceConfig: RawConfig = Object.create(null)
  if (workSpaceConfigExists) {
    const workSpaceConfigString = await fs.readFile(workSpaceConfigPath, "utf8")
    workSpaceConfig = ini.parse(workSpaceConfigString)
  }

  let globConfig: RawConfig = Object.create(null)
  if (configExists) {
    const configString = await fs.readFile(configPath, "utf8")
    globConfig = ini.parse(configString)
  }
  return {
    globConfig,
    workSpaceConfig,
  }
}

export const getConfig = async (
  cliConfig?: RawConfig,
  suppressErrors?: boolean,
): Promise<ValidConfig> => {
  const { globConfig, workSpaceConfig } = await readConfigFile()
  const config = { ...globConfig, ...workSpaceConfig }
  const parsedConfig: Record<string, unknown> = {}

  for (const key of Object.keys(configParsers) as ConfigKeys[]) {
    const parser = configParsers[key]
    const value = cliConfig?.[key] ?? config[key]

    if (suppressErrors) {
      try {
        parsedConfig[key] = parser(value)
      } catch {}
    } else {
      parsedConfig[key] = parser(value)
    }
  }

  return parsedConfig as ValidConfig
}

export const setConfigs = async (
  keyValues: [key: string, value: string][],
  isWorkSpace?: boolean,
) => {
  const { globConfig, workSpaceConfig } = await readConfigFile()
  const config = isWorkSpace ? workSpaceConfig : globConfig

  for (const [key, value] of keyValues) {
    if (!hasOwn(configParsers, key)) {
      throw new KnownError(`Invalid config property: ${key}`)
    }

    const parsed = configParsers[key as ConfigKeys](value)
    config[key as ConfigKeys] = parsed as any
  }

  const path = isWorkSpace ? workSpaceConfigPath : configPath
  await fs.writeFile(path, ini.stringify(config), "utf8")
}
