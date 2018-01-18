function test() {
    //  location.href = "pop.html?id="+123+"&token="+123456+"&other="+444; //测试使用
    var pop = getParam("token");
    alert(pop);
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
            alert(argMap[1]);
            key = argMap[1];
        }
    });
    return key;
}

//h5存储，类比redis
function getMap(key) {
    var item = window.localStorage.getItem(key);
    alert(item);
}

function setMap(key, value) {
    window.localStorage.setItem(key, value);
}