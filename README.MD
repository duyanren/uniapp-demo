# uniapp 小程序

## uni-app 开发注意事项

### 文档

- 官方文档<https://uniapp.dcloud.io/>

### vue 开发注意事项

- <https://cn.vuejs.org/v2/style-guide/index.html>
- 不同组件通信问题：
  - 父子组件通信：直接使用 this.\$emit
  - 跨级组件、兄弟组件通信：由于没有引入 vuex  
    使用了事件总线 eventbus 已经挂载到 Vue.prototype 上 可直接在页面中通过 this.\$bus 实现不同组件的通信

### 小程序开发启动

```bash
 - 前提：node已安装 未安装请自动Google安装
 - 如果使用yarn安装 请先全局安装yarn npm install -g yarn（yarn安装需要这一步 npm无需执行）
 - 全局安装vue-cli yarn global add @vue/cli or npm install -g @vue/cli
 - 安装依赖：yarn install or npm install
 - 若windows报错Error: Cannot find module 'typescript/package.json'，请执行yarn add Typescript -D
 - 开发环境：npm run dev:mp-weixin
 - 正式环境：npm run build:mp-weixin

```

### mock 数据启动

```bash
 - gulp mock
 - gulp 版本号锁死3.9.1 升级会有问题
 - 监听3000端口 启动默认是8081

```

### 扫码体验

- 开发者工具打开以下目录：
  - 开发版：dist-> dev -> mp-weixin
  - 正式版：dist-> build -> mp-weixin

### 开发目录结构

```bash
.
├── README.MD
├── babel.config.js
├── dist
│   └── dev
│       └── mp-weixin
├── gulpfile.js
├── mock
│   ├── db.js
│   ├── factory
│   │   └── getcomments.js
│   ├── routes.js
│   └── server.js
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   └── index.ts
│   ├── common
│   │   ├── bus.ts
│   │   ├── md5.ts
│   │   ├── request.ts
│   │   ├── storage.ts
│   │   └── utils
│   ├── components
│   │   └── wx-parse
│   ├── constants
│   │   └── mutation-types
│   ├── css
│   │   └── common.css
│   ├── main.ts
│   ├── manifest.json
│   ├── pages
│   │   └── index
│   ├── pages.json
│   ├── sfc.d.ts
│   ├── static
│   │   ├── empty.png
│   │   └── loading.png
│   ├── store
│   │   ├── global
│   │   └── index.ts
│   ├── typings
│   │   └── global.d.ts
│   └── wxcomponents
│       └── painter
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```
