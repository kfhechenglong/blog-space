/**
 * Created by he on 2019/3/6.
 */

let fs = require('fs');
let path = require('path');
let ReadStream = require('./ReadStream');
let WritStream = require('./WirteStream');
let rs = new ReadStream(path.join(__dirname, './2.txt'), {
  hightWaterMark: 4
});
let ws = new WritStream(path.join(__dirname, './3.txt'), {
  hightWaterMark: 1
});
rs.pipe(ws);
rs.on('data', (data) => {
  console.log(`read + ${data}`);
});
ws.on('drain', function () {
  console.log('drain');
  rs.resume();
});
ws.on('error', function (err) {
  console.log('error' + err);
});
