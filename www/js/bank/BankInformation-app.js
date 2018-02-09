//从新增页面或供应商或刷新页面过来时都需带上参数供应商ID
var complexId = getMap("complexId");
if (complexId === null) {
    complexId = getParam("id");
    setMap("complexId", complexId);
}
var keyword = getMap('keyword');

function search() {
    var temp = url.replace("-", "/app/listBankInfo");
    $.ajax({
        url: temp,
        type: "post",
        data: {
            'complexId': complexId,
            'keyword': keyword //包含型号和商品名查询
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            removeMap("keyword");
            var list = data.data.list;
            for (var i = 0; i < list.length; i++) {
                var bankCurrency = list[i].bankCurrency === -2022102001 ? "人民币" : "美元";

                var newRow = "<tr><td class='chinese-name' onclick='detail(" + list[i].id + ")'>" + list[i].bankAccountName + "</td><td class='customs-code'>" + list[i].bankAccount + "</td><td class='process-state'>" + bankCurrency + "</td>";
                $('#commodity-tbody').append(newRow);
            }
            $("#search-input").val(keyword);
        }
    });
}


// //删除此项
// function changeDeleteFlag(id) {
//     if (!confirm("确认删除")) {
//         return;
//     }
//     getContent();
//     var temp = url.replace("-", "/app/deleteSupplierBankInfo");
//     $.ajax({
//         url: temp,
//         type: "post",
//         data: {
//             'id': id
//         },
//         dataType: "jsonp", //返回JSONP格式的数据，此值固定
//         jsonp: "callback", //回调函数的名字，此值固定
//         timeout: 30000,
//         success: function (data) {
//             if (data.result === 'success') {
//                 location.href = "../../html/bank/BankInformation-app.html";
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
        location.href = "../../html/bank/BankInformation-app.html";
    }
}

function detail(id) {
    location.href = "../../html/bank/DetailBankInformation-app.html?id=" + id;
}

//模糊查询
function clickSearch() {
    getContent();
    location.href = "../../html/bank/BankInformation-app.html";
}

//回车键模糊查询
$("#search-input").keydown(function (e) {
    if (e.keyCode === 13) {
        getContent();
        location.href = "../../html/bank/BankInformation-app.html";
    }
});

function getContent() {
    var content = $("#search-input").val();
    setMap("keyword", content);
}

