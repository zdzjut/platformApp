var complexId = getMap("complexId");
var temp = url.replace("-", "/app/detailSupplier");

function showDetail() {
    $.ajax({
        url: temp,
        type: "post",
        data: {
            "id": complexId
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            var businessSupplier = data.data;
            if (data.result === 'success') {
                $('#supplierName').val(businessSupplier.supplierName);
                $('#socialCreditCode').val(businessSupplier.socialCreditCode);
                $('#representative').val(businessSupplier.representative);
                $('#idCardNo').val(businessSupplier.idCardNo);
            } else {
                alert(data.message);
            }
        }
    });
}

function submitBankInfo() {
    if (!confirm("确认提交,请勿多次提交")) {
        return;
    }
    var bankAccountName = $('#bankAccountName').val();
    var bankOpenAccount = $('#bankOpenAccount').val();
    var bankAccount = $('#bankAccount').val();
    var bankCurrency = $('#bankCurrency').val();

    var isDefault = $('#isDefault').val();


    //先不判断
    var temp = url.replace("-", "/app/insertBankInfo");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            complexId: complexId,
            bankAccountName: bankAccountName,
            bankOpenAccount: bankOpenAccount,
            bankAccount: bankAccount,
            bankCurrency: bankCurrency,
            isDefault: isDefault

        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {

                location.href = "../../html/bank/BankInformation-app.html"
            } else {
                alert(data.message);
            }
        }
    });
}

