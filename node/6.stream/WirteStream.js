/**
 * Created by he on 2019/3/6.
 */
let EventEmitter = require('events');
let fs = require('fs');

class WirteStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.autoClose = options.autoClose || true;
    this.mode = options.mode || 0o666;
    this.start = options.start || 0;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    // 定义文件的缓存区
    this.buffers = [];
    this.writing = false;//标记写入状态
    this.needDrain = false;//是否满足drain事件
    this.pos = 0;//写入的位置
    this.length = 0;//缓存区的大小
    this.open();
  }

  // 定义open方法
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err);
        if (this.autoClose) {
          this.emit('close');
          this.destory();
        }
      }
      this.fd = fd;
      this.emit('open');
    });
  }

  destory() {
    if (typeof this.fd === 'number') {
      return this.emit('close');
    }
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }

  write(chunk, encoding = this.encoding, callback = () => {
  }) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
    this.length += chunk.length;
    // 比较是否达到缓存区的大小
    let ret = this.length < this.highWaterMark;
    this.needDrain = !ret;//是否触发needDrain
    // 判断是否在写入，如果在写入就先将数据写入到缓存区
    if (this.writing) {
      this.buffers.push({
        encoding,
        chunk,
        callback
      });
    } else {
      this.writing = true;
      this._write(chunk, encoding, () => {
        callback();
        this.clearBuffer();
      })
    }
    return ret;
  }

  // 清除缓存区
  clearBuffer() {
    let buffer = this.buffers.shift();
    if (buffer) {
      this._write(buffer.chunk, buffer.encoding, () => {
        buffer.callback();
        this.clearBuffer();
      });
    } else {
      this.writing = true;
      if (this.needDrain) {
        this.needDrain = false;
        this.emit('drain');
      }
    }
  }

  _write(chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, callback))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
      if (err) {
        this.emit('error', err);
      }
      this.length -= byteWritten;
      this.pos += byteWritten;
      callback();
    })
  }
}

module.exports = WirteStream;
