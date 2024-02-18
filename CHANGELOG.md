## [0.0.2](https://github.com/Nutlope/aicommits/compare/v0.0.1...v0.0.2) (2024-2-18)


### Features

* 增加工作区配置支持及优化配置读取逻辑 ([ffcae05](https://github.com/Nutlope/aicommits/commit/ffcae05cbe4a273954006972c502b6face863e1e))



## [0.0.1](https://github.com/Nutlope/aicommits/compare/c017ff56007bc04877390e4dd1b533beab0ed5ea...v0.0.1) (2024-2-18)


### Bug Fixes

* --all flag to only stage tracked files ([9a841d9](https://github.com/Nutlope/aicommits/commit/9a841d946fd4d0fc6a56b64728ca8425a7c3990a))
* `bin` path outdated from `src` consolidation ([#41](https://github.com/Nutlope/aicommits/issues/41)) ([c017ff5](https://github.com/Nutlope/aicommits/commit/c017ff56007bc04877390e4dd1b533beab0ed5ea))
* `git diff` to respect excluded files ([#181](https://github.com/Nutlope/aicommits/issues/181)) ([ad2533e](https://github.com/Nutlope/aicommits/commit/ad2533eb2feb51509aea7b662985fad2dcd137aa))
* **config:** allow get on config properties without key ([4d7712f](https://github.com/Nutlope/aicommits/commit/4d7712f1e893b9768ce91faee69112063d782769))
* content-length miscalculation bug ([#147](https://github.com/Nutlope/aicommits/issues/147)) ([fed577b](https://github.com/Nutlope/aicommits/commit/fed577b960f269bb1e91394650f9cd0cd1fe86f5))
* dont log unknown config property ([09c2c98](https://github.com/Nutlope/aicommits/commit/09c2c98e056726cbd7323f5058a5ab07bcec0863))
* handle unknown config property ([#141](https://github.com/Nutlope/aicommits/issues/141)) ([4876e8d](https://github.com/Nutlope/aicommits/commit/4876e8d966b6dc6a13491018e730ad9384c9cdbf))
* handle unreachable openai.com ([#100](https://github.com/Nutlope/aicommits/issues/100)) ([75d7700](https://github.com/Nutlope/aicommits/commit/75d77001b1076d3c20cf3305d58e13e5bc763362))
* **hook:** install from subdirectory ([7631c2f](https://github.com/Nutlope/aicommits/commit/7631c2fc0bd207b9456b2bf0f24d0a49eaec57de)), closes [#199](https://github.com/Nutlope/aicommits/issues/199)
* **hook:** Windows support ([#176](https://github.com/Nutlope/aicommits/issues/176)) ([2255583](https://github.com/Nutlope/aicommits/commit/225558394bf1d5d4a500d9e9cf1106acb5c24d57))
* improve large diff error message ([#101](https://github.com/Nutlope/aicommits/issues/101)) ([5a506b7](https://github.com/Nutlope/aicommits/commit/5a506b750e7b70c090e1cf192f62662f51363067))
* loosen api key validation ([#143](https://github.com/Nutlope/aicommits/issues/143)) ([ba0d6fd](https://github.com/Nutlope/aicommits/commit/ba0d6fdd253071b6ec14117bc171d4dd9bbd8a1b))
* remove hard-coded token limit ([#187](https://github.com/Nutlope/aicommits/issues/187)) ([9b24444](https://github.com/Nutlope/aicommits/commit/9b24444a2e78ddf3c9adbc3824673f6ea2a3ffa3))
* restore cursor visibility in case of errors ([#154](https://github.com/Nutlope/aicommits/issues/154)) ([51a8bb0](https://github.com/Nutlope/aicommits/commit/51a8bb0653a9742a1ddb6a0783e30bd65708d29d))
* tokenize with `gpt-3.5-turbo` model ([#173](https://github.com/Nutlope/aicommits/issues/173)) ([7068024](https://github.com/Nutlope/aicommits/commit/7068024f7f15f89d35ea27e9ad7cc3f8ddfb9ab3))


### Features

* `--all` flag ([#182](https://github.com/Nutlope/aicommits/issues/182)) ([ebe83a4](https://github.com/Nutlope/aicommits/commit/ebe83a493e31508632ac467f2b902ce6f1577556))
* `max-length` config ([#194](https://github.com/Nutlope/aicommits/issues/194)) ([edce283](https://github.com/Nutlope/aicommits/commit/edce283e9c54f541f0f4320b48d8de37bd7cdb93))
* `model` configuration to support different models ([#183](https://github.com/Nutlope/aicommits/issues/183)) ([eee3bbf](https://github.com/Nutlope/aicommits/commit/eee3bbfb8483ca442a6f07fc71df842768994e22))
* 更新GLM-4模型，优化代码格式和性能 ([8c2e82a](https://github.com/Nutlope/aicommits/commit/8c2e82ab084540e7bb1270ab81248220123c49f0))
* add aic alias ([#148](https://github.com/Nutlope/aicommits/issues/148)) ([1b01c2d](https://github.com/Nutlope/aicommits/commit/1b01c2d95aef89cbff0fd191db944dd892c087aa))
* **cli:** `--exclude` flag for ignoring files ([#162](https://github.com/Nutlope/aicommits/issues/162)) ([52b62d5](https://github.com/Nutlope/aicommits/commit/52b62d5a5048103f29252d28ec8427141f14848b))
* config command ([#71](https://github.com/Nutlope/aicommits/issues/71)) ([0d3f35c](https://github.com/Nutlope/aicommits/commit/0d3f35c13521cf0871d67fa0db79ba05cf1576b8))
* config file at `~/.aicommits` ([#51](https://github.com/Nutlope/aicommits/issues/51)) ([de38c89](https://github.com/Nutlope/aicommits/commit/de38c891f5d22731a5f095b3ca03dcf7b8f0052e))
* exclude all *.lock files ([#108](https://github.com/Nutlope/aicommits/issues/108)) ([ac6972c](https://github.com/Nutlope/aicommits/commit/ac6972c506faaa393f94b471384c338f17936ecc))
* git hook ([#95](https://github.com/Nutlope/aicommits/issues/95)) ([0b80a00](https://github.com/Nutlope/aicommits/commit/0b80a0031e98cbbe65ee385d85f020f4790b82ba))
* HTTP + HTTPS proxy support ([#139](https://github.com/Nutlope/aicommits/issues/139)) ([a0db0f3](https://github.com/Nutlope/aicommits/commit/a0db0f3ece1ba306c521c5afafa5f12bdd31f3a6))
* language support via `locale` config ([#96](https://github.com/Nutlope/aicommits/issues/96)) ([58ce61e](https://github.com/Nutlope/aicommits/commit/58ce61eab8948f3f107f8f32da57c85d2cd282e8))
* link OpenAI status on 500 error ([#121](https://github.com/Nutlope/aicommits/issues/121)) ([5f2efc8](https://github.com/Nutlope/aicommits/commit/5f2efc83f5fd2bb1b457a6bb8d5c813c885bd313))
* pass down argv to git commit ([#70](https://github.com/Nutlope/aicommits/issues/70)) ([65d753a](https://github.com/Nutlope/aicommits/commit/65d753a1d61a8859accbafaa7a6ae0a3825e1f44))
* remove ending period ([#59](https://github.com/Nutlope/aicommits/issues/59)) ([3f10195](https://github.com/Nutlope/aicommits/commit/3f10195d036eadb8f83377df8ee2c9613790b681))
* request timeout config ([#191](https://github.com/Nutlope/aicommits/issues/191)) ([42a2a39](https://github.com/Nutlope/aicommits/commit/42a2a39f6f645f480dadd7339c162977cb1725a4))
* show error stack on unknown error ([#124](https://github.com/Nutlope/aicommits/issues/124)) ([5fe127d](https://github.com/Nutlope/aicommits/commit/5fe127d377eeeec8ba08dd4a0052ec5e5272fe14))
* show multiple options ([#64](https://github.com/Nutlope/aicommits/issues/64)) ([68fc8ad](https://github.com/Nutlope/aicommits/commit/68fc8ad736e38a9497e94236800d32c9264576d7))
* support Conventional Commits via `--type` flag ([#177](https://github.com/Nutlope/aicommits/issues/177)) ([0562761](https://github.com/Nutlope/aicommits/commit/0562761dc2cdb758cfabb1369df979334e3e617e))
* upgrade clack ([0986220](https://github.com/Nutlope/aicommits/commit/0986220c96781878a6131f497479b113e6455bcd))
* use imperative present tense in prompt ([#84](https://github.com/Nutlope/aicommits/issues/84)) ([caaf165](https://github.com/Nutlope/aicommits/commit/caaf16506775386d1c72742fc4e8ea0125ec763c))
* use new gpt-3.5-turbo model ([#123](https://github.com/Nutlope/aicommits/issues/123)) ([afad821](https://github.com/Nutlope/aicommits/commit/afad8210fc96505f343f46b0fae49cec44579eba))


### Performance Improvements

* use minimal git diff algorithm ([#104](https://github.com/Nutlope/aicommits/issues/104)) ([f6d43f2](https://github.com/Nutlope/aicommits/commit/f6d43f242ce234f1187e04b2e7daa777eb96ca86))


### Reverts

* setting max_tokens based on message size ([#207](https://github.com/Nutlope/aicommits/issues/207)) ([e41637d](https://github.com/Nutlope/aicommits/commit/e41637d6a1ed87fa7457833c9e9ff379dcc58e60))



