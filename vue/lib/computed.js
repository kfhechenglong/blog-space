"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = void 0;
const index_1 = require("./index");
const data = {
    foo: 1,
    bar: 2
};
// 获取代理的值
const getProxy = (0, index_1.proxy)(data);
// 定义计算属性
function computed(getter) {
    let value = null;
    let dirty = true;
    const effectFn = (0, index_1.effect)(getter, {
        lazy: true,
        scheduler: () => {
            // 数据响应时，将调度器中值设置为true
            if (!dirty) {
                dirty = true;
                // 当计算属性依赖的响应式数据变化时，我们需要手动调用trigger函数来触发响应
                (0, index_1.trigger)(getValue, 'value');
            }
        }
    });
    const getValue = {
        get value() {
            if (dirty) {
                // 为true时，每次均获取最新的数据
                value = effectFn();
                // 读取一次数据后，将标识设置为false,避免重复无用计算
                dirty = false;
            }
            // 当读取value时，手动调用track函数进行追踪
            (0, index_1.track)(getValue, 'value');
            return value;
        }
    };
    return getValue;
}
exports.computed = computed;
const sumRes = computed(() => getProxy.foo + getProxy.bar);
(0, index_1.effect)(() => {
    console.log(sumRes.value);
});
getProxy.foo++;
// getProxy.foo++
