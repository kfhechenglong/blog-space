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
    this.mode = options.mode;
    this.start = options.start || 0;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
  }
}

module.exports = WirteStream;
