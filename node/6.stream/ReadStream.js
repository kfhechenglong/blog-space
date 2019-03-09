// 创建可读流
let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.autoClose = options.autoClose || true;
    this.hightWaterMark = options.hightWaterMark || 64 * 1024;
    this.start = options.start || 0;
    this.end = options.end;
    this.encoding = options.encoding || 'utf8';
    this.open();//打开文件
    this.flowing = null;//当前文件读取的模式，null是暂停模式
    //每次读取的长度
    this.buffer = Buffer.alloc(this.hightWaterMark);
    this.ops = this.start;//读取的位置
    this.on('newListener', (eventName, callback) => {
      if (eventName === 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }

//  读取文件
  read() {
    //  读取文件时，先判断文件是否已经打开，没有打开就等打开后再读取
    if (typeof this.fd !== 'number') {
      //文件打开的时候，会触发open事件
      return this.once('open', () => this.read());
    }
    let howMuchToRead = this.end ? Math.min(this.hightWaterMark, this.end - this.pos + 1) : this.hightWaterMark;
    fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
      if (bytesRead > 0) {
        //  更新读取的位置
        this.pos += bytesRead;
        //  获取读取的数据
        let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead);
        //发送读取的数据
        this.emit('data', data);
        //当读取的位置大于要读的位置，就结束读取
        if (this.end && this.pos > this.end) {
          this.emit('end');
          this.destory();
        }
        if (this.flowing) {
          this.read();
        }
      } else {
        //  如果没有读到文件就结束
        this.emit('end');
        this.destory();
      }
    })
  }

  /*
   * 定义关闭文件destory方法
   * */
  destory() {
    //先判断有没有fd,有就直接关闭文件，并发送close
    if (typeof this.fd === 'number') {
      fs.close(this.fd, () => {
        this.emit('close');
      });
      return;
    }
    this.emit('close');
  }

// 打开文件,定义open方法
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {//如果有错误就发送错误信息
        this.emit('error', err);
        if (this.autoClose) {
          this.destory();
        }
        return;
      }
      this.fd = fd;
      this.emit('open');
    });
  }

  pipe(ws) {
    this.on('data', (chunk) => {
      let flag = ws.write(chunk);
      if (!flag) {
        this.pause();
      }
    });
    this.on('drain', () => {
      this.resume();
    })
  }

  resume() {
    this.flowing = true;
    this.read();
  }

  pause() {
    this.flowing = false;
  }
}
module.exports = ReadStream;
