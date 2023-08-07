function getFirstWord(msg:string) {
  console.log(msg.split(' ')[0])
}

getFirstWord('Hello World')

// 函数的重载
function green (name: string): string
function green (name: string[]): string[]
function green (name: string | string[]) {
  if (Array.isArray(name)) {
    return name
  }
  return name
}

console.log(green('he'))

console.log(green(['he', 'du']))