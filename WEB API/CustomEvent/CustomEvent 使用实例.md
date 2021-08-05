## CustomEvent() 使用实例

### 实例：
```
// 创建 自定义事件对象
// 创建 事件目标对象
// 注册 事件监听器
// 移除 事件监听器
// 触发事件

const $myEvent = new CustomEvent(
    "event-name",
    {
        cancelable: true,
        bubbles: true,
        detail: "自定义事件的数据对象"
    }
)

const _eventTarget_  = new EventTarget()

function handle(e){
    _eventTarget_.removeEventListener('event-name', handle)
    console.log(e.detail)
}

_eventTarget_.addEventListener('event-name', handle)

_eventTarget_.dispatchEvent($myEvent)


```

