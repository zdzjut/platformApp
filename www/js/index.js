var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.receivedEvent();
    },
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var url = 'http://192.168.1.5:7087';

app.initialize();

function check() {
    var token = window.localStorage.getItem('token');
    alert(token);
    if (token == null) {
        location.href = "html/Login-app.html";
    }
    alert(url + '/app/check');
    $.ajax({
        url: url + '/app/check',
        type: "POST",
        data: {
            "token": token
        },
        dataType: "jsonp", //返回JSONP格式的数据，此值固定
        jsonp: "callback", //回调函数的名字，此值固定
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                alert('登录成功');
                location.href = "html/OrderP-app.html";
            } else {
                alert('前往登录');
                location.href = "html/Login-app.html";
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}