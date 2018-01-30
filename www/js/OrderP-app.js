document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    alert('再点击一次退出!');
    document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
    document.addEventListener("backbutton", exitApp, false);//绑定退出事件
    // 3秒后重新注册
    var intervalID = window.setInterval(function() {
        window.clearInterval(intervalID);
        document.removeEventListener("backbutton", exitApp, false); // 注销返回键
        document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
    }, 3000);
}
function exitApp(){
    navigator.app.exitApp();
}