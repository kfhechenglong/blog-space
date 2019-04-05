# h5标签
## 让ie低版本兼容h5标签
```
<!--让IE8及以下兼容部分HTML5新标签-->
<!--IE提供了一个hack（后门）-->
<!--[if lte IE 8]>
    <script>
        document.createElement('header');
        document.createElement('nav');
        document.createElement('section');
        document.createElement('article');
        document.createElement('aside');
        document.createElement('footer');
    </script>
<![endif]-->

```
