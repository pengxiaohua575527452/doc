// 创建 立即执行函数的方法

void function(){
    console.log('立即执行函数1')
}();

(
    function fn(){
        console.log('立即执行函数2')
    }
)()