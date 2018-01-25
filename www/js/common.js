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

//显示图片
function modifyShowPicture(id, imageName) {
    if (id === null || id === undefined) {
        return;
    }
    var image = document.getElementById(id);
    image.src = url + '/images/' + imageName;
    $("#newgoods-section-" + id).css("display", "inline-block");
}