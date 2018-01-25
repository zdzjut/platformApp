/**
 * 修改页面下一步的设计是，修改了任何参数，点击下一步均保存
 * 若无任何字段发生变动，直接进入下一个页面
 */
function next() {
    var id = getParam("id");
    var flag = true;
    //解决了 防止重复保存数据,如果发生修改又要重新提交
    $(":text").change(function () {
        alert("word was change!!!");
        flag = false;
    });
    $("#declarationItems").change(function () {
        flag = false;
    });
    $("#remarks").change(function () {
        flag = false;
    });
    if (flag) {
        location.href = "../../html/commodity/ModifyGoods-app2.html?id="+id;
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
        url: url + "/app/modifyCommodity",
        type: "post",
        data: {
            'id':id,
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
                location.href = "../../html/commodity/ModifyGoods-app2.html?id="+id;
            } else {
                alert(data.message);
            }
        }
    });
}

