# cordova-react-webpack-starter

Cordova 打包 HTML5 为 APP，基于 cordova、webpack、react 构建的模版，是您移动 APP 开发的完美起点。

## 安装

```shell
$ git clone https://github.com/sanonz/cordova-react-webpack-starter.git
$ cd cordova-react-webpack-starter
$ npm install
```

Cordova 环境搭建详细教程请移步：[使用 Phonegap + Cordova 搭建混合开发平台](https://sanonz.github.io/2020/make-hybrid-platform-cordova/)

## 配置说明

全局配置文件：[config.json](./config.json)

```json
{
  "local": {
    "api": "//api-dev.newbox.ltd/"
  },
  "staging": {
    "api": "//api-dev.newbox.ltd/"
  },
  "production": {
    "api": "//api-dev.newbox.ltd/"
  }
}
```

- **{env}** 环境配置 
- **{env}.api** 接口地址

## 开发启动

先启动 webpack

```bash
$ npm run dev:local
$ npm run dev:staging
$ npm run dev:production
```

再启动 phonegap

```bash
$ npm run serve
```

然后再 phonegap 应用中输入调试 IP 地址

## 编译发布

编译 debug 版本

```bash
$ npm run debug:{platform}:local
$ npm run debug:{platform}:staging
$ npm run debug:{platform}:production
```

编译 release 版本

```bash
$ npm run release:{platform}:local
$ npm run release:{platform}:staging
$ npm run release:{platform}:production
```
