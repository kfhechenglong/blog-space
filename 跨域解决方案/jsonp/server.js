/**
 * Created by he on 2019/2/26.
 */
//创建一个本地服务
let express = require('express')
let app = express()
app.get('/test', function (req, res) {
  let { wd, callback } = req.query
  console.log(wd)
  console.log(callback)
  res.end(`${callback}('这是测试的内容！')`)
})
app.listen(3000)
