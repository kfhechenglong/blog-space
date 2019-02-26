/**
 * Created by he on 2019/2/26.
 */
//创建一个本地服务
let express = require('express');
let app = express();
app.get('/test',function(req,res) {
  let {wd,callback} = req.query;
  console.log(wd);
  console.log(callback);
  res.send(`${callback} 这是响应的内容，你看着处理吧！`);
});
app.listen(3000);
