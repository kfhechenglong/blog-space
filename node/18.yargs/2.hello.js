/**
 * Created by jhon on 2019/3/15.
 */
let yargs = require('yargs');
//let argv = yargs.argv;
//console.log(argv);
let argv = yargs.options('n',{
  alias:'name',
  demand:true,//必填
  default:'hechenglong',
  description:'这是测试的内容！'
}).argv;
console.log('hello' + argv.name);
