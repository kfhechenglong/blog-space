/**
 * Created by jhon on 2019/2/26.
 */
let LineRender = require('./LineRender');
let lineRender = new LineRender('./1.txt','utf8');
lineRender.on('newline',function(data) {
  console.log(data);
});
lineRender.on('end',function (end) {
  console.log(end);
});
