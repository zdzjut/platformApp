//载入省份列表
$.ajax({
    url: url + "/app/listProvince",
    type: "post",
    data: {},
    dataType: "jsonp", //返回JSONP格式的数据，此值固定
    jsonp: "callback", //回调函数的名字，此值固定
    timeout: 30000,
    success: function (data) {
        if (data.result === 'success') {
            var list = data.data;
            for (var i = 0; i < list.length; i++) {
                var name = list[i].name;
                var id = list[i].id;
                var newRow = "<option onclick='listCity(" + id + ")' >" + name + "</option>";
                $('#province').append(newRow);
            }
        } else {
            alert(data.message);
        }
    }
});

function listCity(id) {
    $('#city').empty();
    $.ajax({
        url: url + "/app/listCity",
        type: "post",
        data: {
            "id": id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var name = list[i].name;
                    var id = list[i].id;
                    var newRow = "<option onclick='listArea(" + id + ")'>" + name + "</option>";
                    $('#city').append(newRow);
                }
            } else {
                alert(data.message);
            }
        }
    });
}

function listArea(id) {
    $('#area').empty();
    $.ajax({
        url: url + "/app/listArea",
        type: "post",
        data: {
            "id": id
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    var name = list[i].name;
                    var id = list[i].id;
                    var newRow = "<option value='" + id + "'>" + name + "</option>";
                    $('#area').append(newRow);
                }
            } else {
                alert(data.message);
            }
        }
    });
}

function sendD(id) {
    alert(id);
}

// var riskUrl = "http://data.riskstorm.com/v1/company/";
// var apikey = "TAtqcD9NnFLB";
//
// function gogo() {
//     var keyword = $("#test").val();
//     $.ajax({
//         url: riskUrl + 'search',
//         type: "GET",
//         data: {
//             'apikey': apikey,
//             'keyword': keyword
//         },
//         dataType: "json", //返回JSONP格式的数据，此值固定
//         timeout: 30000,
//         success: function (data) {
//             var list = data.hits;
//             for (var i = 0; i < list.length; i++) {
//                 var name = list[i].名称;
//                 var code = list[i].统一社会信用代码;
//                 var fu = "sub('" + code + "')";
//                 var newRow = "<option onclick=" + fu + ">" + name + "</option>";
//                 // var newRow = '<option onclick="sub(' + code + ')">' + name + '</option>';
//                 $('#testSelect').append(newRow);
//             }
//         },
//         error: function () {
//             alert("请求失败");
//         }
//     });
// }
//
// //公司详情 http://data.riskstorm.com/v1/company/913502001550054395
// function sub(code) {
//     $.ajax({
//         url: riskUrl + code,
//         type: "GET",
//         data: {
//             'apikey': apikey
//         },
//         dataType: "json", //返回JSONP格式的数据，此值固定
//         timeout: 30000,
//         success: function (data) {
//             $('#text1').val(data.地址);
//             $('#text2').val(data.成立日期);
//             $('#text3').val(data.核准日期);
//             $('#text4').val(data.法定代表人);
//             $('#text5').val(data.注册号);
//             $('#text6').val(data.注册资本);
//             $('#text7').val(data.登记机关);
//             $('#text8').val(data.经营期限自);
//             $('#text9').val(data.经营期限至);
//             // alert(data.地址);
//             // alert(data.成立日期);
//             // alert(data.核准日期);
//             // alert(data.法定代表人);
//             // alert(data.注册号);
//             // alert(data.注册资本);
//             // alert(data.登记机关);
//             // alert(data.登记状态);
//             // alert(data.省市);
//             // alert(data.类型);
//             // alert(data.经营期限自);
//             // alert(data.经营期限至);
//             // alert(data.经营范围);
//             // alert(data.统一社会信用代码);
//         },
//         error: function () {
//             alert("请求失败");
//         }
//     });
// }
