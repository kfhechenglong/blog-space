
/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 2018年10月13日
*/


// 通过原型继承创建一个新对象
// inherit()函数返回一个继承自原型对象p的属性的新对象
// 这里使用Object.reate()函数，如果存在的话，否则就退化使用其他方法
function inherit(p){
    if(p == null) throw TypeError('p 不能为null，必须是一个对象！');//p是一个对象，但不能为null
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== 'Object' && t !== 'function') throw TypeError();
    function f() {};
    f.prototype = p;
    return new f();
}

exports = inherit

