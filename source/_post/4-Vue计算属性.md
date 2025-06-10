---
title: 4-Vue计算属性
date: 2025-3-12 21:29:36
tags: Vue
categories: Vue入门
cover: /image/bg-1.png
---

计算属性 `computed`

> 根据已有属性计算

## 概念辨析

### 计算属性和方法有什么区别

> 计算属性本质上是包含getter和setter 的方法
>
> 当获取计算属性时, 实际上是在调用计算属性的getter方法, vue会收集计算属性的依赖, 并缓存计算属性的返回结果. 只有当依赖变化后才会重新进行计算.
>
> 方法没有缓存, 每次调用方法后都会导致重新执行.
>
> 计算属性的getter和setter参数固定, getter没有参数, setter只有一个参数. 而方法的参数不限.
>
> 由于有以上的这些区别, 因此计算属性通常是根据已有数据得到其他数据, 并在得到数据的过程中不建议使用异步, 当前时间, 随机数等副作用操作
>
> 实际上, 他们最重要的区别是含义上的区别. 计算属性含义上也是一个数据, 可以读取也可以赋值; 方法含义上是一个操作, 用于处理一些事情

## 需求案例

### 原始代码

1. 姓名处理

    App.vue
    
    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ lastname + " " + firstname }}</p>
      </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          lastname: "Hirasawa",
          firstname: "Yui",
        };
      },
    };
    </script>
    
    <style>
    </style>
    ```
    
    **需求本质: 通过已有数据得到新的数据**
    
    如需求复杂, 可能需要提取表达式, 作为方法 `methods`
    
2. 使用函数

    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ getFullName() }}</p>
      </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          lastname: "Hirasawa",
          firstname: "Yui",
        };
      },
      methods: {
        getFullName(){
            return this.lastname + " " + this.firstname
        },
      },
    };
    </script>
    
    <style>
    </style>
    ```

3. 过程冗余

    在函数中增加输出

    ```js
    getFullName(){
        console.log("method called")
        return this.lastname + " " + this.firstname
    },
    ```

    不难发现, 当数据多次使用时

    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ getFullName() }}</p>
        <p>全名 {{ getFullName() }}</p>
        <p>全名 {{ getFullName() }}</p>
      </div>
    </template>
    ```

    - 方法被多次调用, 重复但没有区别, 没有必要. 

    - 如计算过程耗时, 将大大影响效率
    - 而且不论计算过程如何, 结果仅与现有属性相关

    所以无需重复计算

4. 引入计算属性 `computed`

    > 根据已有属性得到新的属性

    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ fullName }}</p>
      </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          lastname: "Hirasawa",
          firstname: "Yui",
        };
      },
      computed: {
        fullName() {
          return this.lastname + " " + this.firstname;
        },
      },
      methods: {
        getFullName() {
          console.log("method called");
          return this.lastname + " " + this.firstname;
        },
      },
    };
    </script>
    
    <style>
    </style>
    ```

    同样增加输出

    ```js
    fullName() {
        console.log("computed called");
        return this.lastname + " " + this.firstname;
    },
    ```

    多次使用

    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ getFullName() }}</p>
        <p>全名 {{ getFullName() }}</p>
        <p>全名 {{ getFullName() }}</p>
      </div>
    </template>
    ```

    可以发现只有一次输出

    **而且 vue 会缓存计算结果并记录依赖的数据, 依赖发生变化, 属性会重新计算**

    ```html
    <template>
      <div>
        <p>姓 {{ lastname }}</p>
        <p>名 {{ firstname }}</p>
        <p>全名 {{ fullName }}</p>
        <button @click="setNewName('Nakano', 'Azusa')">
            修改全名
        </button>
      </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          lastname: "Hirasawa",
          firstname: "Yui",
        };
      },
      computed: {
        fullName() {
          console.log("computed called");
          return this.lastname + " " + this.firstname;
        },
      },
      methods: {
        getFullName() {
          console.log("method called");
          return this.lastname + " " + this.firstname;
        },
        setNewName(last, first){
            this.lastname = last;
            this.firstname = first;
        }
      },
    };
    </script>
    
    <style>
    </style>
    ```


## 计算属性

### 计算属性书写

1. 完整书写

    ```js
    computed: {
        proName: {
            get(){
                // getter
            },
    		set(val){
                // setter
            }
        }   
    }
    ```

    使用 `proName = newvalue` 调用 `set`

2. 只包含 `getter` 的简写

    ```js
    computed: {
        proName(){
            // getter
        }
    }
    ```

