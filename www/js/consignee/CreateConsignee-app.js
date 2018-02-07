//载入国家列表
$.ajax({
    url: url + "/app/listCountry",
    type: "post",
    data: {},
    dataType: "jsonp", //返回JSONP格式的数据，此值固定
    jsonp: "callback", //回调函数的名字，此值固定
    timeout: 30000,
    success: function (data) {
        if (data.result === 'success') {
            var list = data.data;
            for (var i = 0; i < list.length; i++) {
                var name = list[i].name;
                var id = list[i].id;
                var newRow = "<option value='" + id + "'>" + name + "</option>";
                $('#consigneeCountry').append(newRow);
            }
        } else {
            alert(data.message);
        }
    }
});

function submitConsignee(type) {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    var consigneeImg = getMap("consigneeImg");
    removeMap("consigneeImg");
    var clientId = getMap('clientId');
    var financingType = $('input:radio:checked').val();
    var consigneeName = $('#consigneeName').val();
    var consigneeCountry = $('#consigneeCountry').val();
    alert(consigneeCountry);
    var consigneeCity = $('#consigneeCity').val();
    var consigneeAddress = $('#consigneeAddress').val();
    var registerNo = $('#registerNo').val();
    var consigneePeople = $('#consigneePeople').val();
    var contactPhone = $('#contactPhone').val();
    var consigneeEmail = $('#consigneeEmail').val();
    var remarks = $('#remarks').val();
    //先不判断
    $.ajax({
        url: url + "/app/insertConsignee",
        type: "post",
        data: {
            clientId: clientId,
            financingType: financingType,
            consigneeName: consigneeName,
            consigneeCountry: consigneeCountry,
            consigneeCity: consigneeCity,
            consigneeAddress: consigneeAddress,
            registerNo: registerNo,
            consigneePeople: consigneePeople,
            contactPhone: contactPhone,
            consigneeEmail: consigneeEmail,
            consigneeImg: consigneeImg,
            wfStatus: type,
            remarks: remarks
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                location.href = "../../html/consignee/Consignee-app.html"
            } else {
                alert(data.message);
            }
        }
    });
}


//点击右上角叉号 去除图片
function removePictureShow(id) {
    var image = document.getElementById(id);
    image.removeAttribute("src");
    $("#newgoods-section-" + id).css("display", "none");

}


function show(id) {
    setMap('nowId', id);
    showDg();
}

function dialog() {
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
        var image = document.getElementById('consigneeImg');
        image.src = imageURI;
        $("#newgoods-section-consigneeImg").css("display", "inline-block");
        upup();

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
        var image = document.getElementById('consigneeImg');
        image.src = imageURI;
        $("#newgoods-section-consigneeImg").css("display", "inline-block");
        upup();
    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }
    hideDg();
}

/**文件上传start***/
function upup() {
    var image = document.getElementById('consigneeImg');
    var pictureUrl = image.src;
    if (pictureUrl === null || pictureUrl === undefined || pictureUrl === '') {
        return;
    }
    //上传过一次的话 变成修改
    var consigneeImg = getMap("consigneeImg");
    var uurrll = consigneeImg === null ? url + '/app/consigneeFile' : url + '/app/consigneeFile?consigneeImg=' + consigneeImg;
    var serverUri = encodeURI(uurrll);

    function fileTransferSuccess(data) {
        var result = data.response;
        result = JSON.parse(result);
        if (result.result === 'success') {
            setMap("consigneeImg", result.data);
        }

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

