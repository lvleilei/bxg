
define(['jquery', 'template','nprogress','cookie'], function ($,template,NProgress) {

    NProgress.start();
    NProgress.done();

    //设置ajax loading ---加载页面
    $(document).ajaxStart(function () {
        $('.overlay').show();
    })
    $(document).ajaxStop(function () {
        setTimeout(function () {
            $('.overlay').hide();
        },300);

    })

    // 检测用户是否登录，如果没有登录则跳转至登录页

    // 如何检测用户是否登录了呢？

    // 当存了一个session后，浏览器会设置一个名字叫PHPSESSID的cookie

    // 只要检测PHPSESSID是否存就可判断用户是否登录过

    // 通过document.cookie可以读取本地存的cookie
    // if(document.cookie.indexOf('PHPSESSID') != -1) {
        // 登录过
    // } else {
        // 没有登录，跳转至登录页面
        // 除了login页面自身外都需要检测
        // 如何得知当前是不是login
        // location.href = '/login';
    // }

    // 浏览器提供了location这个BOM对象，可以获得地址的信息
    // for(var key in location) {
    //     console.log(key + '->' + location[key])
    // }

    // 检测用户是否登录
    if(document.cookie.indexOf('PHPSESSID') == -1 && location.pathname != '/login') {
        location.href = '/login';
    }

    // 获取用户的登录信息(被记录在了cookie中)
    var loginfo = $.cookie('loginfo') && JSON.parse($.cookie('loginfo'));

    // console.log(loginfo);


    //将存在cookie中的用户头像和名称显示在页面中
    //1--
    // $('.profile img').attr('src',loginfo.tc_avatar);
    // $('.profile h4').text(loginfo.tc_name);//这样两次查询DOM，用模板写，节约性能

    //拓展web 、H5 、FE--front end--前端  BE--back end--后端 UI PM--产品 

    //2--模板引擎渲染
    // template方法传递两个参数
    //第一个参数是模板所在DOM标签（script）的ID
    //第二个参数是模板所需要的数据（对象类型）
    //template('tpl',data)

    //compile方法也需要两个参数
    //第一个参数是字符串形式的模板
    //第二个参数是配置选项可以省略
    // var tpl = '<h1><%= name %></h1>';
    // var data = {name:'小明'};

    //定义模板
    var sourse ='<div class="avatar img-circle">\
                    <img src="<%= tc_avatar %>">\
                </div>\
                <h4><%= tc_name %></h4>',
        //编译模板
        render = template.compile(sourse),
        //传递数据
        html = render(loginfo || {});
    // console.log(html);
    $('.aside .profile').append(html);


    // 退出登录
    $('#logout').on('click', function () {

        // /api http://api.botue.com
        $.ajax({
            url: '/api/logout',
            type: 'post',
            success: function (info) {
                if(info.code == 200) {
                    alert('退出成功!');
                    location.href = '/login';
                }
            }
        })
    });

    //导航栏交互
    $('.navs ul').prev('a').on('click',function(){
        // alert(1);
        $(this).next().slideToggle();
    })
})