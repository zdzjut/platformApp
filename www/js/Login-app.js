// var url = 'http://192.168.1.5:7087';
// var url = 'http://192.168.2.120:7087';
var url = 'http://122.226.221.26:7088';

function login() {
    window.localStorage.clear();
    var account = $('#account').val();
    var password = $('#password').val();
    var req_data = {
        "account": account,
        "password": password
    };
    $.ajax({
        url: url+'/app/login',
        type: "POST",
        data: req_data,
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                alert( data.message+"id="+data.data.id);
                window.localStorage.setItem('token', data.message);
                window.localStorage.setItem('clientId', data.data.id);
                location.href = "OrderP-app.html";
            } else {
                alert(data.result);
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}