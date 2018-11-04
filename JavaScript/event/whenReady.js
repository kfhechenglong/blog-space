/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 
*/

/* 
* 传递函数给whenReady(),当文档解析完毕且为操作准备就绪时，
* 函数将作为文档对象的方法调用
* DOMContented 、readystatechange或load事件发生时会触发注册函数
* 一旦文档准备就绪，所有函数都将被调用，任何传递给whenReady()函数都将立即执行
 */
var whenReady = (function(){//该函数返回whenReady函数
    var funcs = [];//当获得事件时，要运行的函数
    var ready = false;
    function handler (e) {
        // 如果已经运行过一次，则直接返回
        if(ready) return;
        // 如果发生readystatechange事件
        // 但其状态不是complete的话，那么文档尚未完全准备好
        if(e.type === 'readystatechange' && document.readyState !== 'complete'){
            return;
        }
        // 运行所有已注册的函数
        // 注意每次都要计算funcs.length;
        //已防止这些函数的调用可能会导致注册更多的函数
        for (let i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        // 现在设置ready的状态为true，并移除所有的函数
        ready = true;
        funcs = null;
    };

    // 为接收到的任何事件注册处理程序
    if(document.addEventListener) { 
        document.addEventListener('DOMContentLoaded',handler,false);
        document.addEventListener('readystatechange',handler,false);
        window.addEventListener('load',handler,false);
    } else if(document.attachEvent) {
        document.attachEvent('onreadystatechange',handler);
        window.attachEvent('onload',handler);
    }
    return function whenReady(f){
        if(ready) f.call(document);//若准备完毕，则直接执行
        else funcs.push(f);//
    }
}());
