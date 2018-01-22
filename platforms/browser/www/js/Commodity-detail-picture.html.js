// var url = 'http://192.168.1.5:7087';
/**选择图片库***/
function fetchPictures(id) {
    window.localStorage.setItem('myImageId', id);
    navigator.camera.getPicture(fetchPictureSuccess, fetchPictureFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,//打开系统的图片库
        destinationType: Camera.DestinationType.FILE_URI,//存储照片的数据/路径
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
    });
}

function fetchPictureSuccess(imageURI) {
    var myImageId = window.localStorage.getItem('myImageId');
    window.localStorage.removeItem("myImageId");
    var image = document.getElementById(myImageId);
    image.src = imageURI;
    upup(imageURI);
}

//获取文件失败
function fetchPictureFail(message) {
    alert('获取文件失败'+message);
}


/**拍照上传***/
function capturePictures() {
    navigator.camera.getPicture(takePictureSuccess, takePictureFail, {
        quality: 50,
        sourceType: 1,       //拍照
        destinationType: Camera.DestinationType.FILE_URI //存储照片的数据/路径
    });
}

function takePictureSuccess(imageURI) {
    var image = document.getElementById('myImage1');
    image.src = imageURI;
    upup(imageURI);
}

//获取文件失败
function takePictureFail(message) {
    alert('获取拍照文件失败:'+message);
}

/**文件上传start***/
function upup(picUrl) {
    var serverUri = encodeURI(url+'/file');

    function fileTransferSuccess(result) {
        alert("success");
        alert("上传结果" + result.response);
    }

    function fileTransferError(error) {
        alert("异常代码" + error.code);
    }

    var fileUploadOptions = new FileUploadOptions();
    fileUploadOptions.fileKey = "file";
    fileUploadOptions.fileName = picUrl.substr(picUrl.lastIndexOf('/') + 1);
    fileUploadOptions.mimeType = "image/jpeg";
    var fileTransfer = new FileTransfer();
    fileTransfer.upload(picUrl, serverUri, fileTransferSuccess, fileTransferError, fileUploadOptions);
}