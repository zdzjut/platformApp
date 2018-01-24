$(document).ready(function(){
    $(".show").click(function(){
        showDg();
    });
    $(".dialog").click(function(){
        hideDg();
    });
});
//显示遮罩层和弹出窗
function showDg(){
    $(".overlay").show();
    $(".mask").show(50);
};
//隐藏遮罩层和弹出窗
function hideDg(){
    $(".mask").hide();
    $(".overlay").hide();
};