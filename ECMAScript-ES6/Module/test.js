
import Test2 from "./test2.js";
console.log(Test2);
let index = 2;
function Test() {
  Test2();
  console.log('test',index);
   index ++;
 }
Test2.count = 'this is count';
export default {
  Test,
  Test2
}
