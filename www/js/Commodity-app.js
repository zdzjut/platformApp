$.ajax({
    url: "http://192.168.2.120:7087/app/listCommodity?clientId=255",
    type: "post",
    data: {},
    dataType: "jsonp", //返回JSONP格式的数据，此值固定
    jsonp: "callback", //回调函数的名字，此值固定
    timeout: 30000,
    success: function (data) {
        var myjson = data.data.list;
        /*console.log(myjson);*/
        var rowCount = 1;
        for (var i = 0; i < myjson.length; i++) {
            var wf = " ";
            if (myjson[i].wfStatus === -2022109403) {
                wf = '审核完成';
                $(".disappear-b").css("display", "none");
            } else if (myjson[i].wfStatus === -20221009402) {
                wf = '审核中';
            } else if (myjson[i].wfStatus === -20221009401) {
                wf = '暂存';
            }
            var newRow = "<tr><td class='chinese-name'>" + myjson[i].commodityName + "</td><td class='customs-code'>"
                + myjson[i].commodityModel + "</td><td class='process-state'>" + wf
                + "</td><td class='commodity-td'>" + "<i class='commodity-edit'></i><b class='disappear-b'></b><span class='commodity-id'>" + myjson[i].id + "</span></td>";
            $('#commodity-tbody').append(newRow);
        }
    },
    error: function () {
        showMessage("未知错误");
    }
});

/*搜索框清空设置*/
$("#clear-b").click(function () {
    $(".content").val('');
});
// 添加列表详情页
$(".chinese-name").click(function () {
    location.href = 'https://www.baidu.com/';
});