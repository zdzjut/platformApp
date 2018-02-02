var clientId = getMap('clientId');
var keyword = getMap('keyword');

function search() {
    $.ajax({
        url: url + "/app/listSupplier",
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
                var newRow = "<tr><td class='chinese-name' onclick='detail(" + list[i].id + ")'>" + list[i].supplierName + "</td><td class='customs-code'>" + list[i].representative + "</td><td class='process-state'>" + wf
                    + "</td><td class='commodity-td'>" + "<i class='commodity-edit' onclick='modify(" + list[i].id + ")'></i><b class='disappear-b' onclick='changeDeleteFlag(" + list[i].id + ")'></b></td>";
                $('#commodity-tbody').append(newRow);
            }
            $("#search-input").val(keyword);
        }
    });
}
//
// function modify(id) {
//     location.href = "../../html/commodity/ModifyGoods-app.html?id=" + id;
// }
//
// //删除此项
// function changeDeleteFlag(id) {
//     if (!confirm("确认删除")) {
//         return;
//     }
//     getContent();
//     $.ajax({
//         url: url + "/app/deleteCommodity",
//         type: "post",
//         data: {
//             'id': id
//         },
//         dataType: "jsonp", //返回JSONP格式的数据，此值固定
//         jsonp: "callback", //回调函数的名字，此值固定
//         timeout: 30000,
//         success: function (data) {
//             if (data.result === 'success') {
//                 location.href = "../../html/commodity/Commodity-app.html";
//             } else {
//                 alert(data.message);
//             }
//         },
//         error: function () {
//             alert("未知错误");
//         }
//     });
// }

/*搜索框清空设置*/
function clearKeyword() {
    if ('' !== $(".content").val()) {
        $(".content").val('');
        location.href = "../../html/supplier/Supplier-app.html";
    }
}

function detail(id) {
    location.href = "../../html/commodity/DetailGoods-app.html?id=" + id;
}

//模糊查询
function clickSearch() {
    getContent();
    location.href = "../../html/supplier/Supplier-app.html";
}

//回车键模糊查询
$("#search-input").keydown(function (e) {
    if (e.keyCode === 13) {
        getContent();
        location.href = "../../html/supplier/Supplier-app.html";
    }
});

function getContent() {
    var content = $("#search-input").val();
    setMap("keyword", content);
}

