let fs = require('fs');
//创建一个可读流
let rs = fs.createReadStream('./1.txt',{
  flags:'r',//对文件进行的操作
  mode:0o666,
  encoding:'utf8',
  start:3,//从索引3的位置开始读取
  end:8,//读取到索引8的位置(唯一一个包括结束索引的)
  highWaterMark:3
});

//highWaterMark缓冲区大小；
//监听它的data事件，当你一旦开始监听data事件的时候，流就可以读文件的内容并且发射data；
//
rs.on('open',function() {
  console.log('文件已被打开！');
});
//默认情况下，当监听data事件之后就会触发data事件，会不停的读取数据
rs.on('data',function (data) {
  console.log(data);
  rs.pause();//暂停读取和发射data事件
  setTimeout(function () {
    rs.resume();//恢复读取流
  },2000)
});
rs.on('error',function() {
  console.log('文件读取错误')
});
//文件读取完成，会触发end事件
rs.on('end',function() {
  console.log('文件读取完成！')
});
rs.on('close',function () {
  console.log('文件已关闭！');
});
