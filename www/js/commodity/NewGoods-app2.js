pictureCache('commodityImg');
pictureCache('commodityBrandImg');
pictureCache('commodityInnerImg');
pictureCache('commodityOtherImg');

//在返回上一步时保存图片
function pictureCache(id) {
    var imageURI = getMap(id);
    if (imageURI !== null) {
        alert("第二次加载时的路径" + imageURI);
        var image = document.getElementById(id);
        image.src = imageURI;
        $("#newgoods-section-" + id).css("display", "inline-block");
    }
}

//点击右上角叉号 去除图片
function removePictureShow(id) {
    var image = document.getElementById(id);
    image.removeAttribute("src");
    $("#newgoods-section-" + id).css("display", "none");

}

//去除返回上一步时保存图片的缓存
function deletePictureCache() {
    removeMap('commodityImg');
    removeMap('commodityBrandImg');
    removeMap('commodityInnerImg');
    removeMap('commodityOtherImg');
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
        alert("第一次加载时的路径" + imageURI);

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
    var tempId = getMap('tempId');
    upup(commodityImg, 'commodityImg', tempId);
    upup(commodityBrandImg, 'commodityBrandImg', tempId);
    upup(commodityInnerImg, 'commodityInnerImg', tempId);
    upup(commodityOtherImg, 'commodityOtherImg', tempId);
    $.ajax({
        url: url + "/app/insertCommodity",
        type: "post",
        data: {
            'tempId': tempId,
            'type': type
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 0,
        success: function (data) {
            if (data.result === 'success') {
                deletePictureCache();
                location.href = "../../html/commodity/Commodity-app.html";
            } else {
                alert(data.result + data.message);
            }
            removeMap("tempId");
        },
        error: function (e) {
            alert(e)
        }
    });

}


//修改页面专用
/**
 * 显示4 张图片
 */
function showModify() {
    var id = getParam("id");
    $.ajax({
        url: url + '/app/detailCommodity',
        type: "POST",
        data: {
            "id": id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var businessCommodityInfo = data.data.businessCommodityInfo;
                var commodityImg = businessCommodityInfo.commodityImg;
                var commodityBrandImg = businessCommodityInfo.commodityBrandImg;
                var commodityInnerImg = businessCommodityInfo.commodityInnerImg;
                var commodityOtherImg = businessCommodityInfo.commodityOtherImg;
                modifyShowPicture(picturePath, "commodityImg", commodityImg);
                modifyShowPicture(picturePath, "commodityBrandImg", commodityBrandImg);
                modifyShowPicture(picturePath, "commodityInnerImg", commodityInnerImg);
                modifyShowPicture(picturePath, "commodityOtherImg", commodityOtherImg);
            } else {
                alert(data.message);
            }
        }
    });
}

function modifyShowPicture(picturePath, id, imageURI) {
    if (id === null || id === undefined) {
        return;
    }
    var image = document.getElementById(id);
    image.src = url + '/app/image?imageName='+imageURI;
    $("#newgoods-section-" + id).css("display", "inline-block");
}
var srcUrl = appJP.urlReqImg +"?log_id="+row.log_id;
var imgWindow = $("#imgDetail").html("<img src="+srcUrl+">");
$("#showImg").window({title:"图片详情",width:"auto"}).window("open").window("center");