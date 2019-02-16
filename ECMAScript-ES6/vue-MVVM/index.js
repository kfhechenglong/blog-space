
// 定义Vue 类
function Vue ( options = {}) {
  this.$options = options;//将所有属性挂载在options
  var data = this._data = this.$options.data;
  // 定义一个观察方法,观察data的值
  observe(data);
  // 数据代理，this代理_data;
  for(let key in data){
    Object.defineProperty(this,key,{
      enumerable:true,
      get(){
        return this._data[key];
      },
      set(new_val){
        this._data[key] = new_val;
      }
    })
  }
  // 初始化计算属性
  initComputed.call(this);
  // 模板编译
  new Compile(options.el,this);
};
function initComputed (){
  let that = this;
  let computed = this.$options.computed;
  Object.keys(computed).forEach(function (k) {
    Object.defineProperty(vm,k,{
      set(){},
      get: typeof computed[k] === 'function' ? computed[k] : computed[k].get
    })
  })
}

// 定义编译模板函数
function Compile(el,vm){//el表示替换的范围
  vm.$el = document.querySelector(el);
  // 定义文档片段，暂时保存在内存中
  let fragment = document.createDocumentFragment();
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }
  replace(fragment);
  // 定义模板替换函数
  function replace (fragment){
    Array.from(fragment.childNodes).forEach(function(node){
      // 循环节点
      let text = node.textContent;
      // 正则匹配{{}}
      let reg = /\{\{(.*)\}\}/;
      if(node.nodeType === 3 && reg.test(text)){
        console.log(RegExp.$1);
        // 获取{{}}中的变量
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(function(k){
          val = val[k];
        });
        // 监听值的变化
        new Watcher(vm,RegExp.$1,function (newVal) {
          node.textContent = text.replace(/\{\{(.*)\}\}/, newVal);
        })
        // 将获取的值替换到html中
        node.textContent = text.replace(/\{\{(.*)\}\}/,val);
      }
      if(node.nodeType === 1){
        // 获取元素的属性
        let nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(function (attr) {
          console.log(attr);
          let name = attr.name;//获取属性的名称
          let exp = attr.value;//获取属性的值
          if(name.indexOf('v-') === 0){
            node.value = vm[exp];//查找当前属性值的变量值，赋值给input
          }
          new Watcher(vm,exp,function (newVal) {
            node.value = vm[exp];
          })
          node.addEventListener('input',function (e) {
            let newVal = e.target.value;
            vm[exp] = newVal;//会触发set方法
          })
        })
      }
      if(node.childNodes){//如果当前节点还有节点
        replace(node);
      }
    })
  }
  // 重新渲染页面元素
  vm.$el.appendChild(fragment);
}


// 给观察对象增加ObjectDefineProperty
function Observe (data) {
  let dep = new Dep;
  for (const key in data) {//把data的属性通过Object.defineProperty定义属性
    let val = data[key];
    observe(val);
    Object.defineProperty(data,key,{
      enumerable:true,
      get(){//获取值
        Dep.target && dep.addSub(Dep.target);//添加监听函数
        return val;
      },
      set(new_val){//赋值
        if(new_val === val){
          // 如果要设置的值没有改变
          return;
        }
        val = new_val;
        observe(val);//为设置的值添加get和set方法
        dep.notify();//执行watcher的update方法；
      }
    })
  }
}
function observe (data) {
  if(typeof data !== 'object') return;
  return new Observe(data)
}
