/*
* 1.冒泡排序
 */
/**
 * [sort description]
 * @param  {[Array]} elements [description]
 * @return {[type]}          [description]
 */
function sort(elements) {
	for (var i = 0; i < elements.length - 1; i++) {
		for (var j = 0; j < elements.length - i -1; j++) {
			if(elements[j] > elements[j + 1]){
				var temp = elements[j];
				elements[j] = elements[j +1];
				elements[j + 1] = temp;
			}
		}
	}
};
var arr1 = [3,1,5,4,6,2,10,22,44,33,55,8,9];
sort(arr1);
console.log('sort',arr1);
// 2、快速排序
/**
 * [quickSort description]
 * @param  {[Array]} arr [要排序的值]
 * @return {[Array]}     [排序后的值]
 */
function quickSort(arr){
	if(arr.length <= 1) return arr;
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex,1)[0];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] < pivot) left.push(arr[i]);
		else right.push(arr[i]);
	}
	return quickSort(left).concat([pivot],quickSort(right));
};
var arr2 = [3,1,5,4,6,2,10,22,44,33,55,8,9];
console.log('quickSort',quickSort(arr2))

// 3/插入排序
/**
 * 1、从第一元素开始，该元素可以认为已经被排序
 * 2、取出下一个元素，在已经排序的元素序列中从后向前扫描
 * 3、如果该元素大于新元素，将该元素移动到下一位置
 * 4、重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 * 5、将新元素插入到下一位置中，重复步骤2
 *
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function insort(arr){
	for (var i = 1; i < arr.length; i++) {
		if(arr[i] < arr[i - 1]){
			var temp = arr[i];
			var j = i - 1;
			arr[i] = arr[j];
			while(j >= 0 && temp < arr[j]){
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = temp;
		}
	}
}
var arr3 = [3,1,5,4,6,2,10,22,44,33,55,8,9];
insort(arr3)
console.log('insort',arr3);


// 4、二分查找
// 首先要找到一个中间值，通过中间值，大的放在右边，小的放在左边
// ，再两边中寻找中间值，持续以上操作，
// 直到找到所在位置为止
function binarySearch(data,dest){
	var end = data.length - 1;
	var start = 0;
	while(start <= end) {
		var m = Math.floor((start + end) / 2);
		if(data[m] == dest){
			return m;
		} else if(dest > data[m]){
			start = m + 1;
		} else {
			end = m -1;
		}
	}
	return false;
}
var arr4 = [3,1,5,4,6,2,10,22,44,33,55,8,9];
binarySearch(arr4,4)
console.log('binarySearch',arr4)


// 5、希尔排序
function shellSort(arr){
	var len = arr.length, temp,gap = 1;
	while(gap < len / 5) {
		gap = gap*5 +1;
	}
	for (gap; gap > 0; gap = Math.floor(gap / 5)) {
		for (var i = gap; i < len; i++) {
			temp = arr[i];
			for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
				arr[j + gap] = arr[j]
			}
			arr[j + gap] = temp;
		}
	}
	return arr
};
var arr5 = [3,1,5,4,6,2,10,22,44,33,55,8,9];

console.log('shellSort',shellSort(arr5))
// 6、基数排序
//
function radixSort(arr, maxDigit) {
  var counter = [];
  var mod = 10;
  var dev = 1;
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for(var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if(counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for(var j = 0; j < counter.length; j++) {
      var value = null;
      if(counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
};
var arr6 = [3,1,5,4,6,2,10,22,44,33,55,8,9];

console.log('radixSort',radixSort(arr6,2))
