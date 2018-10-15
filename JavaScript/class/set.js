/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 2018年10月15日
*/

function Set(){
    this.values = {};//集合数据保存在对象的属性
    this.n = 0;//保存集合中值的个数
    this.add.apply(this,arguments);//把所有的参数都添加到这个集合中
};

// 将每个参数都添加到集合中
Set.prototype.add = function (){
    for (let i = 0; i < arguments.length; i++) {
        const val = arguments[i]; //把它转换成字符串
        let str = Set._v2s(val);
        if(!this.values.hasOwnProperty(str)){
            this.values[str] = val;
            this.n ++;
        }
    }
    return this;//用于支持链式调用
};
// 从集合中删除元素，这些元素由参数指定
Set.prototype.remove = function (){
    for (let i = 0; i < arguments.length; i++) {
        const str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};
// 如果集合包含这个值，则返回true,否则就返回false
Set.prototype.contains = function (value){
    return this.values.hasOwnProperty(Set._v2s(value));
};
// 返回集合的大小
Set.prototype.size = function () {
    return this.n;
};
// 遍历集合的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function (f,content) {
    for(var s in this.values){
        if(this.values.hasOwnProperty(s))
        f.call(context,this.values[s])
    }
};
// 这是一个内部函数，用于将任意的Javascript值和唯一的字符串对呀起来
Set._v2s = function(val){
    switch (val) {
        case undefined:
            return 'u';
        case null: return 'n';
        case true: return 't';
        case false: return 'f';
        default: switch (typeof val) {
            case 'number': return "#" + val;
            case 'string': return '"' + val;
            default: return "@" + objectId(val);
        }
    }
    // 对于任意的对象来说，都会返回一个字符串
    // 针对不同的对象，这个函数会返回不同的字符串
    // 对于同一个对象的多次调用，总是还回相同的值
    function objectId(o){
        var prop = "|**objectid**|";
        if(!o.hasOwnProperty(prop))
        o[prop] = Set._v2s.next++;
        return o[prop];
    }
};
Set._v2s.next = 100;//设置初始化id值；

var Set = new Set({ "name": "hechenglong" }, {"date":"2018-10-15"},'字符串',10,null);
console.log(Set);
