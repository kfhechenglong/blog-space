/* 
* 拖动绝对定位元素，定义一个drag()函数，用于mousedown事件处理程序的调用
* 随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
* 同时兼容了IE的写法
 */
/* 
* @params elementToDrag 接收mousedown事件的元素或某些包含元素，它必须是绝对定位元素
* 它的style。left和style。top值将随着用户的拖动而改变
* event mousedown事件对象
*/
function drag(elementToDrag,event){
    // 获取鼠标的初始位置
    var scroll = getScrollOffsets();
    var startX = event.clientX - scroll.x;
    var startY = event.clientY - scroll.y;
    // 在文档坐标下，待拖动元素的初始位置
    // 因为elementToDrag是绝对定位元素
    // 所以我们可以假设它的offseParent就是文档的body元素
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    // 计算mousedown事件和元素左上角之间的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;
    // 注册用于响应接着mousedown事件发生的mousemove和mouseup事件处理程序
    if(document.addEventListener) { 
        document.addEventListener('mousemove',moveHandler,true);
        document.addEventListener('mouseup',upHandler,true);
    }
    else if(document.attachEvent){
        // 用于IE5~IE8的事件模型
        elementToDrag.setCapture();
        elementToDrag.attachEvent('onmousemove',moveHandler);
        elementToDrag.attachEvent('onmouseup',upHandler);
        // 作为mouseup事件看待鼠标捕获的丢失
        elementToDrag.attachEvent('onlosecapture',upHandler);
    }
    // 我们处理这个事件，不让任何其他元素看到
    if(event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    // 阻止默认事件
    if(event.preventDefault) event.preventDefault();
    else event.returnValue = false;

    /* 
    * 当元素正在被移动时，这就是mousemove事件的处理程序
    * 它用于移动这个yuans
     */
    function moveHandler(e){
        if(!e) e = window.event;//IE
        // 移动这个元素到当前鼠标位置
        // 通过滚动条的位置和初始单击的偏移量来调整
        var scroll = getScrollOffsets();
        elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + 'px';
        elementToDrag.style.top = (e.clientY + scroll.y -deltaY) + 'px';
        if(e.stopPropagation) e.stopPropagation()
        else e.cancelBubble = true;
    };

    /* 
    * 这是捕获在拖动介绍时发生的最终mouseup事件
     */
    function upHandler(e){
        if (!e) e = window.event;//IE
        if (document.removeEventListener) {
            document.removeEventListener('mousemove', moveHandler, true);
            document.removeEventListener('mouseup', upHandler, true);
        }
        else if (document.detachEvent) {
            // 用于IE5~IE8的事件模型
            elementToDrag.detachEvent('onlosecapture', upHandler);
            elementToDrag.detachEvent('onmousemove', moveHandler);
            elementToDrag.detachEvent('onmouseup', upHandler);
            elementToDrag.releaseCapture();
        }
        if (e.stopPropagation) e.stopPropagation()
        else e.cancelBubble = true;
    }
}