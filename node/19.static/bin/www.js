/*
 -d --root 静态文件目录
 -o --host 主机
 -p --port 端口号
*/
let yargs = require('yargs');
let Server = require('../src/app.js')
let argv = yargs.options('d',{
    alias:'root',
    demand:'false',
    type:'string',
    default:process.cwd(),
    description:'静态文件根目录'
}).options('o',{
    alias: 'host',
    demand: 'false',
    type: 'string',
    default: 'localhost',
    description: '请配置监听的主机'
}).options('p', {
    alias: 'port',
    demand: 'false',
    type: 'number',
    default: 8080,
    description: '请配置端口号'
}).usage('server [options]')
.example(
    'server -d / -p 8080 -o localhost'
).help('h').argv;
let server = new Server(argv);
server.start();
