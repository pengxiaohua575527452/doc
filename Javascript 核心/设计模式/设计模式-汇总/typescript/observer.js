"use strict";
console.log('观察者模式');
// 观察者模式
// 业务需求
// 查询用户信息模块 
// 网站登录后需要显示用户的头像 【属于导航模块】
// 用户的消息 【属于消息模块】
// 用户的购物车信息 【属于购物车模块】
// 以上4个模块分别属于不同的人编写的代码
// 需要写作完成上面的数据
var Config;
(function (Config) {
    Config.LOADING_IMAGE_SRC = "./static/loading.gif";
})(Config || (Config = {}));
var ObserverMode;
(function (ObserverMode) {
    /** 类声明-------------------------------------------------------------------------------------- */
    /**
     * 基础的发布者
     * 基础班的发布者
     */
    class Publisher {
        constructor() {
            let subscriberMap = new Map();
            let id = 0;
            const from = "publisher";
            this.subscribe = function (subscriber) {
                subscriberMap.set(id++, subscriber);
                return (function (id) {
                    return function () {
                        subscriberMap.delete(id);
                    };
                })(id);
            };
            this.publishe = function (body) {
                subscriberMap.forEach(subscriber => {
                    subscriber({ from, body });
                });
            };
        }
    }
    /**
     * 业务类
     * 登录消息的发布者
     * 实现了可以先发布 后订阅同样能够收到
     */
    class PublisherLogin extends Publisher {
        constructor() {
            super();
            let subscriberMap = new Map();
            let bodys = [];
            let id = 0;
            let from = "publisherLogin";
            this.subscribe = function (subscriber) {
                // 如果有历史消息，马上调用；
                bodys.forEach(body => {
                    subscriber({ from: from, body });
                });
                subscriberMap.set(id++, subscriber);
                return (function (id) {
                    return function () {
                        subscriberMap.delete(id);
                    };
                })(id);
            };
            this.publishe = function (body) {
                bodys.push(body); // 添加到历史记录
                subscriberMap.forEach(subscriber => {
                    subscriber({ from, body });
                });
            };
        }
    }
    ObserverMode.PublisherLogin = PublisherLogin;
})(ObserverMode || (ObserverMode = {}));
// 登录模块
var Login;
(function (Login) {
    /**
     * 实现login方法
     * @returns
     */
    Login.login = function () {
        return new Promise(resolve => [
            // 模拟登录请求
            setTimeout(() => {
                console.log('登录完成了-----');
                resolve({
                    name: 'bill',
                    id: 'bill-id',
                    avatar: "https://img14.360buyimg.com/n0/jfs/t1/165345/29/23245/125420/6139b8ffEf1fbaadd/97aa85c46fc75526.png"
                });
            }, 3000)
        ]);
    };
})(Login || (Login = {}));
// 显示头像的而导航模块
var Nav;
(function (Nav) {
    /**
     * 基类
     */
    class Avatar {
        constructor(_img_) {
            this.updateAvatarElement = function (_newImage_) {
                _img_ = _newImage_;
                return this;
            };
            this.updateAvatarSrc = function (src) {
                // 如果插入的是等待动画
                if (src === Config.LOADING_IMAGE_SRC) {
                    _img_.setAttribute("src", src);
                    return;
                }
                // 如果插入的不是等待动画需要实现预加载
                // 然后再插入
                let _preImage_ = new Image();
                _preImage_.onload = function () {
                    _img_.setAttribute("src", src);
                };
                _preImage_.setAttribute("src", src);
            };
        }
    }
    Nav.Avatar = Avatar;
})(Nav || (Nav = {}));
// 显示用户消息模块
var Message;
(function (Message_1) {
    /**
     * 基础模块类
     *  查询消息列表
     */
    function requestMessageList(id) {
        return new Promise(resolve => {
            console.log('开始查询消息列表');
            // 模拟查询 消息列表
            setTimeout(() => {
                let messageList = [
                    { id: "1", content: "1" },
                    { id: "2", content: "2" },
                    { id: "3", content: "3" },
                ];
                resolve(messageList);
            }, 2000);
        });
    }
    Message_1.requestMessageList = requestMessageList;
    /***
     * 基础模块类
     * 更新消息数据
     */
    class Message {
        updateMessageList(msg) {
            console.dir('更新了 消息列表数据： ', msg);
        }
        constructor() { }
    }
    Message_1.Message = Message;
})(Message || (Message = {}));
// 首页页面模块
// 用来组合实现各模块的功能完成业务
var ProgramIndexPage;
(function (ProgramIndexPage) {
    // 创建一个发布订阅
    let publisherLogin = new ObserverMode.PublisherLogin();
    // 调用登录
    Login
        .login()
        .then(res => {
        console.log('发布了login 消息');
        //登录完成 发布消息
        publisherLogin.publishe(res);
    });
    /**
     * 各个组件订阅消息----------------------------------------------------------------------------
     **/
    // 导航组件的 avatar 订阅 login 消息
    const _img_ = new Image();
    document.body.appendChild(_img_);
    let avatar = new Nav.Avatar(_img_);
    avatar.updateAvatarSrc(Config.LOADING_IMAGE_SRC);
    // 测试先发布后订阅
    setTimeout(() => {
        console.log('导航模块订阅了 login 消息');
        let avatarModuleUnsubscribePublisherLogin = publisherLogin
            .subscribe((publishedData) => {
            avatar.updateAvatarSrc(publishedData.body.avatar);
        });
    }, 8000);
    // 消息组件 订阅 login 消息
    let message = new Message.Message();
    let messageModuleUnsubscribePublisherLogin = publisherLogin
        .subscribe((publishedData) => {
        Message
            .requestMessageList(publishedData.body.id)
            .then(message.updateMessageList);
    });
    console.log('消息组件订阅了消息');
})(ProgramIndexPage || (ProgramIndexPage = {}));
