
/***
 * 从命令行 接受参数
 * 
 * process.argv 
 * 接受命名行调用当前文件的 参数数组
 * [
 *    node 命令坐在的文件位置
 *    当前文件所在的路径
 *    …… 调用是的命令行的参数数组每个参数之间以空格分隔
 * ]
 * 
 * 例如：
 * >node process.argv.js 参数1 参数2
 * 执行的结果是
 * [
 *    '/usr/local/bin/node',
 *    '/Users/apple/Desktop/project/doc/NodeJS/process/process.argv.js',
 *    '参数1',
 *    '参数2'
 * ]
 */

console.log(process.argv)


