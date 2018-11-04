/* 
* 以一个对象的w和h属性的方式还回视口的尺寸
 */

 function getScrollOffsets(w){
    //  使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    // 除了IE 8以及以前版本，其它都可以用
     if (w.pageXOffset != null) return { w: w.innerWidth, h: w.innerHeight};
    //  针对非标准下的IE
    var d = document;
    if(document.compatMode == "CSS1Compat"){
        return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
    }
    // 对于怪异模式下的浏览器
    return {w:d.body.clientWidth,h:d.body.clientHeight};
 }