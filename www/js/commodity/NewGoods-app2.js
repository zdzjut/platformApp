pictureCache( 'commodityImg');
pictureCache( 'commodityBrandImg');
pictureCache( 'commodityInnerImg');
pictureCache( 'commodityOtherImg');
//在返回上一步时保存图片
function pictureCache(id) {
    var idCache= getMap(id);
    if (idCache!==null){
        $("#"+id).src=idCache;
    }
}


function show(id) {
    setMap('nowId', id);
    showDg();
}

function dialog() {
    removeMap('nowId');
    hideDg();
}


//显示遮罩层和弹出窗
function showDg() {
    $(".overlay").show();
    $(".mask").show(50);
}

//隐藏遮罩层和弹出窗
function hideDg() {
    $(".mask").hide();
    $(".overlay").hide();
}

/**选择图片库***/
function fetchPictures() {
    navigator.camera.getPicture(fetchPictureSuccess, fetchPictureFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,//打开系统的图片库
        destinationType: Camera.DestinationType.FILE_URI,//存储照片的数据/路径
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
    });

    function fetchPictureSuccess(imageURI) {
        var id = getMap('nowId');
        var image = document.getElementById(id);
        image.src = imageURI;
        setMap(id,imageURI);
    }

//获取文件失败
    function fetchPictureFail(message) {
    }
    hideDg();
}


/**拍照上传***/
function capturePictures() {
    navigator.camera.getPicture(takePictureSuccess, takePictureFail, {
        quality: 50,
        sourceType: 1,       //拍照
        destinationType: Camera.DestinationType.FILE_URI //存储照片的数据/路径
    });

    function takePictureSuccess(imageURI) {
        var id = getMap('nowId');
        var image = document.getElementById(id);
        image.src = imageURI;
    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }
    hideDg();
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
        alert("出现网络异常，异常代码" + error.code);
    }

    var fileUploadOptions = new FileUploadOptions();
    fileUploadOptions.fileKey = "file";
    fileUploadOptions.fileName = pictureUrl.substr(pictureUrl.lastIndexOf('/') + 1);
    fileUploadOptions.mimeType = "image/jpeg";
    var fileTransfer = new FileTransfer();
    fileTransfer.upload(pictureUrl, serverUri, fileTransferSuccess, fileTransferError, fileUploadOptions);
}

function submitPicture(type) {
    var commodityImg = document.getElementById('commodityImg').src;
    var commodityBrandImg = document.getElementById('commodityBrandImg').src;
    var commodityInnerImg = document.getElementById('commodityInnerImg').src;
    var commodityOtherImg = document.getElementById('commodityOtherImg').src;
    var tempId = window.localStorage.getItem('tempId');
    upup(commodityImg, 'commodityImg', tempId);
    upup(commodityBrandImg, 'commodityBrandImg', tempId);
    upup(commodityInnerImg, 'commodityInnerImg', tempId);
    upup(commodityOtherImg, 'commodityOtherImg', tempId);
    $.ajax({
        url: url + "/app/insertCommodity",
        type: "post",
        data: {
            'tempId': tempId,
            'type':type
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 0,
        success: function (data) {
            if (data.result === 'success') {
                location.href = "../../html/commodity/Commodity-app.html";
            } else {
                alert(data.result+data.message);
            }
            removeMap("tempId");
        },
        error: function (e) {
            alert(e)
        }
    });

}