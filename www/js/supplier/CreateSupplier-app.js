//载入省份列表
$.ajax({
    url: url + "/app/listProvince",
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

function listCity(id) {
    $('#city').empty();
    $('#city').append("<option value='p'> </option>");
    $.ajax({
        url: url + "/app/listCity",
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
    $('#area').append("<option value='p'> </option>");
    $.ajax({
        url: url + "/app/listArea",
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

function sendD(id) {
    setMap("area", id);
}


function changeType(cho) {
    if (cho === "0") {
        $(".yes").css("display", "none");
        $(".no").css("display", "inline-block");
    } else {
        alert("选择了是");
        $(".no").css("display", "none");
        $(".yes").css("display", "inline-block");
    }
}


function submitSupplier(wfStatus) {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    var clientId = getMap('clientId');
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

    var five = $('#five').val();
    alert(five);
    var businessLicenseCode = null;
    var taxRegistrationCode = null;
    var taxCode = null;
    var socialCreditCode = null;
    var taxRegistrationImage = null;
    var businessLicenseIamge = null;
    var organizationImage = null;
    var socialCreditImage = null;

    if (five === "0") {
        businessLicenseCode = $('#businessLicenseCode').val();
        taxRegistrationCode = $('#taxRegistrationCode').val();
        taxCode = $('#taxCode').val();
        taxRegistrationImage = getMap("taxRegistrationImage");
        businessLicenseIamge = getMap("businessLicenseIamge");
        organizationImage = getMap("organizationImage");
    } else {
        socialCreditCode = $('#socialCreditCode').val();
        socialCreditImage = getMap("socialCreditImage");
    }
    //暂时延迟两秒 防止图片未上传成功，没返回图片ID
    jQuery(document).ready(function () {
        setTimeout('delayFailure()', 2000);
    });
    //先不判断
    $.ajax({
        url: url + "/app/insertSupplier",
        type: "post",
        data: {
            wfStatus: wfStatus,
            clientId: clientId,
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
            five: five,
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
    var serverUri = encodeURI(url + '/app/supplierFile');

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


var riskUrl = "http://data.riskstorm.com/v1/company/";
var apikey = "TAtqcD9NnFLB";

function riskReport() {
    var keyword = $("#supplierName").val();
    $.ajax({
        url: riskUrl + 'search',
        type: "GET",
        data: {
            'apikey': apikey,
            'keyword': keyword
        },
        dataType: "json", //返回JSONP格式的数据，此值固定
        timeout: 30000,
        success: function (data) {
            var list = data.hits;
            if (list.length === 0) {
            } else if (list.length === 1) {
                sub(list[i].统一社会信用代码);
            } else {
                $(".newsupplier-select").css("display", "block");
                for (var i = 0; i < list.length; i++) {
                    var name = list[i].名称;
                    var code = list[i].统一社会信用代码;
                    var newRow = "<option value='" + code + "'>" + name + "</option>";
                    $('#company').append(newRow);
                }
            }

        },
        error: function () {
            alert("请求失败");
        }
    });
}

//公司详情 http://data.riskstorm.com/v1/company/913502001550054395
function sub(code) {
    $.ajax({
        url: riskUrl + code,
        type: "GET",
        data: {
            'apikey': apikey
        },
        dataType: "json", //返回JSONP格式的数据，此值固定
        timeout: 30000,
        success: function (data) {
            $(".newsupplier-select").css("display", "none");
            $('#supplierFullAddress').val(data.地址);
            var date = data.成立日期;
            date.replace("-", "/");
            $('#supplierFoundDate').val(date);
            $('#representative').val(data.法定代表人);
            $('#supplierName').val(data.名称);
            $('#registerCapital').val(data.注册资本);
            $('#socialCreditCodeDl').val(data.统一社会信用代码);
            // alert(data.地址);
            // alert(data.成立日期);
            // alert(data.核准日期);
            // alert(data.法定代表人);
            // alert(data.注册号);
            // alert(data.注册资本);
            // alert(data.登记机关);
            // alert(data.登记状态);
            // alert(data.省市);
            // alert(data.类型);
            // alert(data.经营期限自);
            // alert(data.经营期限至);
            // alert(data.经营范围);
            // alert(data.统一社会信用代码);
        },
        error: function () {
            alert("请求失败");
        }
    });
}

