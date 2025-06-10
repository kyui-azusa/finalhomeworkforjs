---
title: 6-Vue组件事件
date: 2025-3-24 13:38:32
tags: Vue
categories: Vue入门
cover: /image/bg-1.png
---
> 本节案例: 分页组件

## 知识补充

### 全局样式

1. 创建全局样式文件

    例如: `./src/styles/global.less`

2. 导入样式文件

    main.js

    ```js
    import Vue from "vue";
    import App from "./App.vue";
    import "./style/global.less"
    
    Vue.config.productionTip = false;
    
    new Vue({
        render: (h) => h(App),
    }).$mount("#app");
    ```

## Pager组件

### 创建组件

> 组件根节点的命名习惯: 组件名+container

1. 创建 `./components/Pager.vue`

2. 注册组件

    App.vue

    ```html
    <template>
      <div>
        <h1>App组件</h1>
        <Pager />
      </div>
    </template>
    
    <script>
    import Pager from "./components/Pager";
    export default {
      components: {
        Pager,
      },
    };
    </script>
    
    <style>
    </style>
    ```



### 创建模板

1. 首页&上一页

    > 使用 `|<<` 和 `<<` 代表首页和上一页

    Pager.vue

    ```html
    <template>
      <div class="pager-container">
        <a href="">|&lt;&lt;</a>
        <a href="">&lt;&lt;</a>
      </div>
    </template>
    ```

2. 导航栏

    同理, 添加页码(示例) 和尾页及下一页完成页码导航

    Pager.vue

    ```html
    <template>
      <div class="pager-container">
        <a href="">|&lt;&lt;</a>
        <a href="">&lt;&lt;</a>
        <a href="">1</a>
        <a href="">2</a>
        <a href="">3</a>
        <a href="">4</a>
        <a href="">5</a>
        <a href="">6</a>
        <a href="">7</a>
        <a href="">8</a>
        <a href="">9</a>
        <a href="">10</a>
        <a href="">&gt;&gt;</a>
        <a href="">&gt;&gt;|</a>
      </div>
    </template>
    ```

### 设置样式

**去除浏览器的默认样式**

1. **创建全局样式** 例如: `./src/styles/global.less`

    global.less

    ```less
    a {
        text-decoration: none;
        color: inherit;
        &:hover {
            color: #6b9eee;
        }
    }
    ```

2. **引用全局样式**

    main.js

    ```js
    import Vue from "vue";
    import App from "./App.vue";
    import "./styles/global.less"
    
    new Vue({
        render: (h) => h(App),
    }).$mount("#app");
    ```

3. 提高样式的可维护性

    将颜色提取为 `less` 变量

    var.less

    ```less
    // less变量
    @danger: #cc3600; // 危险 错误
    @primary: #6b9eee; // 主色调 链接
    @words: #373737; // 大部分文字 深色文字
    @lightwords: #999; // 少部分文字 浅色文字
    @warn: #dc6a12; // 警告
    @success: #7ebf50; // 成功
    @gray: #b4b8bc; // 灰色
    @dark: #202020; // 深色
    ```

    使用 `less` 变量

    global.less

    ```less
    @import "./var.less";
    
    a {
        text-decoration: none;
        color: inherit;
        &:hover {
            color: @primary;
        }
    }
    ```

    稍稍加工

    global.less

    ```less
    @import "./var.less";
    
    html {
        color: @words;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overflow: hidden;
    }
    
    body {
        overflow: hidden;
        margin: 0;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    
        &:hover {
            color: @primary;
        }
    }
    ```

### 样式技巧

1. **用 `lang` 指定语言**

    使用less

    ```html
    <style lang="less" scoped>
    @import "~@/styles/var.less";
    .pager-container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      a {
        color: @primary;
        margin: 0 6px;
        &.disabled {
          color: @lightwords;
          cursor: not-allowed;
        }
        &.current{
          color: @words;
          font-weight: bold;
        }
      }
    }
    </style>
    ```

### 属性设计

## 属性文档

### 属性

| 属性名        | 含义       | 类型   | 必填 | 默认值 |
| ------------- | ---------- | ------ | ---- | ------ |
| current       | 当前页码   | Number | 否   | 1      |
| total         | 总数据量   | Number | 否   | 0      |
| limit         | 页容量     | Number | 否   | 10     |
| visibleNumber | 可见页码数 | Number | 否   | 10     |

### 事件

## 属性使用

### 属性声明

```html
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibaleNumber: {
      type: Number,
      default: 10,
    },
  },
};
</script>
```

### 功能