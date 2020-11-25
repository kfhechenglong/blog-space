
const obj = {};

console.log(Object.defineProperty(obj, 'a', {
	value: 123
}))

console.log(Reflect.has(obj, 'a'))

const proxy = new Proxy(obj, {
	set: function(target, name, value, receiver) {
		const success = Reflect.set(target, name, value, receiver);
		if (success) {
			console.log(target, name, value)
		}
		return success
	}
})
proxy.testReflect = 'Reflect'


const myObject = {
	foo: 1,
	bar: 2,
	get baz() {
		return this.foo + this.bar;
	},
}

console.log(Reflect.get(myObject, 'foo'))
Reflect.get(myObject, 'bar')
console.log(Reflect.get(myObject, 'baz'))
// 如果name属性部署了读取函数getter，则读取函数的this绑定receiver
console.log(Reflect.get(myObject, 'baz', {
	foo: 2,
	bar: 2
}))