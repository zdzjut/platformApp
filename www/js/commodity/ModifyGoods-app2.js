/**
 * 显示4 张图片
 */
function showModify() {
    var id = getMap("commodityId");
    $.ajax({
        url: url + '/app/detailCommodity',
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


//点击右上角叉号 去除图片
//在修改页面存在：用户删除该图片的功能，叉掉后若不添加图片 需要给后台反馈
// function removePictureShow(id) {
//     var image = document.getElementById(id);
//     image.removeAttribute("src");
//     $("#newgoods-section-" + id).css("display", "none");
//     var removeId = getMap("removeId");
//     setMap("removeId", removeId === null ? id : removeId + "," + id);
//     alert("removeId:   "+getMap("removeId"));
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
function modifyPicture(pictureUrl, type) {
    //若为网络地址，返回
    var str = pictureUrl.split(":")[0];
    if (str === "http" || pictureUrl === null || pictureUrl === '') {
        return;
    }
    var commodityId = getMap("commodityId");
    var serverUri = encodeURI(url + '/app/modifyCommodityPicture?type=' + type + '&commodityId=' + commodityId);

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

/**文件上传end***/

function submitPicture() {
    //此处src为服务器的地址
    var commodityImg = document.getElementById('commodityImg').src;
    var commodityBrandImg = document.getElementById('commodityBrandImg').src;
    var commodityInnerImg = document.getElementById('commodityInnerImg').src;
    var commodityOtherImg = document.getElementById('commodityOtherImg').src;
    modifyPicture(commodityImg, 'commodityImg');
    modifyPicture(commodityBrandImg, 'commodityBrandImg');
    modifyPicture(commodityInnerImg, 'commodityInnerImg');
    modifyPicture(commodityOtherImg, 'commodityOtherImg');

    removeMap("commodityId");
    location.href = "../../html/commodity/Commodity-app.html";
}

