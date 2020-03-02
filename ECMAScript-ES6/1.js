function *foo(){
    // console.log('foo start');
    yield 3;
    yield 4;
    // console.log('foo end')
}
function *bar(){
    yield 1;
    yield 2;
    yield *foo()
    yield 5;
    return 6
}
 var it = bar();
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
 console.log(it.next().value);
