var url = 'http://192.168.2.120:7087';
// var url = 'http://122.226.221.26:7088';


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

//返回上一级
function back() {
    history.back();
}
//手机物理返回键处理
// var pageUrl = window.location.href;
// var n = pageUrl.lastIndexOf('?');
// var m = pageUrl.lastIndexOf('/');
// var str = pageUrl.substring(m+1,n); //获取pageName
//
// var exitAppTicker = 0;
// document.addEventListener("deviceready",function(){
//     console.log("deviceready");
//     document.addEventListener("backbutton", function(){
//         if(处于菜单页面){//显示底部菜单按钮的页面
//             //跳转到首页
//         }else if(当前处于首页){
//             if(exitAppTicker == 0){
//                 exitAppTicker++;
//                 console.log("再点一次退出");
//                 setTimeout(function(){
//                     exitAppTicker = 0;
//                 },2000);
//             }else if(exitAppTicker == 1){
//                 navigator.app.exitApp(); //退出app
//             }
//         }else{
//             history.back();
//         }
//     }, false);
// },false);
// //返回键点击响应
//
// function eventBackButton() {
//     //进入后台
//     navigator.Backbutton.goHome(function() {
//         console.log('go home success');
//     }, function() {
//         console.log('go home fail');
//     });
// }