import templateStr from "./template"  
import { getVideoDevicesInfo } from "./video-devices-info";
import { getMediaStream } from "./media-stream";


customElements.define('bfs-camera', class extends HTMLElement{

    _template_: HTMLTemplateElement;
    _shadowRoot_: ShadowRoot;
    _video_ : HTMLVideoElement | null = null;

    _hasAudio: boolean = true;

    eventCanPlay: CustomEvent =  new CustomEvent("canplay", {cancelable: true, bubbles: true})
    
    get hasAudio(){
        return this._hasAudio;
    }

    set hasAudio(b: boolean){
        this._hasAudio = b;
    }

    videoDevicesInfo: MediaDeviceInfo[] = [];
    mediaStream: MediaStream = new MediaStream();
    currentVolume: number = 1;
    currentDeviceId: string = "";

    constructor(){
        super()
        this._template_ = document.createElement('template');
        this._template_.innerHTML = templateStr;
        this._shadowRoot_ = this.attachShadow({ mode: 'open'})
        this._shadowRoot_.appendChild(this._template_.content)
        this._video_ = this._shadowRoot_.querySelector('.video');
        
        // 获取设备信息
        getVideoDevicesInfo()
        .then((_videoDevicesInfo)=> {
            this.videoDevicesInfo = _videoDevicesInfo ;
            this.currentDeviceId = this.videoDevicesInfo[0].deviceId;
            const constraints: MediaStreamConstraints = {
                video: { 
                    deviceId:  this.videoDevicesInfo[0].deviceId
                },
                audio: this.hasAudio
            }
            getMediaStream(constraints)
            .then(mediaStream=>{
                this.mediaStream = mediaStream ; 
                this.dispatchEvent(this.eventCanPlay)
            })
        })
    }

    /**
     * 播放
     */
    play():void{
        if(!this._video_) return;
        try{
            this._video_ .src = URL.createObjectURL(this.mediaStream);
        }catch(err){
            this._video_ .srcObject = this.mediaStream;
        }
        this._video_.play()
    }

    /**
     * 获取 video 对象
     */
    getVideo(): HTMLVideoElement{
        return (this._video_ as HTMLVideoElement);
    }

    /**
     * 静音
     */
    mute(): void{
        if(!this._video_) return;
        this.currentVolume = this._video_.volume;
        this._video_.volume = 0
    }

    /**
     * 发声
     * @returns 
     */
    vocal():void {
        console.log('发生')
        console.log('this.currentVolume: ', this.currentVolume)
        if(!this._video_) return;
        this._video_.volume = this.currentVolume;
    }

    /**
     * 切换摄像头
     */
    switchCamera(){
        const videoDeviceInfo = this.videoDevicesInfo.find(item => item.deviceId !== this.currentDeviceId)
        if(!videoDeviceInfo) {
            console.error('[错误 切换摄像头]: 只有一个摄像头无法切换')
            return 
        };

        const constraints: MediaStreamConstraints = {
            video: { 
                deviceId: videoDeviceInfo.deviceId
            },
            audio: this.hasAudio
        }

        getMediaStream(constraints)
        .then(mediaStream=>{
            this.mediaStream.getTracks().forEach(track => track.stop())
            this.mediaStream = mediaStream ; 
            this.play();
        })
    }

    
    /**
     * 拍摄照片
     * 通过canvas获取返回一个Blob
     * @param callback 回调函数
     * @returns 
     */
    /**
     * 拍摄照片
     * 通过 canvas 获取返回一个 data类型的URL
     * @returns 
     */
    takePhoto(): string{
        if(!this._video_){
            console.error('[错误 没有匹配的video对象]')
            return "";
        }
        const _canvas_ = document.createElement('canvas')
        _canvas_.width = this._video_.videoWidth;
        _canvas_.height = this._video_.videoHeight;
        _canvas_.getContext("2d")?.drawImage(
            this._video_,
            0, 0, this._video_.videoWidth, this._video_.videoHeight,
            0, 0, _canvas_.width, _canvas_.height
        )
        return  _canvas_.toDataURL('image/png')
    }
})