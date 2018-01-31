document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    window.plugins.toast.showWithOptions({
            message: "click again,will exit this app",
            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
            position: "center",
            addPixelsY: -40  // added a negative value to move it up a bit (default 0)
        },
        onSuccess, // optional
        onError    // optional
    );

    function onSuccess() {

    }

    function onError() {

    }
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

function showBottom() {
    // window.plugins.toast.showWithOptions(
    //     {
    //         message: "hey there",
    //         duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
    //         position: "bottom",
    //         addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    //     },
    //     onSuccess, // optional
    //     onError    // optional
    // );
}