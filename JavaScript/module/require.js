// define 声明模块，通过require使用一个模块
let factories = {};
// 定义模块的名字 依赖 工厂函数
function define (moduleName,dependencies,factory){
    factories[moduleName] = factory;
    factories.dependencies = dependencies;
}
function require(mods,callback) {
    let result = mods.map(function(mod){
        let factory = factories[mod];
        let exports;
        let dependencies = factories.dependencies;
        require(dependencies,function(){
            exports = factory.apply(null,arguments);
        })
        return exports;
    });
    callback.apply(null,result);
}
define('age', [], function () {
    return '20'
})
define('name',['age'],function(age){
    return 'this is name' + age
})
let str = require(['name'],function(result){
    console.log(result);
})