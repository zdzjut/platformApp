// var url = 'http://192.168.1.5:7087';
function login() {
    window.localStorage.clear();
    var username = $('#username').val();
    var password = $("#password").val();
    var req_data = {
        "username": username,
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