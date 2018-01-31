var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        console.log(navigator.camera);
        console.log(navigator.device.capture);
        this.receivedEvent();
    },
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};

// var url = 'http://192.168.1.5:7087';
var url = 'http://192.168.2.120:7087';
// var url = 'http://122.226.221.26:7088';

app.initialize();

function check() {
    var now = new Date();
    var exitTime = now.getTime() + 2000;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            break;
    }
    var token = window.localStorage.getItem('token');
    if (token == null) {
        location.href = "html/Login-app.html";
    }
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
                // window.plugins.toast.showShortCenter("登录成功");
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