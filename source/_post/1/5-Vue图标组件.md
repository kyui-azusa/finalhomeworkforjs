---
title: 5-Vue图标组件
date: 2025-3-24 10:33:26
tags: Vue
categories: Vue入门
cover: /image/bg-1.png
---

> iconfont.cn

> 使用的图标库: [at.alicdn.com/t/font_2164449_nalfgtq7il.css](https://at.alicdn.com/t/font_2164449_nalfgtq7il.css)

## 功能设计

### 需求提出

1. 在使用图标时, 大多样式统一或类似, 实现过程重复, 因此希望能简化使用过程

2. 我们希望在使用图标的时候, 能够方便简捷

    例如:

    ```html
    <icon type="home" />
    ```

### 使用逻辑

1. 因此, 我们希望有一个组件, 提供 `type` 属性, 来决定最终图标
2. 组件通过 `type` 属性, 把标签和组件库关联起来, 从而省略类似 `<i class=" iconfont home"></i>` 的使用

接下来以此为目标, 进行组件设计

## 组件封装

### 定义组件

> ./components/Icon.vue

1. 参数

    根据期望使用的方式, 为组件添加 `type` 参数

    ```html
    <script>
    export default {
      props: {
        type: String,
      },
    };
    </script>
    ```

    又因为 `type` 是必须提供的, 添加约束

    ```vuw
    <script>
    export default {
      props: {
        type: {
          type: String,
          required: true,
        },
      },
    };
    </script>
    ```

2. 样式

    导入样式, 这里以给出的样式为例

    ```html
    <style scoped>
    @import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
    </style>
    ```

3. 模板

    使用图标

    ```html
    <template>
      <i class="iconfont iconzhuye"></i>
    </template>
    ```

### 使用组件

> App.vue

1. 注册组件

    ```html
    <script>
    import Icon from "./components/Icon";
    export default {
      components:{
        Icon,
      }
    };
    </script>
    ```

2. 使用组件

    ```html
    <template>
    <div>
      <h1>App组件</h1>
      <Icon type="home"/>
    </div>
</template>
    ```
    
    即可看到效果

### 动态样式

为了使得不同 `type` 属性对应不同图标, 需要对 `<i>` 绑定相应的类样式.

1. 类样式的动态绑定

    class可以绑定字符串, 变量和对象

2. 使用类样式的绑定

    使用字符串

    ```html
    <template>
      <i class="iconfont" :class="'iconzhuye'"></i>
    </template>
    ```

    把字符串用变量替换

    ```html
    <template>
      <i class="iconfont" :class="iconClass"></i>
    </template>
    ```

3. 创建属性名与类样式之间的映射关系

    ```js
    const Classmap = {
        home: "iconzhuye",
        error: "iconcuowu",
        ...
    }
    ```

4. 使用计算属性处理映射关系

    ```html
    <script>
    const Classmap = {
        home: "iconzhuye",
        error: "iconcuowu",
        
    }
    export default {
      props: {
        type: {
          type: String,
          required: true,
        },
      },
      computed: {
        // 图标的类样式
        iconClass() {
          return Classmap[this.type];
        },
      },
    };
    </script>
    ```

### 其他样式

**有时候 会有在组件外控制组件样式的需求**

> 都添加 `scoped` 的情况下, 父组件的样式可以影响子组件的同名根节点

也就是说, 在如下调用层级关系下

`App.vue` > `Icon.vue`

在 `App.vue` 中添加样式即可

1. App.vue

    ```html
    <template>
      <Icon type="home"/>
    </template>
    
    <script>
    import Icon from "./components/Icon";
    export default {
      components:{
        Icon,
      }
    };
    </script>
    
    <style>
    .iconfont {
      font-size: 20px;
      color: red;
    }
    </style>
    ```

    即可发现图标的样式已改变.

    

