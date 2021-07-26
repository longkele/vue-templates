# vue-templates
基于vue-cli、vue全家桶，封装的中台项目的基础模板集合；包括项目目录、规范、组件库；

* 中台工程化基础库;
* 基础目录使用vue-cli 3.0产生；
* 用到的技术
    * 技术栈：vue-cli、vue、vue-router、vuex、less
    * http管理：fetch-jsonp、flyio、apim
    * ui库：iviewUI、form-generator-iview、qrcode.vue
    * lib库：@jnlong/eutils

## 1. 快速开始
```
// 安装
yarn install

// 开发调试
npm run dev

// 编译产出
npm run build
```

## 2. 目录规范
```
├── assets              // 静态资源
│   ├── css             // less文件
│   ├── font            // iconfont 设置
│   └── img
├── components          // 公共组件
│   ├── Cloading.vue    // 全屏弹窗的loading组件
│   ├── FilterForm.vue  // 筛选+列表组件
│   ├── Head.vue        // 统一head
│   └── fieldUpload.vue // 自定义上传组件
├── config              
│   ├── api.js          // api map，接口统一管理
│   ├── config.js       // 全局配置文件
│   ├── fly.js          // fly（http请求工具）全局配置、拦截器设置
│   └── windowConfig.js
├── store               // vuex页面配置：目前未使用
│   └── index.js
├── utils               // 全局utils
│   ├── mixins          // 定义vue mixin
│   ├── plugins         // 定义vue plugin
│   ├── Lock.js         // 点击加锁类库
│   ├── event-bus.js    // 全局event
│   └── index.js        // utils入口文件
└── views               // vue页面路径
    ├── components      // 与业务相关的vue公共组件
    ├── page1           // 每个页面创建一个独立的文件夹：方便管理当前页面的config、私有vue组件、mockdata等文件；
        ├── index.vue   // index页面vue文件
        └── config.js   // 当前页面对应的config文件
    ├── page2
    ├── ...
├── App.vue             // 页面入口vue
├── main.js             // 业务入口js
├── plugins             // vue插件
├── router.js           // vue路由配置
├── store.js            // vuex入口配置：目前未使用
```

## 3. 功能

### 3.1 less
#### 3.1.1 variable.less
用来设置全局变量、公共函数；
通过webpack设置，使vue文件中自动加载variable.less，保证在vue单文件中能直接使用；（vue文件中无需再单独引入）

```
// 使用场景  (xx.vue)
<template>
    <div class="content>
        <p class="title"></p>
        <p class="desc"></p>
        <div class="tagwp">
            <p class="tag"></p>
            <p class="tag"></p>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less">
    .title {
        color: @sel-color;
        .fontsize-title();
    }
    .desc {
        .fontsize-desc();
    }
    .tagwp {
        .flex-cm();
    }
    .tag {
        .fontsize-tag();
    }
</style>
```

#### 3.1.2 comm.less
用来设置全局的less类库；已经在main.js中引入（vue文件中无需再单独引入）

```
// 使用场景  (xx.vue)
<template>
    <div class="content flex-cm>
        <p class="title background-base"></p>
    </div>
</template>
```

#### 3.1.3 iview-reset.less
修改iview的全局变量，根据业务需求，重置部分样式；

### 3.2 [iconfont](https://www.iconfont.cn/)
* 使用iconfont，登录网站后，为每一个中台维护一个项目；
* 减少img的请求次数，提高页面性能；
* 同时方便icon的统一维护；

## 4. 公共类库

### 4.1 @jnlong/etuils
综合工具类库：https://github.com/jnlong/eutils

```
// 使用demo
import {
    urlParse, log,
    loadCss, loadScript, loadImg,
    deepCopy, toast, versionCompare,
    isString, isNumber, isDate, isFunction, isArray
} from '@jnlong/eutils';

log(isFunction('test'));
urlParse.search(location.href, 'idfrom');
urlParse.add(location.href, 'key', 'value');
urlParse.queryToJson(location.href);
```

### 4.2 moment
日期管理类库：https://momentjs.com/

```
// 使用demo
import moment from 'moment';

moment("12-25-1995", "MM-DD-YYYY hh:mm:ss");
moment().format('"MM-DD-YYYY hh:mm:ss"');
moment().toString();
```

### 4.3 [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)
ajax 管理工具：支持promise请求，支持全局设置timeout，支持配置拦截器；

## 5. 自动化

### 5.1 部署脚本
* 测试环境部署，使用fis3的fsr方式推送到测试机，配置文件是 ` /fis-conf.js `；
    * 推送前，与后端约定测试机host和tplDir，并配置；
* 线上部署，使用shell脚本
    * 配置文件是 ` build.sh `；
    * 上线前，需要和后端约定路径，并设置变量 ` APP_NAME="xxx" `；

## 6. 规范
### 6.1 编码规范
使用@ecomfe/eslint-config的规范规则；

使用方法：提交代码前执行 `npm run lint`来校验规范；

### 6.1 注释规范
使用jsdoc的规范，做文件、函数的注释；
