"use strict";
// 代理模式 合并http 请求
// 业务
// 需要把文件同步到其他的服务器
// 把每次checkbox选中的文件自动的同步
var VirtualProxyMergeHttpRequest;
(function (VirtualProxyMergeHttpRequest) {
    // 默契请求
    function httpRequest(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('同步完成: ', data);
                resolve(data);
            }, 1000);
        });
    }
    /**
     * 基类
     * 同步操作
     */
    let synchronousOperation = function (data) {
        return httpRequest(data);
    };
    /**
     * 代理模式
     * 代理类
     * 代理实现 同步操作
     * 会把多次同步合并为一次操作
     */
    let synchronousOperationProxy = (() => {
        let list = [];
        let setTimeoutId;
        return function (data) {
            list.push(data);
            clearTimeout(setTimeoutId);
            return new Promise((resolve, reject) => {
                // 同步执行延时
                setTimeoutId = setTimeout(() => {
                    console.log('执行了');
                    let arr = [];
                    list.forEach(data => {
                        arr.push(synchronousOperation(data));
                    });
                    Promise
                        .all(arr)
                        .then(() => {
                        resolve('同步完成');
                    })
                        .catch(err => {
                        reject('同步出错');
                    });
                    list = [];
                }, 2000);
            });
        };
    })();
    // 测试
    // 插入 checkbox
    function insertCheckBox(id, container) {
        const _div_ = document.createElement('div');
        const _label_ = document.createElement('label');
        const _input_ = document.createElement('input');
        _input_.setAttribute('type', 'checkbox');
        _input_.setAttribute('id', id);
        _input_.setAttribute('value', id);
        _label_.setAttribute('for', id);
        _label_.innerText = `file-${id}`;
        _label_.appendChild(_input_);
        _div_.appendChild(_label_);
        container.appendChild(_div_);
    }
    const container = document.querySelector('body');
    container === null || container === void 0 ? void 0 : container.addEventListener('click', e => {
        if (Reflect.get(e.target || {}, "nodeName", e.target) === 'INPUT') {
            console.log('点击了input', Reflect.get(e.target || {}, "value", e.target));
            synchronousOperationProxy(Reflect.get(e.target || {}, "value", e.target));
        }
    });
    if (container !== null) {
        for (let i = 0; i < 10; i++) {
            insertCheckBox(i + "", container);
        }
    }
})(VirtualProxyMergeHttpRequest || (VirtualProxyMergeHttpRequest = {}));
