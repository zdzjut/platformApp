// var url = 'http://192.168.1.5:7087';
document.write('<script language="JavaScript" src="common.js"></script>');

var clientId = window.localStorage.getItem('clientId');
var keyword = window.localStorage.getItem('keyword');

function search() {
    $.ajax({
        url: url + "/app/listCommodity",
        type: "post",
        data: {
            'clientId': clientId,
            'keyword': keyword //包含型号和商品名查询
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            window.localStorage.removeItem("keyword");
            var myjson = data.data.list;
            for (var i = 0; i < myjson.length; i++) {
                var wf = "";
                var flag = myjson[i].wfStatus;
                if (flag === -2022109403) {
                    wf = '审核完成';
                    // $(".disappear-b").css("display", "none");
                } else if (flag === -2022109402) {
                    wf = '审核中';
                } else if (flag === -2022109401) {
                    wf = '暂存';
                }
                var newRow = "<tr><td class='chinese-name'>" + myjson[i].commodityName + "</td><td class='customs-code'>" + myjson[i].commodityModel + "</td><td class='process-state'>" + wf
                    + "</td><td class='commodity-td'>" + "<i class='commodity-edit'></i><b class='disappear-b' onclick='changeDeleteFlag(" + myjson[i].id + ")'></b></td>";
                $('#commodity-tbody').append(newRow);
            }
           $("#search-input").val(keyword);
        },
        error: function () {
            showMessage("未知错误");
        }
    });
}
//删除此项
function changeDeleteFlag(id) {
    getContent();
    $.ajax({
        url: url + "/app/deleteCommodity",
        type: "post",
        data: {
            'id': id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                location.href = "../html/Commodity-app.html";
            } else {
                alert(data.message);
            }
        },
        error: function () {
            showMessage("未知错误");
        }
    });
}

/*搜索框清空设置*/
$("#clear-b").click(function () {
    $(".content").val('');
});
// 添加列表详情页
$(".chinese-name").click(function () {
    location.href = 'https://www.baidu.com/';
});
//模糊查询
$("#search-i").click(function () {
    getContent();
    location.href = "../html/Commodity-app.html";
});
$("#search-input").keydown(function (e) {
    if (e.keyCode === 13) {
        getContent();
        location.href = "../html/Commodity-app.html";
    }
});
function getContent() {
    var content = $("#search-input").val();
    window.localStorage.setItem("keyword", content);
}

