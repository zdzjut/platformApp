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
function upup(pictureUrl,num) {
    var serverUri = encodeURI(url + '/app/file');

    function fileTransferSuccess(result) {
        alert(result.response);
        // if(result.response.result!=='success'){
        //     alert(num+"上传失败，原因是" + result.response.message);
        // }  else{
        //     alert(num+"上传成功，原因是" + result.response.message);
        // }
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
    alert();
     // document.getElementById('uploading').val('上传中，请稍等');
    upup(myImage1,1);
    upup(myImage2,2);
    upup(myImage3,3);
    upup(myImage4,4);
}