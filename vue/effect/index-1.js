// 一个简单的响应系统
const bucket = new Set()
const data = {
  text: 'hell world'
}
let activeEffect = null
// 对原始数据进行代理
const obj = new Proxy(data, {
  // 拦截原始数据的获取
  get(target, key) {
    // 将副作用函数添加到桶中
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    // 返回要获取读取的值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 先将要设置的值进行赋值操作
    target[key] = newVal;
    // 变量副作用函数桶，并执行其中的函数
    bucket.forEach(fn => fn())
    return true
  }
})
function effect(fn) {
  activeEffect = fn
  fn()
}
// 初始触发副作用函数，对body进行赋值
effect(() => {
  console.log(obj.text)
})

setTimeout(() => {
  obj.text = '自动修改了数据!'
}, 1000)