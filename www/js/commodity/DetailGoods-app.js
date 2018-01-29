function showDetail() {
    var id = getParam("id");
    $.ajax({
        url: url + '/app/detailCommodity',
        type: "POST",
        data: {
            "id": id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var businessCommodityInfo = data.data.businessCommodityInfo;
                $('#commodityName').val(businessCommodityInfo.commodityName);
                $('#hscode').val(businessCommodityInfo.hscode);
                $('#commodityMaterial').val(businessCommodityInfo.commodityMaterial);
                $('#commodityModel').val(businessCommodityInfo.commodityModel);
                $('#commodityBrand').val(businessCommodityInfo.commodityBrand);
                $('#commodityEnglishName').val(businessCommodityInfo.commodityEnglishName);
                $('#commodityRecedeTariff').val(businessCommodityInfo.commodityRecedeTariff);
                $('#commodityAppreciationTariff').val(businessCommodityInfo.commodityAppreciationTariff);
                $('#application').val(businessCommodityInfo.application);
                $('#name').val(data.data.name);
                $('#phone').val(data.data.phone);
                $('#declarationItems').val(businessCommodityInfo.declarationItems);
                $('#remarks').val(businessCommodityInfo.remarks);
                var commodityImg = businessCommodityInfo.commodityImg;
                var commodityBrandImg = businessCommodityInfo.commodityBrandImg;
                var commodityInnerImg = businessCommodityInfo.commodityInnerImg;
                var commodityOtherImg = businessCommodityInfo.commodityOtherImg;
                modifyShowPicture("commodityImg", commodityImg);
                modifyShowPicture("commodityBrandImg", commodityBrandImg);
                modifyShowPicture("commodityInnerImg", commodityInnerImg);
                modifyShowPicture("commodityOtherImg", commodityOtherImg);
            } else {
                alert(data.message);
            }
        }
    });
}