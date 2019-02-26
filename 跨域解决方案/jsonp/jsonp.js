/**
 * Created by he on 2019/2/26.
 */
function jsonp({url,params,callbcak}){
  return new Promise((resolve,reject) => {
    let jsonp_script = document.createElement('srcipt');
    window[callbcak] = function (data) {
      resolve(data);
      document.body.removeChild(jsonp_script);
    };
    params = {...params,callbcak};
    let params_arr = [];
    for(let key in params) {
      params_arr.push(`${key}=${params[key]}`);
    }
    jsonp_script.src = `${url}?&${params_arr.join('&')}`;
    document.body.appendChild(jsonp_script);
  })
};
jsonp({
  url:'http:localhost:3000/test',
  params:{wd:1234567},
  callbcak:'callback_test'
}).then(res => {
  console.log(res);
})
