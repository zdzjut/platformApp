// 打开图片库
function choose1() {
    // 打开图片库
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,                                            // 相片质量是50
        sourceType: Camera.PictureSourceType.Camera,            // 设置从摄像头拍照获取
        destinationType: Camera.DestinationType.FILE_URI        // 以文件路径返回
    });
    function onSuccess(imageURI) {
        alert(imageURI);
        alert(imageURI.substr(imageURI.lastIndexOf('/') + 1));
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}
function choose2() {
    var _this=this;
    // 打开图片库
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,                                       // 相片质量是50
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, // 设置从图片库获取
        destinationType: Camera.DestinationType.DATA_URL       // 以base64返回
    });

    function onSuccess(imageData) {
        console.log(imageData)
        _this.$$('myImage').src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}