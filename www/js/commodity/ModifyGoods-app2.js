/**
 * 显示4 张图片
 */
function showModify() {
    var id = getMap("commodityId");
    var temp = url.replace("-", "/app/detailCommodity");
    $.ajax({
        url: temp,
        type: "POST",
        data: {
            "id": id
        },
        dataType: "jsonp",
        jsonp: "callback",
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                //获取4张图片的数据库名称
                var businessCommodityInfo = data.data.businessCommodityInfo;
                var commodityImg = businessCommodityInfo.commodityImg;
                var commodityBrandImg = businessCommodityInfo.commodityBrandImg;
                var commodityInnerImg = businessCommodityInfo.commodityInnerImg;
                var commodityOtherImg = businessCommodityInfo.commodityOtherImg;
                modifyShowPicture("commodityImg", commodityImg);
                modifyShowPicture("commodityBrandImg", commodityBrandImg);
                modifyShowPicture("commodityInnerImg", commodityInnerImg);
                modifyShowPicture("commodityOtherImg", commodityOtherImg);
            } else {
                alert(data.message);
            }
        }
    });
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
        //存储发生过改变的图片
        var id = getMap('nowId');
        var image = document.getElementById(id);
        image.src = imageURI;
        setMap(id, imageURI);
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
        destinationType: 1 //存储照片的数据/0data 1url 2 native url// 路径
    });

    function takePictureSuccess(imageURI) {
        var id = getMap('nowId');
        var image = document.getElementById(id);
        image.src = imageURI;
        setMap(id, imageURI);
        $("#newgoods-section-" + id).css("display", "inline-block");

    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }

    hideDg();
}


/**文件上传start***/
function modifyPicture(pictureUrl, type, wfStatus) {
    //若为网络地址，返回
    var str = pictureUrl.split(":")[0];
    if (str === "http" || pictureUrl === null || pictureUrl === '') {
        return;
    }
    var commodityId = getMap("commodityId");
    var temp = url.replace("-", '/app/modifyCommodityPicture');
    var serverUri = encodeURI(temp + '&type=' + type + '&commodityId=' + commodityId + '&wfStatus=' + wfStatus);

    function fileTransferSuccess(result) {
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

/**文件上传end***/

function submitPicture(wfStatus) {
    //此处src为服务器的地址
    var commodityImg = document.getElementById('commodityImg').src;
    var commodityBrandImg = document.getElementById('commodityBrandImg').src;
    var commodityInnerImg = document.getElementById('commodityInnerImg').src;
    var commodityOtherImg = document.getElementById('commodityOtherImg').src;
    modifyPicture(commodityImg, 'commodityImg', wfStatus);
    modifyPicture(commodityBrandImg, 'commodityBrandImg', wfStatus);
    modifyPicture(commodityInnerImg, 'commodityInnerImg', wfStatus);
    modifyPicture(commodityOtherImg, 'commodityOtherImg', wfStatus);

    removeMap("commodityId");
    location.href = "../../html/commodity/Commodity-app.html";
}

