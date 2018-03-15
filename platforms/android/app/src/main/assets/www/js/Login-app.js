function login() {
    window.localStorage.clear();
    // var uu = 'http://192.168.1.5:7087';
    var uu = 'http://122.226.221.26:7088';
    var account = $('#account').val();
    var password = $('#password').val();
    var req_data = {
        "account": account,
        "password": password
    };
    $.ajax({
        url: uu + '/app/login',
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
    if (!confirm("是否退出该账户")) {
        return;
    }
    window.localStorage.clear();
    location.href = "../html/Login-app.html";
}

function test() {
    dialogConfirm();
}


// 提示框
function warn() {
    var message = "I am Alert Dialog!";
    var title = "ALERT";
    var buttonName = "Alert Button";

    navigator.notification.alert(message, alertCallback, title, buttonName);

    function alertCallback() {
        console.log("Alert is Dismissed!");
    }
}

//当按下 CONFIRM 按钮时，将弹出新对话框。
function dialogConfirm() {
    var message = "你是猪吗？";
    var title = "question";
    var buttonLabels = ["YES", "NO"];

    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
        navigator.notification.alert("你是", null, title, buttonIndex);

    }

}

//允许用户在对话框输入元素中键入文本。
function dialogPrompt() {
    var message = "你是猪吗？";
    var title = "question";
    var buttonLabels = ["YES", "NO"];
    var defaultText = "不管，反正你就是！！";

    navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

    function promptCallback(result) {
        console.log("You clicked " + result.buttonIndex + " button! \n" +
            "You entered " + result.input1);
    }

}

//后一个是 dialogBeep 。这用于呼叫音频蜂鸣声通知。times 参数将设置蜂鸣声信号的重复次数。
function dialogBeep() {
    var times = 2;
    navigator.notification.beep(times);
}

function fun() {
    location.href = "../html/Map.html";

}
