var clientId = getMap('clientId');
var keyword = getMap('keyword');

var dumpUrl = "../../html/commodity/";//跳转页面

function search() {
    var temp = url.replace("-", "/app/listCommodity");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            'clientId': clientId,
            'keyword': keyword //包含型号和商品名查询
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            removeMap("keyword");
            var list = data.data.list;
            for (var i = 0; i < list.length; i++) {
                var wf = "";
                var flag = list[i].wfStatus;
                if (flag === -2022109403) {
                    wf = '审核完成';
                } else if (flag === -2022109402) {
                    wf = '审核中';
                } else if (flag === -2022109401) {
                    wf = '暂存';
                }
                var newRow = "<tr><td class='chinese-name' onclick='detail(" + list[i].id + ")'>" + list[i].commodityName + "</td><td class='customs-code'>" + list[i].commodityModel + "</td><td class='process-state'>" + wf
                    + "</td><td class='commodity-td'>" + "<i class='commodity-edit' onclick='modify(" + list[i].id + ")'></i><b class='disappear-b' onclick='changeDeleteFlag(" + list[i].id + ")'></b></td>";
                $('#commodity-tbody').append(newRow);
            }
            $("#search-input").val(keyword);
        }
    });
}

function modify(id) {
    location.href = dumpUrl + "ModifyGoods-app.html?id=" + id;
}




//删除此项
function changeDeleteFlag(id) {
    navigator.notification.confirm("确认删除", confirmCallback, "提示", ["确认","取消"]);
    function confirmCallback(buttonIndex) {
    if (buttonIndex===2) {
        return;
    }
    getContent();
    var temp = url.replace("-", "/app/deleteCommodity");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            'id': id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                location.href = dumpUrl + "Commodity-app.html";
            } else {
                alert(data.message);
            }
        },
        error: function () {
            alert("未知错误");
        }
    });
}    }


/*搜索框清空设置*/
function clearKeyword() {
    if ('' !== $(".content").val()) {
        $(".content").val('');
        location.href = dumpUrl + "Commodity-app.html";
    }
}

function detail(id) {
    location.href = dumpUrl + "DetailGoods-app.html?id=" + id;
}

//模糊查询
function clickSearch() {
    getContent();
    location.href = dumpUrl + "Commodity-app.html";
}

//回车键模糊查询
$("#search-input").keydown(function (e) {
    if (e.keyCode === 13) {
        getContent();
        location.href = dumpUrl + "Commodity-app.html";

    }
});

function getContent() {
    var content = $("#search-input").val();
    setMap("keyword", content);
}

