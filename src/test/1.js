/**
 * Created by denghm on 2016/4/28.
 */

$(function(){
    var applyRequest,
        ua = navigator.userAgent.toLowerCase(),
        browser;

    if((browser = ua.match(/msie ([\d.]+)/))){
        if(browser[1] == 6 || browser[1] == 7 || browser[1] == 8){
            alert("为保证系统的基本运行，请使用IE10及其以上版本或其他高速浏览器");
            window.open("about:blank", '_self').close();
        }else if(browser[1] == 9){
            layer.msg("为保证系统功能的完全运行，建议使用IE10及其以上版本或其他高速浏览器");
        }
    }

    window.sessionStorage.clear();
    $(".login-btn").on("click",login);
    $(document).on("keyup",function(e){
        if((e.keyCode == 108 || e.keyCode == 13) && !$(".login-box").hasClass("auto")){
            login();
        }
    });
    $(".autoLogin-fail").on("click",function(){
        $(this).css("transition","all 1s");
        $(".login-form").css("transition","all 1s");
        $(".login-box").removeClass("auto");
        if(applyRequest){
            applyRequest.abort();
            applyRequest = "";
        }
    });
    oaLogin();
    //function login(){
    //    var uName=$("#uname").val(),
    //        pwd=$("#pwd").val();
    //    if(uName && pwd){
    //        applyLogin({
    //            "uname": uName,
    //            "pwd": pwd,
    //            "time": (new Date()).valueOf()
    //        })
    //    }else{
    //        if(!uName){
    //            layer.tips("请输入用户名","#uname",{
    //                tips:[2,"#ff9500"]
    //            })
    //        }else if(!pwd){
    //            layer.tips("请输入密码","#pwd",{
    //                tips:[2,"#ff9500"]
    //            })
    //        }
    //
    //
    //    }
    //}
    function applyLogin(obj) {
        $(".loginState-msg").html("正在自动登入中。。。。");
        Vue.http.post(webInit.localUrl + '/api/home/login',
            {
                time: (new Date()).valueOf(),
                device: 'web',
                clientid: '',
                token: '',
                data: '{"user":"' + cryptUser(JSON.stringify(obj)) + '"}'
            }, {
                emulateJSON: true,
                before: function(response){
                    if(applyRequest){
                        layer.msg("已经在登入中了。。。");
                        response.abort();
                    }
                    applyRequest = response;
                }
            }).then(
            function (responce) {
                if (responce.data.code == 0) {
                    var dataSource = responce.data.data,
                        dataTarget = window.sessionStorage;
                    if (!dataSource.token && dataSource.issup == "Y") {
                        layer.msg("您不是本系统合法用户，不允许登录。");
                    }else {
                        for (var key in dataSource){
                            var value = dataSource[key];
                            if(typeof value == "object"){
                                value = JSON.stringify(value);
                            }
                            dataTarget.setItem(key, value);
                        }
                        window.location.href = "index.html"
                    }
                } else {
                    layer.msg(responce.data.msg);
                    $("#pwd").val("");
                    $(".loginState-msg").html("自动登入失败！");
                }
                applyRequest = "";
            },
            function (responce) {
                layer.msg(responce.status + ":" + responce.statusText);
                applyRequest = "";
                $(".loginState-msg").html("自动登入失败！");
            });
    }
    function oaLogin(){
        var search = getUrlId();
        if(search.ssokey == "jzyoa"){
            $(".login-box").addClass("auto");
            applyLogin({
                "ssokey": search.ssokey,
                "ssovalue": search.ssovalue
            })
        }
    }
});