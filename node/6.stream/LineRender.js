/**
 * Created by jhon on 2019/2/26.
 */
let fs = require('fs');
let EventEmitter = require('events');
let path = require('path');
let util = require('util');;
/*
* 在window系统下，换行回车是\n\r 0x0d 0x0a
* 在mac下市\n
* */

const NEW_LINE = 0x0A;// /n换行
const RETURN = 0x0D; // /r 回车
function LineRender(path,ecoding) {
  EventEmitter.call(this);
  this._render = fs.createReadStream(path);
  this.encoding = ecoding || 'utf8';
  this.on('newListener',(type,listener) => {
    if(type == 'newline') {
    //  监听newline ,说明开始读取数据
      let buffers = [];
      this._render.on('readable',() => {
        let char;
        while (null != (char = this._render.read(1))) {
          switch (char[0]) {
            case NEW_LINE:
              this.emit('newline',Buffer.from(buffers).toString(this.encoding));
              buffers.length = 0;
              break;
            case RETURN:
              this.emit('newline',Buffer.from(buffers).toString(this.encoding));
              buffers.length = 0;
              let nChar = this._render.read(1);
              if(nChar[0] != NEW_LINE){
                buffers.push(nChar[0]);
              }
              break;
            default:
              buffers.push(char[0]);
          }
        }
      });
      this._render.on('end',() => {
        this.emit('newline',Buffer.from(buffers).toString(this.encoding));
        buffers.length = 0;
        this.emit('end','读取结束！');
      })
    }
  })
};
util.inherits(LineRender,EventEmitter);
module.exports = LineRender;
