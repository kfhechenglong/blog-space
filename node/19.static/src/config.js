/**
 * Created by jhon on 2019/3/16.
 */
let debug = require('debug')('static:config');
let path = require('path');
let config = {
  host:'localhost',//主机
  port:'8080',//端口号
  //root:process.cwd()//根目录
  root:path.resolve(__dirname,'..','public')
};
debug(config);
module.exports = config;
