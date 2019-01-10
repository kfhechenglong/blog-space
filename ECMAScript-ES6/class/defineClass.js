"use strict"
/* *
*自定义一个类
 */
const _creatClass = function(){
	function defineProperties(target,props) {
		// 循环每一个元素
		for (let i = 0; i < props.length; i++) {
			// 获取每个属性描述器
			const descriptor = props[i];
			// 定义可枚举属性
			descriptor.enumerable = descriptor.enumerable || false;
			// 定义可配置属性
			descriptor.configurable = true;
			// 可修改
			if("value" in descriptor) descriptor.writable = true;
			// 向目标对象上的原型对象上增加属性
			Object.defineProperty(target,descriptor.key,descriptor);
		}
	}
	return function(Constructor,protoProps,staticProps){
		// 如果存在原型属性的话
		if(protoProps) defineProperties(Constructor.prototype,protoProps);
		// 如果存在静态属性
		if(staticProps) defineProperties(Constructor,staticProps);
		return Constructor;
	}
}();
// 类的调用检查
function _classCallCheck(instance,Constructor){
	if(!(instance instanceof Constructor)){
		throw new TypeError("不能将类作为一个函数调用！");
	}
}

const Parent = function(){
	function Parent(name) {
		// 类只能通过new对象调用
		_classCallCheck(this,Parent);
		this.name = name;
	}
	_creatClass(Parent,
		[
			{
				key:"getName",
				value:function getName(){
					console.log(this.name);
					return this.name;
				}
			}
		],
		[
			{
				key: "getStatic",
				value: function getStatic() {
					console.log('static method');
				}
			}
		]
	)
	return Parent;
}();

const getParent = new Parent('lao he');
console.log(getParent.getName());
Parent.getStatic();