function showDetail() {
    var id = getParam("id");
    var temp = url.replace("-", "/app/detailConsignee");
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
                var businessConsignee = data.data;
                $('#financingType').val(businessConsignee.financingType === -2022109101 ? '贷款融资(含税款融资)' : '税款融资');
                $('#consigneeName').val(businessConsignee.consigneeName);
                $('#consigneeCountry').val(businessConsignee.subGmUsdBankAccount);
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