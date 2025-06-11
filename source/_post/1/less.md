2025-05-31 15:43:55

https://lesscss.org/

https://less.bootcss.com/

less代码可以防避免硬编码 引入变量和逻辑

但是无法被浏览器识别, 因此需要将其转化为css代码 由于node环境有读写文件的能力, 于是在node环境可以轻松完成文件转换



### 

`npm` 上有一个包叫做 `less`, 运行在 node 环境中, 通过它可以完成对Less代码的转换

node环境在前端工程化中, 充当了辅助的角色, 它不直接运行前端代码, 而是让我们编写前端代码更加舒适便利.

转换代码, 称为编译(compile), 转换代码的工具则称为编译器(compiler)

### 环境配置

1. 使用 `npm` 下载 `less`

   `less` 包提供了 `cli` 工具 `lessc, 有两种使用方案:

   **方案一: 全局安装less**

   可以在任何终端目录使用 `lessc` 命令, 但不利于版本控制

   1. 全局下载 `less`

       ```shell
       npm i -g less
       ```
       
       - 其中 `i` 是 `install` 的缩写, 同 `npm install`

   2. 检查(查看版本)

      ```shell
      lessc -v
      ```

   3. 删除(如转向使用方案二)
   
      ```shell
      npm un -g less
      ```
   
      - 其中 `un` 是 `uninstall` 的缩写, 同 `npm uninstall` 
   
   **方案二: 本地安装less**
   
   把 `less` 安装到工程目录的 `node_modules` 中, 无法全局使用 `lessc` 命令, 但可以在当前工程目录中使用 `npx lessc` 运行该命令.
   
   > `npx` 是 `npm` 提供的工具, 可以运行当前项目中安装到 `node_modules` 的cli命令
   >
   > 如果配置了 `package.json` 则无需使用npx

   1. 在工程目录下(如未初始化)初始化目录

      ```shell
      npm install -y
      ```
      
      - `-y` 参数可选, 表示使用默认值创建 `package.json`, 若要自定义配置(如版本号)弃用即可.
   
   2.  本地下载less
   
      ```shell
      npm i -D less
      ```
   
      - `-D` 是 `--save-dev` 的缩写 表示开发依赖, 仅在开发环节使用, 在使用构建工具时不会被打包进生产环境.
   
   3. 使用 `npx` 运行(查看版本)
   
      ```shell
      npx lessc -v
      ```
   
   4. 使用脚本运行
   
      打开 `package.json`

      ```json
      {
        "scripts": {
          "c": "npx lessc -v"
        },
        ...
      }
      ```
   
      在终端中运行
      
      ```shell
      npm run c
      ```
      
      - 在脚本中配置时可省略 `npx`, `"c": "lessc -v"` 即可
   
   