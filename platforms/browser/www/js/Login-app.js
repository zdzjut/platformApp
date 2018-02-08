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
                setMap('token', data.message);
                setMap('clientId', data.data.id);
                location.href = "../html/OrderP-app.html";
            } else {
                alert(data.result);
            }
        },
        error: function () {
            alert("请求超时，网络出现异常");
        }
    });
}
function logout() {
    if (confirm("是否退出该账户")) {
        return;
    }
    window.localStorage.clear();
    location.href = "../html/Login-app.html";
}