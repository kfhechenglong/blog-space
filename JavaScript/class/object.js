
/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 2018年10月13日
*/

// 对象的复制
// 将对象p中可枚举的对象复制到o中
function extend(o, p) {
    for (const prop in p) {
        o[prop] = p[prop];
    }
    return o;
};
/* *
*将p中的可枚举属性复制到o中，并返回o
*如果o和p中有同名的属性，o中的属性将不受影响
*这个函数并不处理getter和setter以及复制属性
 */
function merge(o,p){
    for (const prop in p) {
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
};

// 如果o的属性中在p中没有同名的属性，则从o中删除这个属性
function restrict(o,p){
    for(prop in o){
        if(! (prop in p)) delete o[prop];
    }
    return o;
};
// 如果o的属性在p中存在同名的属性，则从o中删除这个属性
function subtract(o,p){
    for(prop in p){
        delete o[prop];
    }
    return o;
};


// 封装一个定义类的函数

function defineClass(constructor,methods,statics){
    if(methods) extend(constructor.prototype,methods);
    if(statics) extend(constructor,statics);
    return constructor;
};
var SimpleRangle = defineClass(function(f,t){
    this.f = f;
    this.t = t;
},{
    includes:function(x){
        return this.f <= x && x <= this.t;
    },
    toString:function(){
        return this.f + '...' + this.t;
    }
},{
    upto:function(t){
        return new SimpleRangle(0,t);
    }
});


// 用来模拟Java的类
// 定义一个表示复数的类
// Complex.js
/* 
*这个构造函数为它所创建的每个实例都定义了实例字段r和i；
*这两个字段分别保存复数的实部和虚部
*它们是对象的状态
 */

 function Complex(real,imaginary){
     if(isNaN(real) || isNaN(imaginary)) throw new TypeError();
     this.r = real;
     this.i = imaginary;
 };
// 当前复数对象加上另一个复数对象，并返回一个新的计算和值后的复数对象
 Complex.prototype.add = function (that){
     return new Complex(this.r + that.r, this.i + that.i);
 };
// 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function (that){
    return new Complex(this.r*that.r - this.i * that.i,this.r * that.r + this.i * that.i);
};
// 计算复数的模，复数的模定义为原点（0,0）到平面的距离
Complex.prototype.mag = function(){
    return Math.sqrt(this.r * this.r + this.i * this.i);
};
// 复数的求负运算
Complex.prototype.neg = function (){
    return new Complex(-this.r,-this.i);
};
// 将复数转换成一个字符串
Complex.prototype.toString = function() {
    return "{" + this.r + "," + this.i + "}";
};
//检测当前复数对象是否和另外一个复数值相等
Complex.prototype.equals = function (that) {
    return that != null && that.constructor === Complex && this.r === that.r && this.i && that.i;
};
/* *
*类字段和类方法直接定义为构造函数的属性
*需要注意的是，类的方法通常不使用关键字this
*它们只对其参数进行操作
 */
