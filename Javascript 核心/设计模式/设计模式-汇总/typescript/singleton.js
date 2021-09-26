"use strict";
// 全局只需要有一个对象的模式
// 实例
// 显示登录窗口
var SingleTon;
(function (SingleTon) {
    SingleTon.createHTML = (function () {
        let element = null;
        // 优化能够创建多个不同类型的 HTML 单例模式
        return function (fn) {
            return element || (element = SingleTon.createLayout());
        };
    })();
    SingleTon.createLayout = function () {
        const _layout_ = document.createElement('div');
        _layout_.setAttribute('class', "layout");
        return _layout_;
    };
})(SingleTon || (SingleTon = {}));
// 测试
const _layout_ = SingleTon.createHTML(SingleTon.createLayout);
const _layout_2 = SingleTon.createHTML(SingleTon.createLayout);
// p
console.log(_layout_ === _layout_2);
