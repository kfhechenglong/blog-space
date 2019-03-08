/**
 * Created by jhon on 2019/3/2.
 */
let EventEmitter = require('events');
let fs = require('fs');

class ReadStream extends EventEmitter {
  constructor(path,options) {
    super(path,optiosn);
    this.path = path;
    this.flags = options.flags || 'r';
    this.mode = options.mode || 0o666;
    this.highWaterMark = options.highWaterMark || 64*1024;
    this.pos = this.start = options.start || 0;
    this.end = options.end;
    this.flowing = null;
    this.encoding = options.encoding || 'utf8';
    //如果给当前的实例添加监听函数，则会触发
    this.on('newListener',(type,listener) => {
      if(type == 'data'){
        //如果监听了data事件，则流会自动切换到流动模式；
        this.flowing = true;
       this.read();
      }
    });
    this.open();//打开文件开始读取
  }
  read(){

  }
  open () {
    fs.open(this.path,this.flags,this.mode,(err,fd) => {
      if(err) {
        if(this.autoClose){//如果文件存在，则销毁缓存
          this.destroy();
          return this.emit('error',err);
        }
      }
    //  如果没有错误
      this.fd = fd;
      this.emit('open',fd);
    })
  }
  destroy(){

  }
}
