var complexId = getMap("complexId");
var temp = url.replace("-", "/app/detailBankInfo");

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
            var businessClientBankAccount = data.data.businessClientBankAccount;
            var businessSupplier = data.data.businessSupplier;
            if (data.result === 'success') {
                $('#supplierName').val(businessSupplier.supplierName);
                $('#socialCreditCode').val(businessSupplier.socialCreditCode);
                $('#representative').val(businessSupplier.representative);
                $('#idCardNo').val(businessSupplier.idCardNo);
                $('#bankAccountName').val(businessClientBankAccount.bankAccountName);
                $('#bankOpenAccount').val(businessClientBankAccount.bankOpenAccount);
                $('#bankAccount').val(businessClientBankAccount.bankAccount);
                $('#bankCurrency').val(businessClientBankAccount.bankCurrency);
                $('#isDefault').val(businessClientBankAccount.isDefault);

            } else {
                alert(data.message);
            }
        }
    });
}