/*
模块
* 1、闭包 自执行函数
* 2、require.js AMD
* 3 sea.js CMD
* 4 nodejs common.js
* 5 es6 es module
*/

// node 原生的模块是内置在node.exe中，
// 它的加载速度是最快的
let fs = require('fs');
//另一种是文件模块，是存放在硬盘中，加载速度较慢；
// 文件模块分为三种js、json、node三种类型
// 又分为两种，一种是自己写的，根据路径找，另一种是别人写的第三方模块通过名字去（node module中找）
