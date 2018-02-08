function showDetail() {
    var id = getParam("id");
    var temp = url.replace("-", "/app/detailSupplier");
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
                $('#area').val(businessSupplier.remarks);
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
                    $('#isMerged').val("未办理");

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
                    $('#isMerged').val("已办理");
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
            } else {
                alert(data.message);
            }
        }
    });
}