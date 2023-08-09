import {proxy, effect, trigger, track} from './index.mjs'
const data = {
  foo: 1,
  bar: 2
}
// 获取代理的值
const getProxy = proxy(data);

// watch

export function watch(source, cb, options = {}) {
  // 定义getter，表示watch可以接收一个getter
  let getter = null
  if (typeof source === 'function') {
    // 如果传入的数据是一个函数，则直接赋值值getter
    getter = source
  } else {
    // 否则安装object进行递归调用读取
    getter = () => traverse(source)
  }
  // 定义监听执行前的旧值和新值
  let oldValue, newValue

  const job = () => {
    // 先重新执行一下副作用函数，得到更新的值
    newValue = effectFn()
    // 将新值和旧值作为回调参数传回
    cb(oldValue, newValue)
    // 更新旧值和新值
    oldValue = newValue
  }
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: job
    }
  )
  if (options.immediate) {
    // 当需要立即监听执行是，需要立即触发执行job函数
    job()
  } else {
    // 需要手动调用副作用函数，拿到的值是旧值
    oldValue = effectFn()
  }
}

function traverse(value, seen = new Set()) {
  // 如果要监听的值是原始值或者是空值，或者是已经读取过的值，则什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  // 将要监听的数据放到seen中，代表遍历读取过，避免循环引用引起死循环
  seen.add(value)
  // 目前仅仅假设value是一个对象
  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      traverse(value[key], seen)
    }
  }
  return value
}

watch(() => getProxy.foo, (oldValue, newValue) => {
  console.log(oldValue, newValue)
})
// getProxy.foo++
getProxy.foo++