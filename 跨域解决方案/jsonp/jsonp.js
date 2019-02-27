
/**
 * Created by he on 2019/2/26.
 */
function jsonp({url,params,callback}){
  return new Promise((resolve,reject) => {
    let jsonp_script = document.createElement('script');
    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(jsonp_script);
    };
    params = {...params,callback};
    let params_arr = [];
    for(let key in params) {
      params_arr.push(`${key}=${params[key]}`);
    }
    let src = `${url}?${params_arr.join('&')}`;
    jsonp_script.setAttribute('src', src);
    document.body.appendChild(jsonp_script);
  })
};
jsonp({
  url:'http://localhost:3000/test',
  params:{wd:1234567},
  callback:'callback_test'
}).then(res => {
  console.log(res);
})

