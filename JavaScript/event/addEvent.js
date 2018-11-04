/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 
*/

/* 
* 在指定的事件目标上注册用于处理指定类型事件的指定处理程序函数
* 确保处理程序一直作为目标的方法调用
 */
function addEvent (target,type,hanlder) {
    if(target.addEventListener)
        target.addEventListener(type,hanlder,false);
    else
        target.attachEvent('on' + type ,
            function (event){
                // 把事件程序作为事件目标的方法调用
                // 传递事件对象
                return hanlder.call(target,event);
            })
};
// 事件取消
function cancelHandler (event) {
    var event = event || window.event;
    // 现在取消事件相关的默认行为
    if (event.preventDefault) event.preventDefault();//标准技术
    if(event.returnValue) event.returnValue = false; //IE
    return false; // 用于处理使用对象属性注册的处理程序
}
