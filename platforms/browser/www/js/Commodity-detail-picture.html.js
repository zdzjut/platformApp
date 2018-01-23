// var url = 'http://192.168.1.5:7087';
var url = 'http://192.168.2.120:7087';

/**选择图片库***/
// $("#myImage1").click(function () {
//     alert('选择拍照或文件,并传递id');
// });
function fetchPictures(id) {
    navigator.camera.getPicture(fetchPictureSuccess, fetchPictureFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,//打开系统的图片库
        destinationType: Camera.DestinationType.FILE_URI,//存储照片的数据/路径
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
    });

    function fetchPictureSuccess(imageURI) {
        var image = document.getElementById(id);
        image.src = imageURI;
        // upup(imageURI);
    }

//获取文件失败
    function fetchPictureFail(message) {
        alert('获取文件失败' + message);
    }
}


/**拍照上传***/
function capturePictures(id) {
    navigator.camera.getPicture(takePictureSuccess, takePictureFail, {
        quality: 50,
        sourceType: 1,       //拍照
        destinationType: Camera.DestinationType.FILE_URI //存储照片的数据/路径
    });

    function takePictureSuccess(imageURI) {
        var image = document.getElementById(id);
        image.src = imageURI;
        // upup(imageURI);
    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }
}

/**文件上传start***/
function upup(pictureUrl, type, tempId) {
    if (pictureUrl === null || pictureUrl === undefined || pictureUrl === '') {
        alert(type + 'picture this is empty');
        return;
    }
    var serverUri = encodeURI(url + '/app/file?type=' + type + '&tempId=' + tempId);

    function fileTransferSuccess() {
    }

    function fileTransferError(error) {
        alert("异常代码" + error.code);
    }

    var fileUploadOptions = new FileUploadOptions();
    fileUploadOptions.fileKey = "file";
    fileUploadOptions.fileName = pictureUrl.substr(pictureUrl.lastIndexOf('/') + 1);
    fileUploadOptions.mimeType = "image/jpeg";
    var fileTransfer = new FileTransfer();
    fileTransfer.upload(pictureUrl, serverUri, fileTransferSuccess, fileTransferError, fileUploadOptions);
}

function submitPicture() {
    var myImage1 = document.getElementById('myImage1').src;
    var myImage2 = document.getElementById('myImage2').src;
    var myImage3 = document.getElementById('myImage3').src;
    var myImage4 = document.getElementById('myImage4').src;
    var tempId = window.localStorage.getItem('tempId');
    alert("开始提交图片，ID"+tempId);
    upup(myImage1, 'commodityImg', tempId);
    upup(myImage2, 'commodityInnerImg', tempId);
    upup(myImage3, 'commodityBrandImg', tempId);
    upup(myImage4, 'commodityOtherImg', tempId);


}

