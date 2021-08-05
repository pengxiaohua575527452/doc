
function getMediaStream(constraints:MediaStreamConstraints):Promise<MediaStream>{
    return new Promise((resolve, reject) => {
        navigator
        .mediaDevices
        .getUserMedia(constraints)
        .then(mediaStream => {
            resolve(mediaStream)
        })
        .catch(err=> {
            reject(err)
        })
    })
    
}


export { getMediaStream }