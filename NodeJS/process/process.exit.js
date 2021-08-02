// 监听进程的退出

process.on('exit', code => {
  console.log('进程退出了， 退出码： ',code)
})


setTimeout(() => {
  // 执行进程退出
  // 会立即退出 即便有没有执行完测异步操作 也同样会执行
  // 同步的操作之前就已经执行了
  // 如果没有 退出吗 默认是 0；
  process.exit(0)
  console.log('执行完 process.exit() 后的打印，不会被执行')
},1000)

console.log('进程开始')