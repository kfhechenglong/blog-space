// 一个简单的响应系统
const bucket = new WeakMap()
const data = {
  foo: 1,
  bar: true
}
let activeEffect = null
// 创建一个栈，收集副作用函数，栈顶是当前要执行的副作用函数
const effectStack = []
// 对原始数据进行代理
const obj = new Proxy(data, {
  // 拦截原始数据的获取
  get(target, key) {
    console.log('get')
    // 追踪函数
    track(target, key)
    // 返回要获取读取的值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    console.log('set')
    // 先将要设置的值进行赋值操作
    target[key] = newVal;
    trigger(target, key)
    return true
  }
})

// 独立封装track函数追踪变化

function track(target,key) {
  // 将副作用函数添加到桶中
  if (!activeEffect) {
    return target[key]
  }
  // 根据从桶中获取的depsMap,它是一个map类型，key->effects
  let depsMap = bucket.get(target)
  if (!depsMap) {
    // 如果不存在depsMap，则需要新建一个Map，并需要与target进行关联
    depsMap = new Map()
    bucket.set(target, depsMap)
  }
  // 再根据key从depsMap中获取deps，他是一个Set类型
  let deps = depsMap.get(key);
  if (!deps) {
    // 如果不存在，则新建一个set并关联key值
    depsMap.set(key, (deps = new Set()))
  }
  // 最后将当前的副作用函数添加到桶里；
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}
// 在set拦截函数内调用trigger函数触发响应变化
function trigger(target, key) {
  // 变量副作用函数桶，并执行其中的函数
  const depsMap = bucket.get(target)
  if (!depsMap) return false
  const effects = depsMap.get(key)
  const effectToRun = new Set()
  effects && effects.forEach(effectFn => {
    // 如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    // 避免类似obj.foo++这样的无限递归调用造成栈溢出
    if (effectFn !== activeEffect) {
      effectToRun.add(effectFn)
    }
  })
  effectToRun.forEach(effectFn => {
    // 判断是否存在调度器
    if (effectFn.options.scheduler) {
      // 增加调度器的使用
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  });
}

function effect(fn, options = {}) {
  const effectFn = () => {
    // 调用cleanup函数完成清理
    cleanup(effectFn)
    activeEffect = effectFn
    // 副作用函数入栈
    effectStack.push(effectFn)
    fn()
    // 在当前副作用函数执行完毕后，将当前的副作用函数从栈中弹出来，并把activeEffect还原成之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
  }
  // 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.options = options
  effectFn.deps = []
  effectFn()
}
// f
function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn)
  }
  // 重置数组
  effectFn.deps.length = 0
}

let temp1, temp2;
effect(function effectFn1() {
  console.log(obj.foo)
}, {
  scheduler (fn) {
    console.log('调度函数')
    fn()
  }
})
obj.foo++
// setTimeout(() => {
//   obj.text = '自动修改了数据!'
// }, 1000)