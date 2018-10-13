
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
