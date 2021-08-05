// 获取媒体信息
function getVideoDevicesInfo(): Promise<MediaDeviceInfo[]>{
    const videoDevicesInfo: MediaDeviceInfo[] = [];
    return new Promise((resolve, reject) => {
        navigator
        .mediaDevices
        .enumerateDevices()
        .then( _mediaDevicesInfo => {
            _mediaDevicesInfo.forEach(item => {
                if(item.kind === 'videoinput'){
                    videoDevicesInfo.push(item)
                }
            })
            resolve(videoDevicesInfo)
        })
        .catch(err => {
            console.error('[错误 获取媒体设备失败]'+err.message)
            reject(err)
        })
    })
}


export { getVideoDevicesInfo }