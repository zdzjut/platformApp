var consigneeId = getParam("id");

//显示详情
function showDetail() {
    //载入国家列表
    var temp = url.replace("-", "/app/listCountry");
    $.ajax({
        url: temp,
        type: "post",
        data: {},
        dataType: "jsonp",
        jsonp: "callback",
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
    sleep(500);
    temp = url.replace("-", "/app/detailConsignee");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            "id": consigneeId
        },
        dataType: "jsonp",
        jsonp: "callback",
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var businessConsignee = data.data;
                var i = businessConsignee.financingType === -2022109101 ? 0 : 1;
                $("input[type='radio'][name='financingType']:eq(" + i + ")").attr("checked", "checked");
                $('#consigneeName').val(businessConsignee.consigneeName);
                var consigneeCountry = businessConsignee.consigneeCountry;
                $("#consigneeCountry option").each(function () {
                    var txt = $(this).attr("value");
                    if (consigneeCountry.toString() === txt.toString()) {
                        $(this).attr("selected", "selected");
                        return false;
                    }
                });
                $('#consigneeCity').val(businessConsignee.consigneeCity);
                $('#consigneeAddress').val(businessConsignee.consigneeAddress);
                $('#registerNo').val(businessConsignee.registerNo);
                $('#consigneePeople').val(businessConsignee.consigneePeople);
                $('#contactPhone').val(businessConsignee.contactPhone);
                $('#consigneeEmail').val(businessConsignee.consigneeEmail);
                $('#wfStatus').val(businessConsignee.wfStatus);
                $('#remarks').val(businessConsignee.remarks);
                var consigneeImg = businessConsignee.consigneeImg;
                modifyShowPicture("consigneeImg", consigneeImg)
            } else {
                alert(data.message);
            }
        }
    });
}


//修改收货人提交
function submitConsignee(wfStatus) {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    //先上传修改后的图片，并关联到收货人
    modifyConsigneePicture(consigneeId);
    var clientId = getMap('clientId');
    var financingType = $('input:radio:checked').val();
    var consigneeName = $('#consigneeName').val();
    var consigneeCountry = $('#consigneeCountry').val();
    var consigneeCity = $('#consigneeCity').val();
    var consigneeAddress = $('#consigneeAddress').val();
    var registerNo = $('#registerNo').val();
    var consigneePeople = $('#consigneePeople').val();
    var contactPhone = $('#contactPhone').val();
    var consigneeEmail = $('#consigneeEmail').val();
    var remarks = $('#remarks').val();
    //先不判断
    var temp = url.replace("-", "/app/modifyConsignee");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            id:consigneeId,
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
            wfStatus: wfStatus,
            remarks: remarks
        },
        dataType: "jsonp",
        jsonp: "callback",
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

function show() {
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
    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }

    hideDg();
}


/**文件上传start***/
function modifyConsigneePicture(consigneeId) {
    var pictureUrl = document.getElementById('consigneeImg').src;
    //若为网络地址，返回
    var str = pictureUrl.split(":")[0];
    if (str === "http" || pictureUrl === null || pictureUrl === '') {
        return;
    }
    var temp = url.replace("-", '/app/modifyConsigneePicture');
    var serverUri = encodeURI(temp + '&consigneeId=' + consigneeId);

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
