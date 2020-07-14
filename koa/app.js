const koa = require('koa');
const app = new koa();

app.listen(3000,() => {
    console.log(`koa 牛刀小试！`)
})
