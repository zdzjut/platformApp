// var url = 'http://192.168.1.5:7087';
var url = 'http://122.226.221.26:7088';
var token = getMap("token");
if (token !== null) {
    url = 'http://122.226.221.26:7088-/?token=' + token;
    // url = 'http://192.168.1.5:7087-/?token=' + token;
}

//返回
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    window.plugins.toast.showShortCenter("再次点击，退出");
    document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
    document.addEventListener("backbutton", exitApp, false);//绑定退出事件
    // 3秒后重新注册
    var intervalID = window.setInterval(function () {
        window.clearInterval(intervalID);
        document.removeEventListener("backbutton", exitApp, false); // 注销返回键
        document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
    }, 3000);
}

function exitApp() {
    navigator.app.exitApp();
}

//当页面带参跳转，通过key获得参数值
function getParam(key) {
    // 截取掉问号之前的i
    var arrSource = unescape(this.location.search);
    var question = arrSource.split("?")[1];//?之后的字符串
    //若参数个数大于1
    var strs = question.split("&");
    strs.forEach(function (item) {
        var argMap = item.split("=");
        if (argMap[0] === key) {
            key = argMap[1];
        }
    });
    return key;
}

//h5存储，类比redis
function getMap(key) {
    return window.localStorage.getItem(key);
}


function setMap(key, value) {
    window.localStorage.setItem(key, value);
}

function removeMap(key) {
    window.localStorage.removeItem(key);
}

function getMapAndRemove(key) {
    var result = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    return result;
}



//返回上一级
function back() {
    history.back();
}

//显示图片
function modifyShowPicture(id, imageName) {
    var image = document.getElementById(id);
    if (imageName === null || imageName === undefined) {
        image.src = "";
        return;
    }
    var temp = url.replace("-", '/images/' + imageName);
    image.src = temp + "&rubbish=" + new Date();
    $("#newgoods-section-" + id).css("display", "inline-block");
}

//等待 毫秒
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

/**
 *
 * @param id 下拉框ID
 * @param value 值
 */
function selectChoose(id, value) {
    var selects = document.getElementById(id);
    for (var i = 0; i < selects.options.length; i++) {
        if (selects.options[i].value === value) {
            selects.options[i].selected = true;
            break;
        }
    }
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
    var buttonLabels = ["YES","NO"];

    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
        navigator.notification.alert("你是", null, title, buttonIndex);

    }

}
//允许用户在对话框输入元素中键入文本。
function dialogPrompt() {
    var message = "你是猪吗？";
    var title = "question";
    var buttonLabels = ["YES","NO"];
    var defaultText = "不管，反正你就是！！";

    navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

    function promptCallback(result) {
        console.log("You clicked " + result.buttonIndex + " button! \n" +
            "You entered " +  result.input1);
    }

}

//后一个是 dialogBeep 。这用于呼叫音频蜂鸣声通知。times 参数将设置蜂鸣声信号的重复次数。
function dialogBeep() {
    var times = 2;
    navigator.notification.beep(times);
}

