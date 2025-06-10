---
title: 3-Vue头像组件
date: 2025-3-12 20:29:36
tags: Vue
categories: Vue入门
cover: /image/bg-1.png
---

## 组件

### 建立文件

1. 文件目录
    - components
        - Avatar.vue
        - 其他组件

2. 文件结构

    可下载 `vscode` 组件: `vetur`

    1.  可识别 `vue` 代码

    2. 提供了常用的代码片段

        `default.vue`: 生成 `vue` 结构

        ```html
        <template>
          
        </template>
        
        <script>
        export default {
        
        }
        </script>
        
        <style>
        
        </style>
        ```


### 配置组件

1. 填写组件

    ```html
    <template>
      <img :src="url"/>
    </template>
    
    <script>
    export default {
        props: ["url"],
    }
    </script>
    
    <style>
    
    </style>
    ```

2. 在 `App.vue` 中使用组件

    ```html
    <template>
      <div>
      	<h1>App组件</h1>
      	<Avatar url="https://xn--zsr428b1mg.com/image/blog-avatar.jpg"/>
      </div>
    </template>
    
    <script>
    import Avatar from "./component/Avatar" // .vue后缀可以省略
    export default {
    	components: {
    		Avatar
    	}
    }
    </script>
    
    <style>
    
    </style>
    ```

### 组件传参

1. 传参:
    - 传递字符串
        ```html
        <Avatar url="1" />
        ```
    - 非字符串在传参前添加 `:`, 此时 `""` 内不再是字符串, 而是 `Js` 表达式, 如果以这种形式仍想传入字符串则可使用单引号包裹
        ```html
        <Avatar :url="1" />
        <Avatar :url="'1'" />
        ```
2. 声明属性
    > v-bind缩写: `:`
    1.  数组
          数组的每一项都是一个属性
    2.  对象
          `属性名: 属性类型` 的形式, 为属性添加约束
        ```html
        props: {
        	url: String,
        },
        ```

        还可以进一步限定是否必须传递
    
        ```html
        props: {
        	url: {
                type: String,
                required: true,
            },
        },
        ```

3.  参数的默认值

    > 这里仅为示例, 代码不采用, 后续style采用默认值.

    ```html
    props: {
    	url: {
            type: String,
            required: false,
            default: 'example.jpg'
        },
    },
    ```


### 组件样式

1. 增加属性的通用性

    **特例**: `style` 属性在使用 `v-bind` 绑定数据时需要绑定一个对象

    1. 传递样式参数

        ```html
        <template>
          <img :src="url" :style="{width: size+'px', height: size+'px'}"/>
        </template>
        ```

    2. 组件样式

        ```html
        <template>
          <img
            class="avatar-img"
            :src="url"
            :style="{ width: size + 'px', height: size + 'px' }"
          />
        </template>
        
        <script>
        export default {
          props: {
            url: {
              type: String,
              required: true,
            },
            size: {
              type: Number,
            },
          },
        };
        </script>
        
        <style>
        .avatar-img {
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        </style>
        ```

2.  避免冲突样式 (隔绝组件)

    > 使用 `scoped` 创建带有作用域的样式

    ```html
    <style scoped>
        ...
    </style>
    ```

    `vue-cli` 会在类样式选择器及选择选择器加上属性选择器

    ```css
    .avatar-img[添加的自定义属性] {
        ...
    }
    ```

    

    

    

    