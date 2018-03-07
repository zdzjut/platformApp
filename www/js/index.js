var url = 'http://122.226.221.26:7088';

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        console.log(navigator.camera);
        console.log(navigator.device.capture);
        console.log(navigator.notification);
        this.receivedEvent();
    },
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};



app.initialize();


function check() {
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
        dataType: "jsonp",
        jsonp: "callback",
        timeout: 30000,
        success: function (data) {
            if (data.result === 'success') {
                jQuery(document).ready(function () {
                    setTimeout('delaySuccess()', 2000);
                });
            } else {
                jQuery(document).ready(function () {
                    setTimeout('delayFailure()', 2000);
                });

            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}

function delaySuccess() {
    location.href = "html/OrderP-app.html";
}

function delayFailure() {
    location.href = "html/Login-app.html";
}