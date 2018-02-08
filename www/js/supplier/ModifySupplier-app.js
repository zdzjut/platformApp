//显示详情
function showDetail() {
    //如果载入省份列表
    var temp = url.replace("-", "/app/listProvince");
    $.ajax({
        url: temp,
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
                    $('#province').append(newRow);
                }
            } else {
                alert(data.message);
            }
        }
    });
    var id = getParam("id");
    temp = url.replace("-", "/app/detailSupplier");
    $.ajax({
        url: temp,
        type: "POST",
        data: {
            "id": id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var businessSupplier = data.data;
                var isMerged = businessSupplier.isMerged;
                var province = businessSupplier.supplierProvince;
                var city = businessSupplier.supplierCity;
                var area = businessSupplier.supplierCounty;
                listCity(province);
                listArea(city);
                $("#province option").each(function () {
                    var txt = $(this).attr("value");
                    if (province.toString() === txt.toString()) {
                        $(this).attr("selected", "selected");
                    }
                });
                $("#city option").each(function () {
                    var txt1 = $(this).attr("value");
                    if (city.toString() === txt1.toString()) {
                        $(this).attr("selected", "selected");
                    }
                });
                $("#area option").each(function () {
                    var txt2 = $(this).attr("value");
                    if (area.toString() === txt2.toString()) {
                        $(this).attr("selected", "selected");
                    }
                });
                $('#supplierName').val(businessSupplier.supplierName);
                $('#contactPeople').val(businessSupplier.contactPeople);
                $('#idCardNo').val(businessSupplier.idCardNo);
                $('#contactPhone').val(businessSupplier.contactPhone);
                $('#supplierEmail').val(businessSupplier.supplierEmail);
                $('#supplierFoundDate').val(businessSupplier.supplierFoundDate);
                $('#supplierFullAddress').val(businessSupplier.supplierFullAddress);
                $('#registerCapital').val(businessSupplier.registerCapital);
                $('#representative').val(businessSupplier.representative);
                if (isMerged === "0") {
                    $(".yes").css("display", "none");
                    $(".no").css("display", "inline-block");
                    $('#isMerged').options[1].attr("selected", "selected");

                    $('#businessLicenseCode').val(businessSupplier.businessLicenseCode);
                    $('#taxRegistrationCode').val(businessSupplier.taxRegistrationCode);
                    $('#taxCode').val(businessSupplier.taxCode);
                    var businessLicenseIamge = businessSupplier.businessLicenseIamge;
                    var taxRegistrationImage = businessSupplier.taxRegistrationImage;
                    var organizationImage = businessSupplier.organizationImage;

                    modifyShowPicture("businessLicenseIamge", businessLicenseIamge);
                    modifyShowPicture("taxRegistrationImage", taxRegistrationImage);
                    modifyShowPicture("organizationImage", organizationImage);
                } else {
                    $(".no").css("display", "none");
                    $(".yes").css("display", "inline-block");
                    $('#isMerged').options[0].attr("selected", "selected");

                    $('#socialCreditCode').val(businessSupplier.socialCreditCode);
                    var socialCreditImage = businessSupplier.socialCreditImage;
                    modifyShowPicture("socialCreditImage", socialCreditImage);
                }
                var idCardAImage = businessSupplier.idCardAImage;
                var idCardBImage = businessSupplier.idCardBImage;
                var generalTaxpayerImage = businessSupplier.generalTaxpayerImage;
                var taxInvoiceImage = businessSupplier.taxInvoiceImage;
                modifyShowPicture("idCardAImage", idCardAImage);
                modifyShowPicture("idCardBImage", idCardBImage);
                modifyShowPicture("generalTaxpayerImage", generalTaxpayerImage);
                modifyShowPicture("taxInvoiceImage", taxInvoiceImage);
            }
            else {
                alert(data.message);
            }
        }
    });
}

// function defaultChoose(selectId, id) {
//     $("#" + id + " option").each(function () {
//         var txt = $(this).attr("value");
//         if (id.toString() === txt.toString()) {
//             $(this).attr("selected", "selected");
//         }
//     });
// }

function listCity(id) {
    $('#city').empty();
    $('#city').append("<option value='p'> </option>");
    var temp = url.replace("-", "/app/listCity");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            "id": id
        },
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
                    $('#city').append(newRow);
                }
            } else {
                alert(data.message);
            }
        }
    });

}

function listArea(id) {
    $('#area').empty();
    $('#area').append("<option value= 'p'> </option>");
    var temp = url.replace("-", "/app/listArea");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            "id": id
        },
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
                    $('#area').append(newRow);
                }
            } else {
                alert(data.message);
            }
        }
    });
}


//修改收货人提交
function submitSupplier(wfStatus) {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    var consigneeId = getMap("consigneeId");
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

//nowId现在在传哪张
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
        var id = getMap('nowId');
        var image = document.getElementById(id);
        image.src = imageURI;
        $("#newgoods-section-consigneeImg").css("display", "inline-block");
        upup(imageURI, id);


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
        var image = document.getElementById(id);
        image.src = imageURI;
        $("#newgoods-section-consigneeImg").css("display", "inline-block");
        upup(imageURI, id);
    }

//获取文件失败
    function takePictureFail(message) {
        alert('获取拍照文件失败:' + message);
    }

    hideDg();
}

/**
 * 文件上传start id是此时选中的图片ID 也是类型
 **/

function upup(pictureUrl, id) {
    if (pictureUrl === null || pictureUrl === undefined || pictureUrl === '') {
        return;
    }
    var temp = url.replace("-", '/app/supplierFile');
    var serverUri = encodeURI(temp);

    function fileTransferSuccess(data) {
        var result = data.response;
        result = JSON.parse(result);
        if (result.result === 'success') {
            setMap(id, result.data);
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