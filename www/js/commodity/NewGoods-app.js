function next() {
    var tempId = getMap('tempId');
    if (tempId!==null){
        //防止重复保存数据
        location.href = "../../html/commodity/NewGoods-app2.html"
    }
    var clientId = getMap('clientId');
    var commodityName = $('#commodityName').val();
    var hscode = $('#hscode').val();
    var commodityMaterial = $('#commodityMaterial').val();
    var commodityModel = $('#commodityModel').val();
    var commodityBrand = $('#commodityBrand').val();
    var commodityEnglishName = $('#commodityEnglishName').val();
    var commodityRecedeTariff = $('#commodityRecedeTariff').val();
    var commodityAppreciationTariff = $('#commodityAppreciationTariff').val();
    var application = $('#application').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    var declarationItems = $('#declarationItems').val();
    var remarks = $('#remarks').val();
    //先不判断
    $.ajax({
        url: url + "/app/saveCommodity",
        type: "post",
        data: {
            clientId: clientId,
            commodityName: commodityName,
            hscode: hscode,
            commodityMaterial: commodityMaterial,
            commodityModel: commodityModel,
            commodityBrand: commodityBrand,
            commodityEnglishName: commodityEnglishName,
            commodityRecedeTariff: commodityRecedeTariff,
            commodityAppreciationTariff: commodityAppreciationTariff,
            application: application,
            name: name,
            phone: phone,
            declarationItems: declarationItems,
            remarks: remarks
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                setMap('tempId', data.data);
                location.href = "../../html/commodity/NewGoods-app2.html"
            } else {
                alert(data.message);
            }
        }
    });
}

