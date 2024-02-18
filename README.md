> `fork` 于 [aicommits](https://github.com/Nutlope/aicommits)，使用 [智谱AI · GML4](https://open.bigmodel.cn/) 生成 `git commit message`，大部分 `API` 兼容 [aicommits 文档](https://github.com/a145789/aicommits-glm#usage)。

## 不同

- 使用流程
   1. Install

      ```sh
      pnpm add aicommits-glm -g
      ```

   2. 在 [此处](https://open.bigmodel.cn/usercenter/apikeys) 获取 `智谱AI API Key`

   3. 配置 `API KY`

      ```sh
      aicommits config set AI_KEY=<your token>
      ```

- 可配置工作区 `.aicommits`
   
   ```sh
   aicommits config set AI_KEY=<your token>
   ```

   将会在全局创建 `.aicommits` 文件，用作全局配置。可使用 `-w`

   ```sh
   aicommits config set AI_KEY=<your token> -w
   aicommits config set type=conventional -w
   ```
   可在工作区生成配置文件，文件项会覆盖全局配置。
   
   > **注意！！！谨慎保存你的 AI KEY， 不要把 KEY 写到工作区配置中，一旦上传至远程仓库，很容易造成泄露。**
   
---

<div align="center">
  <div>
    <img src=".github/screenshot.png" alt="AI Commits"/>
    <h1 align="center">AI Commits</h1>
  </div>
	<p>A CLI that writes your git commit messages for you with AI. Never write a commit message again.</p>
	<a href="https://www.npmjs.com/package/aicommits-glm"><img src="https://img.shields.io/npm/v/aicommits-glm" alt="Current version"></a>
</div>

---

## ~~Setup~~

> ~~The minimum supported version of Node.js is the latest v14. Check your Node.js version with `node --version`.~~

1. ~~Install _aicommits_:~~

   ```sh
   #npm install -g aicommits
   ```

2. ~~Retrieve your API key from [AI](https://platform.openai.com/account/api-keys)~~

   > ~~Note: If you haven't already, you'll have to create an account and set up billing.~~

3. ~~Set the key so aicommits can use it:~~

   ```sh
   #aicommits config set OPENAI_KEY=<your token>
   ```

   ~~This will create a `.aicommits` file in your home directory.~~

### Upgrading

Check the installed version with:

```
aicommits --version
```

If it's not the [latest version](https://github.com/Nutlope/aicommits/releases/latest), run:

```sh
npm update -g aicommits
```

## Usage

### CLI mode

You can call `aicommits` directly to generate a commit message for your staged changes:

```sh
git add <files...>
aicommits
```

`aicommits` passes down unknown flags to `git commit`, so you can pass in [`commit` flags](https://git-scm.com/docs/git-commit).

For example, you can stage all changes in tracked files with as you commit:

```sh
aicommits --all # or -a
```

> 👉 **Tip:** Use the `aic` alias if `aicommits` is too long for you.

#### Generate multiple recommendations

Sometimes the recommended commit message isn't the best so you want it to generate a few to pick from. You can generate multiple commit messages at once by passing in the `--generate <i>` flag, where 'i' is the number of generated messages:

```sh
aicommits --generate <i> # or -g <i>
```

> Warning: this uses more tokens, meaning it costs more.

#### Generating Conventional Commits

If you'd like to generate [Conventional Commits](https://conventionalcommits.org/), you can use the `--type` flag followed by `conventional`. This will prompt `aicommits` to format the commit message according to the Conventional Commits specification:

```sh
aicommits --type conventional # or -t conventional
```

This feature can be useful if your project follows the Conventional Commits standard or if you're using tools that rely on this commit format.

### Git hook

You can also integrate _aicommits_ with Git via the [`prepare-commit-msg`](https://git-scm.com/docs/githooks#_prepare_commit_msg) hook. This lets you use Git like you normally would, and edit the commit message before committing.

#### Install

In the Git repository you want to install the hook in:

```sh
aicommits hook install
```

#### Uninstall

In the Git repository you want to uninstall the hook from:

```sh
aicommits hook uninstall
```

#### Usage

1. Stage your files and commit:

   ```sh
   git add <files...>
   git commit # Only generates a message when it's not passed in
   ```

   > If you ever want to write your own message instead of generating one, you can simply pass one in: `git commit -m "My message"`

2. Aicommits will generate the commit message for you and pass it back to Git. Git will open it with the [configured editor](https://docs.github.com/en/get-started/getting-started-with-git/associating-text-editors-with-git) for you to review/edit it.

3. Save and close the editor to commit!

## Configuration

### Reading a configuration value

To retrieve a configuration option, use the command:

```sh
aicommits config get <key>
```

For example, to retrieve the API key, you can use:

```sh
aicommits config get OPENAI_KEY
```

You can also retrieve multiple configuration options at once by separating them with spaces:

```sh
aicommits config get OPENAI_KEY generate
```

### Setting a configuration value

To set a configuration option, use the command:

```sh
aicommits config set <key>=<value>
```

For example, to set the API key, you can use:

```sh
aicommits config set OPENAI_KEY=<your-api-key>
```

You can also set multiple configuration options at once by separating them with spaces, like

```sh
aicommits config set OPENAI_KEY=<your-api-key> generate=3 locale=en
```

### Options

#### OPENAI_KEY

Required

The AI API key. You can retrieve it from [AI API Keys page](https://platform.openai.com/account/api-keys).

#### locale

Default: `en`

The locale to use for the generated commit messages. Consult the list of codes in: https://wikipedia.org/wiki/List_of_ISO_639-1_codes.

#### generate

Default: `1`

The number of commit messages to generate to pick from.

Note, this will use more tokens as it generates more results.

#### proxy

Set a HTTP/HTTPS proxy to use for requests.

To clear the proxy option, you can use the command (note the empty value after the equals sign):

```sh
aicommits config set proxy=
```

#### model

Default: `gpt-3.5-turbo`

The Chat Completions (`/v1/chat/completions`) model to use. Consult the list of models available in the [AI Documentation](https://platform.openai.com/docs/models/model-endpoint-compatibility).

> Tip: If you have access, try upgrading to [`gpt-4`](https://platform.openai.com/docs/models/gpt-4) for next-level code analysis. It can handle double the input size, but comes at a higher cost. Check out AI's website to learn more.

#### timeout

The timeout for network requests to the AI API in milliseconds.

Default: `10000` (10 seconds)

```sh
aicommits config set timeout=20000 # 20s
```

#### max-length

The maximum character length of the generated commit message.

Default: `50`

```sh
aicommits config set max-length=100
```

#### type

Default: `""` (Empty string)

The type of commit message to generate. Set this to "conventional" to generate commit messages that follow the Conventional Commits specification:

```sh
aicommits config set type=conventional
```

You can clear this option by setting it to an empty string:

```sh
aicommits config set type=
```

## How it works

This CLI tool runs `git diff` to grab all your latest code changes, sends them to AI's GPT-3, then returns the AI generated commit message.

Video coming soon where I rebuild it from scratch to show you how to easily build your own CLI tools powered by AI.

## Maintainers

- **Hassan El Mghari**: [@Nutlope](https://github.com/Nutlope) [<img src="https://img.shields.io/twitter/follow/nutlope?style=flat&label=nutlope&logo=twitter&color=0bf&logoColor=fff" align="center">](https://twitter.com/nutlope)

- **Hiroki Osame**: [@privatenumber](https://github.com/privatenumber) [<img src="https://img.shields.io/twitter/follow/privatenumbr?style=flat&label=privatenumbr&logo=twitter&color=0bf&logoColor=fff" align="center">](https://twitter.com/privatenumbr)

## Contributing

If you want to help fix a bug or implement a feature in [Issues](https://github.com/Nutlope/aicommits/issues), checkout the [Contribution Guide](CONTRIBUTING.md) to learn how to setup and test the project
