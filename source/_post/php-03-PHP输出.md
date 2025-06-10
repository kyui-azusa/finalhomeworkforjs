---
title: 03-PHP输出
date: 2024-01-14 17:55:29
tags: PHP
categories: 编程
---
{% meting "1357839856" "netease" "song" "autoplay" %}
## 输出函数

1. `echo`语句 \- 可以输出一个或多个字符串

2. `print`语句 \- 只允许输出一个字符串，返回值总为 1

**注：**`echo` 输出的速度比 `print` 快， `echo` 没有返回值，`print`有返回值1

## echo

1. 语法
   ```php
   echo 
   echo()
   ```
    例：

   ```php
   // 输出字符串
   <head>
       <meta charset="UTF-8">
   </head>
   <?php
   echo "<h2>PHP hhw!</h2>";
   echo "Hello world!<br>";
   echo "我要学 PHP!<br>";
   echo "这是一个"."字符串，"."使用了", "多个", "参数。"; // 在PHP中.和,都代表拼接.
   ?>
   ```

2. 输出变量

	```php
    <head>
    <meta charset="UTF-8">
    </head>
    <?php
    $txt1="学习 PHP";
    $txt2="https://xn--zsr428b1mg.com/";
    $cars=array("1","2","3");

    echo $txt1;
    echo "<br>";
    echo "在 $txt2 学习 PHP ";
    echo "<br>";
    echo "索引的位置是 {$cars[0]}";// 大括号的使用可以使得复杂的表达式更清晰，并确保 PHP 解释器能够正确地识别变量的边界.此处可以不加.
    ?>
   ```

## print

1. 语法
   ```php
   print
   print()
   ```
例：

   ```php
   // 输出字符串
   <head>
       <meta charset="UTF-8">
   </head>
   <?php
   print "<h2>PHP hhw!</h2>";
   print "Hello world!<br>";
   print "我要学习 PHP!";
   //或者
   print("PHP是全世界最好的语言");
   ?>
   ```

2. 输出变量

   完全同 `echo` 略.

## EOF(heredoc)

>  PHP EOF(heredoc)是一种在命令行shell（如sh、csh、ksh、bash、PowerShell和zsh）和程序语言（像Perl、PHP、Python和Ruby）里定义一个字符串的方法.
>
> 类似python的三引号.

```php
<head>
    <meta charset="UTF-8">
</head>
<?php
echo <<<EOF
        <h1>我的第一个标题</h1>
        <p>我的第一个段落。</p>
EOF;
// 结束需要独立一行且前后不能空格
?>
```

使用概述：

- 必须后接分号，否则编译通不过.
- `EOF` 可以用任意其它字符代替，只需保证结束标识与开始标识一致.
- 结束标识必须顶格独自占一行(即必须从行首开始，前后不能衔接任何空白和字符).
- 开始标识可以不带引号或带单双引号，不带引号与带双引号效果一致，解释内嵌的变量和转义符号，带单引号则不解释内嵌的变量和转义符号.
- 当内容需要内嵌引号（单引号或双引号）时，不需要加转义符，本身对单双引号转义，此处相当与q和qq的用法.

 **注：**

1. 以 `<<<EOF` 开始标记开始，以 `EOF` 结束标记结束，结束标记必须顶头写，不能有缩进和空格，且在结束标记末尾要有分号 .

2. 开始标记和结束标记相同，比如常用大写的 `EOT`、`EOD`、`EOF` 来表示，但是不只限于那几个(也可以用：JSON、HTML等)，只要保证开始标记和结束标记不在正文中出现即可.

3. 位于开始标记和结束标记之间的变量可以被正常解析，但是函数则不可以。在 heredoc 中，变量不需要用连接符 . 或 , 来拼接.



## 常用输出函数

1. `echo`
	输出一个或者多个字符串.

2. `print`
	和 `echo` 最主要的区别： `print` 仅支持一个参数，并总是返回 1。

3. `print_r`
	打印关于变量的易于理解的信息,如果给出的是 string、integer 或 float，将打印变量值本身。如果给出的是 array，将会按照一定格式显示键和元素。

4. `var_dump`
	此函数显示关于一个或多个表达式的结构信息，包括表达式的类型与值。数组将递归展开值，通过缩进显示其结构。

5. `var_dump` 和 `print_r` 的区别
	`var_dump` 返回表达式的类型与值而 `rint_r` 仅返回结果，相比调试代码使用 `var_dump` 更便于阅读.