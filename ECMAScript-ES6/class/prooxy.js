function defineReactive(data){
  return new Proxy(data,{
    set(target,key,value){
      console.log(target, key, value);
      if(target[key] != value){
        return Reflect.set(target,key,value);
      }
    }
  })
}

class Deom {
  constructor(options) {
    this._data = options.data;
    this.data = defineReactive(this._data);
    function loop(data) {
      for (const key in data) {
        let val = data[key];
        if(typeof val === 'object'){
          loop(val);
          data[key] = defineReactive(val);
        }
      }
    }
    loop(this.data);
  }
}
let test = new Deom({
  el:'#app',
  data:{
    name : { a : 1 },
    b : 2,
    c : 3,
    d : { name : 1}
  }
})
console.log('555');
test.data.d.name = 200;
console.log(test.data);
