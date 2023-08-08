// 一个简单的响应系统
const bucket = new WeakMap()
const data = {
  foo: 1,
  bar: 2
}
let activeEffect = null
// 创建一个栈，收集副作用函数，栈顶是当前要执行的副作用函数
const effectStack = []
// 对原始数据进行代理
const obj = new Proxy(data, {
  // 拦截原始数据的获取
  get(target, key) {
    // console.log('get')
    // 追踪函数
    track(target, key)
    // 返回要获取读取的值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // console.log('set')
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
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前的副作用函数从栈中弹出来，并把activeEffect还原成之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  // 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.options = options
  effectFn.deps = []
  // 懒执行
  if(!options.lazy) {
    effectFn()
  }
  // 将副作用函数作为返回值返回，提供调用
  return effectFn
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

// 定义一个任务队列
const jobQueue = new Set()
const p = Promise.resolve()
// 定义一个变量标识代表是否正在刷新队列
let isFlushing = false;
function flushJob() {
  if(isFlushing) {
    return false
  }
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

// effect(() => {
//   console.log(obj.foo)
// },{
//   scheduler(fn) {
//     jobQueue.add(fn)
//     flushJob()
//   }
// })


// 定义计算属性
function computed (getter) {
  let value = null
  let dirty = true
  const effectFn = effect(
    getter,
    {
      lazy: true,
      scheduler() {
        // 数据响应时，将调度器中值设置为true
        dirty = true
      }
    }
  )
  const obj = {
    get value() {
      if (dirty) {
        // 为true时，每次均获取最新的数据
        value = effectFn()
        // 读取一次数据后，将标识设置为false,避免重复无用计算
        dirty = false
      }
      return value
    }
  }
  return obj
}

const sumRes = computed(() => obj.foo + obj.bar)
console.log(sumRes.value)
obj.foo++
obj.foo++
console.log(sumRes.value)
// setTimeout(() => {
//   obj.text = '自动修改了数据!'
// }, 1000)