/* 
* 以一个对象的x和y属性的方式还回滚动条的偏移量
 */

 function getScrollOffsets(w){
    //  使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    // 除了IE 8以及以前版本，其它都可以用
     if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset};
    //  针对非标准下的IE
    var d = document;
    if(document.compatMode == "CSS1Compat"){
        return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
    }
    // 对于怪异模式下的浏览器
    return {x:d.body.scrollLeft,y:d.body.scrollTop};
 }