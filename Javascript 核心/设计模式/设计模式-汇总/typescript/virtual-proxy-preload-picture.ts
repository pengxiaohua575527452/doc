// 业务需求
// 通过 虚拟代理实现 大型图片的预加载



// 逻辑分析
// 先创建一个 图片节点
// 把节点的src 指向一个本地的图片
// 再载正式图片
// 正式图片载入完成后再 把图片节点的src 指向正式图片



module VirtualProxy{
    declare namespace PreloadPicture {
        interface AppendChildImage {
            insert: AppendChildImage.Insert;
            getImg: AppendChildImage.GetImg;
            setImgSrc: AppendChildImage.SetImgSrc;
        }
        namespace AppendChildImage {
            interface Insert {
                (container: HTMLElement): AppendChildImage;
            }
            interface GetImg {
                (): HTMLImageElement
            }
            interface SetImgSrc {
                (src: string): AppendChildImage
            }
        }

        interface CreateImageProxy {

        }
    }


    /**
     * 基础类
     * 操作 HTMLImageElement
     * 同 HTMLImageElement 属于强关联
     * 完全可以忽略 因为 HTMLImageElement 类的修改导致类的修改
     * 真正的插入一个imag节点的类
     */

    class AppendChildImage implements  PreloadPicture.AppendChildImage{
        insert: PreloadPicture. AppendChildImage.Insert;
        getImg: PreloadPicture.AppendChildImage.GetImg;
        setImgSrc: PreloadPicture.AppendChildImage.SetImgSrc;
        constructor(
            src: string, 
            className: string,
            container: HTMLElement
        ){
            const _img_ = new Image();
            _img_.setAttribute('src', src)
            _img_.setAttribute('class', className)
            container.appendChild(_img_)

            this.insert = function(container: HTMLElement){
                _img_.parentElement?.removeChild(_img_);
                container.appendChild(_img_);
                return this
            }

            this.getImg = function(){
                return _img_
            }

            this.setImgSrc = function(src: string){
                _img_.setAttribute('src', src)
                return this;
            }
        }
    }

    /**
     * 业务类
     * 代理类
     * 预加载 大型图片
     */
    class AppendChildImageProxy implements PreloadPicture.AppendChildImage {
        insert: PreloadPicture. AppendChildImage.Insert;
        getImg: PreloadPicture.AppendChildImage.GetImg;
        setImgSrc: PreloadPicture.AppendChildImage.SetImgSrc;
        constructor(
            src: string, 
            className: string,
            container: HTMLElement
        ){
            const appendChildImage = new AppendChildImage("./static/loading.gif", className, container)
            let _imgProxy_ = new Image()
            
            _imgProxy_.onload = function(){
                appendChildImage.setImgSrc(src);
            }
            
            // 模拟大图片载入事件
            setTimeout(() => {
                _imgProxy_.setAttribute("src", src)
            }, 1000)


            this.insert = function(container: HTMLElement){
                appendChildImage.insert(container)
                return this;
            }

            this.getImg = function(){
                return appendChildImage.getImg()
            }

            this.setImgSrc = function(src: string){
                appendChildImage.setImgSrc(src)
                return this;
            }

        }
    }

    // 测试是否可以使用
    // 测试是否打到预加载大型图片的代理问题
    // const appendChildImageProxy = new AppendChildImageProxy("./static/huge.jpeg", 'img', document.body);
    // 测试是否销毁了 _imgProxy_ 对象
   
}


// 修改 第二个版本
// 强调单一原则
// 解除 AppendChildImage 同 Image 类的强耦合关系
module VirtualProxy2{

interface SetSrc {
    (img: HTMLImageElement, src: string): HTMLImageElement
}


/**
 * 基础类 
 * 设置 img.src
 */
let setSrc = function(_img_: HTMLImageElement, src: string): HTMLImageElement{
    _img_.setAttribute("src", src)
    return _img_
}


/**
 * 代理类
 * 设置 img.src
 * 实现预加载功能
 */
// 配置文件
const loadingSrc = "./static/loading.gif"
let setSrcProxy = function(_img_: HTMLImageElement, src: string): HTMLImageElement{
    _img_.setAttribute("src", loadingSrc)
    let _imgProxy_ = new Image()
    _imgProxy_.onload = function(){
        setSrc(_img_, src);
        _imgProxy_ = (null as unknown as HTMLImageElement);
    }
        
    // 模拟大图片载入事件
    setTimeout(() => {
        _imgProxy_.setAttribute("src", src)
    }, 1000)
    
    return _img_
}

const _img_ = new Image();
setSrcProxy(_img_, "./static/huge.jpeg") 
document.body.appendChild(_img_)

}





 