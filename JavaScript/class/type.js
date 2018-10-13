/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 2018年10月14日
*/

function type (o) {
    var t,c,n;//type,class,name
    if( o === null) return "null";
    // 处理NaN
    if(o !== o) return "nan";
    // 如果typeof的值不是Object，则使用这个值
    if((t = typeof o) !== "Object") return t;
    // 返回对象的类名，除非值为Object
    // 这种方式可以识别大多数的内置对象
    if((c = classof(o)) !== "Object") return c;
    // 如果对象构造函数的名字存在的话，则返回它
    if(o.construtor && typeof o.construtor === "function" && (n = o.construtor.getName())) return n;
    // 其它类型都无法判断，统一返回Object
    return "Object";
};
// 返回对象的类
function classof (o){
    return Object.prototype.toString.call(o).slice(8,-1);
};
// 返回函数的名字（可能是空字符串），不是函数的则返回null
Function.prototype.getName = function () {
    if("name" in this) return this.name;
return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
}
