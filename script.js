var videoPlayer = document.querySelector('#player');
var containerCamera = document.querySelector('#containerCamera');
var canvas = document.querySelector('#canvas');
var front = true;
var image;

function initializeMedia() {
    if (!('mediaDevices' in navigator)) {
        navigator.mediaDevices = {};
    }

    if (!('getUserMedia' in navigator.mediaDevices)) {


        navigator.mediaDevices.getUserMedia = function (constraints) {

            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented!'));
            }

            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    var constraints = {};


    if(front===false){
        constraints = { video: {facingMode: "environment", width: { min: 320, ideal: window.screen.availWidth, max: 1920 },
            height: { min: 568, ideal: window.screen.availHeight, max: 1080 } }} ;
        console.log("Running rear camera");
    }
    else{
        constraints = { video: {facingMode: "user", width: { min: 320, ideal: window.screen.availWidth, max: 1920 },
            height: { min: 568, ideal: window.screen.availHeight, max: 1080 } }} ;
        console.log("Running front camera.");
    }

    console.log("constraints1 video is : " + constraints.video.facingMode);

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            window.stream = stream;

            videoPlayer.srcObject = stream;
            // videoPlayer.play();
            // console.log("Running again.......");  localStream.getVideoTracks()[0].stop();
        })
        .catch(function (err) {
            console.log(err);
        });


}
initializeMedia();


function capture(){

    canvas.style.display = 'block';
    containerCamera.style.display = 'none';
    var context = canvas.getContext('2d');
    // context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
    context.drawImage(videoPlayer, 0, 0, canvas.width, (videoPlayer.videoHeight) / 6);
    videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
        track.stop();
    });
    // image = dataURItoBlob(canvas.toDataURL());
    image = canvas.toDataURL();
// console.log(image);

}
