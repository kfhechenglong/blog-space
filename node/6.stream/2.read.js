/**
 * Created by he on 2019/3/6.
 */
let ReadStrem = require('./ReadStream');
let path = require('path');
let rs = new ReadStrem(path.join(__dirname, './2.txt'), {
  hightWaterMark: 3
});
rs.on('open', () => {
  console.log('open');
});
rs.on('data', (data) => {
  console.log(data);
});

rs.on('end', () => {
  console.log('end');
});
