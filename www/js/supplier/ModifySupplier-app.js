var id = getParam("id");

//显示详情,写成函数老报错   直接写三次
function showDetail() {
    $('#province').empty();
    $('#city').empty();
    $('#area').empty();
    //一次载入省市区列表
    var temp = url.replace("-", "/app/listAllArea");

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
                var map = data.data;
                var provinces = map.provinces;
                var cities = map.cities;
                var counties = map.counties;
                for (var i = 0; i < provinces.length; i++) {
                    var name = provinces[i].name;
                    var id = provinces[i].id;
                    var newRow = "<option value='" + id + "'>" + name + "</option>";
                    $('#province').append(newRow);
                }
                for (var i1 = 0; i1 < cities.length; i1++) {
                    var name1 = cities[i1].name;
                    var id1 = cities[i1].id;
                    var newRow1 = "<option value='" + id1 + "'>" + name1 + "</option>";
                    $('#city').append(newRow1);
                }
                for (var i2 = 0; i2 < counties.length; i2++) {
                    var name2 = counties[i2].name;
                    var id2 = counties[i2].id;
                    var newRow2 = "<option value='" + id2 + "'>" + name2 + "</option>";
                    $('#area').append(newRow2);
                }
            } else {
                alert(data.message);
            }
        }
    });
    sleep(1000);
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
                $("#province option").each(function () {
                    var txt = $(this).attr("value");
                    if (province.toString() === txt.toString()) {
                        $(this).attr("selected", "selected");
                        return false;
                    }
                });
                $("#city option").each(function () {
                    var txt1 = $(this).attr("value");
                    if (city.toString() === txt1.toString()) {
                        $(this).attr("selected", "selected");
                        return false;

                    }
                });
                $("#area option").each(function () {
                    var txt2 = $(this).attr("value");
                    if (area.toString() === txt2.toString()) {
                        $(this).attr("selected", "selected");
                        return false;
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
                if (isMerged === -2022104802) {
                    $(".yes").css("display", "none");
                    $(".no").css("display", "inline-block");
                    document.getElementById("isMerged")[1].selected = true;
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
                    document.getElementById("isMerged")[0].selected = true;

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

function changeType(cho) {
    if (cho === "0") {
        $(".yes").css("display", "none");
        $(".no").css("display", "inline-block");
    } else {
        $(".no").css("display", "none");
        $(".yes").css("display", "inline-block");
    }
}

function submitSupplier(wfStatus) {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    var supplierName = $('#supplierName').val();
    var contactPeople = $('#contactPeople').val();
    var contactPhone = $('#contactPhone').val();
    var supplierEmail = $('#supplierEmail').val();
    var supplierFoundDate = $('#supplierFoundDate').val();
    var area = getMap("area");

    var supplierFullAddress = $('#supplierFullAddress').val();
    var registerCapital = $('#registerCapital').val();
    var representative = $('#representative').val();
    var idCardNo = $('#idCardNo').val();
    var idCardAImage = getMap("idCardAImage");
    var idCardBImage = getMap("idCardBImage");
    var generalTaxpayerImage = getMap("generalTaxpayerImage");
    var taxInvoiceImage = getMap("taxInvoiceImage");
    var isMerged = $('#isMerged').val();
    var businessLicenseCode = null;
    var taxRegistrationCode = null;
    var taxCode = null;
    var socialCreditCode = null;
    var taxRegistrationImage = null;
    var businessLicenseIamge = null;
    var organizationImage = null;
    var socialCreditImage = null;

    if (isMerged === "-2022104802") {
        businessLicenseCode = $('#businessLicenseCode').val();
        taxRegistrationCode = $('#taxRegistrationCode').val();
        taxCode = $('#taxCode').val();
        taxRegistrationImage = getMapAndRemove("taxRegistrationImage");
        businessLicenseIamge = getMapAndRemove("businessLicenseIamge");
        organizationImage = getMapAndRemove("organizationImage");
    } else {
        socialCreditCode = $('#socialCreditCode').val();
        socialCreditImage = getMapAndRemove("socialCreditImage");
    }
    //先不判断
    var temp = url.replace("-", "/app/modifySupplier");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            id: id,
            wfStatus: wfStatus,
            supplierName: supplierName,
            contactPeople: contactPeople,
            supplierEmail: supplierEmail,
            supplierFoundDate: supplierFoundDate,
            supplierCounty: area,
            supplierFullAddress: supplierFullAddress,
            registerCapital: registerCapital,
            representative: representative,
            idCardNo: idCardNo,
            contactPhone: contactPhone,
            isMerged: isMerged,
            businessLicenseCode: businessLicenseCode,
            taxRegistrationCode: taxRegistrationCode,
            taxCode: taxCode,
            socialCreditCode: socialCreditCode,

            idCardAImage: idCardAImage,
            idCardBImage: idCardBImage,
            generalTaxpayerImage: generalTaxpayerImage,
            taxInvoiceImage: taxInvoiceImage,
            taxRegistrationImage: taxRegistrationImage,
            businessLicenseIamge: businessLicenseIamge,
            organizationImage: organizationImage,
            socialCreditImage: socialCreditImage
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                location.href = "../../html/supplier/Supplier-app.html"
            } else {
                alert(data.message);
            }
        }
    });
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

function upup(pictureUrl, type) {
    if (pictureUrl === null || pictureUrl === undefined || pictureUrl === '') {
        return;
    }
    var temp = url.replace("-", '/app/modifySupplierPicture');
    var serverUri = encodeURI(temp + "&supplierId=" + id + "&type=" + type);

    function fileTransferSuccess(data) {
        var result = data.response;
        result = JSON.parse(result);
        //修改成功返回新增的图片名或者修改的图片名，type对应的图片发生了更改
        if (result.result === 'success') {
            if (result.message === 'create') {
                //新增才需要修改数据库字段
                setMap(type, result.data);
            }

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