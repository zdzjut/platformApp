// pictureCache('commodityImg');
// pictureCache('commodityBrandImg');
// pictureCache('commodityInnerImg');
// pictureCache('commodityOtherImg');

//在返回上一步时保存图片
// function pictureCache(id) {
//     var imageURI = getMap(id);
//     if (imageURI !== null) {
//         var image = document.getElementById(id);
//         image.src = imageURI;
//         $("#newgoods-section-" + id).css("display", "inline-block");
//     }
// }

//点击右上角叉号 去除图片
function removePictureShow(id) {
    var image = document.getElementById(id);
    image.removeAttribute("src");
    $("#newgoods-section-" + id).css("display", "none");

}

//去除返回上一步时保存图片的缓存
// function deletePictureCache() {
//     removeMap('commodityImg');
//     removeMap('commodityBrandImg');
//     removeMap('commodityInnerImg');
//     removeMap('commodityOtherImg');
// }


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

$(".overlay").click(function () {
    hideDg();
});

/**选择图片库***/
function fetchPictures() {
    navigator.camera.getPicture(fetchPictureSuccess, fetchPictureFail, {
        quality: 50,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//打开系统的图片库
        destinationType: 1,
        saveToPhotoAlbum: true

    });

    function fetchPictureSuccess(imageURI) {
        var id = getMap('nowId');
        var tempId = getMap('tempId');
        var image = document.getElementById(id);
        image.src = imageURI;
        upup(imageURI, id, tempId);
        $("#newgoods-section-" + id).css("display", "inline-block");
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
        destinationType: 1 //存储照片的数据/0data 1url 2native url// 路径
    });

    function takePictureSuccess(imageURI) {
        var id = getMap('nowId');
        var tempId = getMap('tempId');
        var image = document.getElementById(id);
        image.src = imageURI;
        upup(imageURI, id, tempId);
        $("#newgoods-section-" + id).css("display", "inline-block");

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
        return;
    }
    var temp = url.replace("-", '/app/file');
    var serverUri = encodeURI( temp+"&type="+ type + '&tempId=' + tempId);

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
    if (!confirm("确认提交,请勿多次提交")){
        return;
    }
    var tempId = getMap('tempId');
    var temp = url.replace("-", "/app/insertCommodity");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            'tempId': tempId,
            'type': type
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 3000,
        success: function (data) {
            if (data.result === 'success') {
                location.href = "../../html/commodity/Commodity-app.html";
            } else {
                alert(data.result + data.message);
            }
            removeMap("tempId");
        }
    });

}
