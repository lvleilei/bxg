
define(['jquery', '../utils','template','validate','form','datepicker', 'language'], function ($, utils,template) {

    //设置导航
    utils.setMenu('/teacher/teacher_list');

    //由于添加操作和编辑操作页面布局是类似的
    //那么为了方便就使用了同一页面
    //逻辑是互相影响的，所以分别处理

    ////获取地址上的参数函数，放到utils中
    //function qs(key){
    //    //for(var key in location){
    //    //    console.log(key + '-->' +location[key]);
    //    //}
    //    //location.search可以获取地址上的请求参数
    //    //http://www.bxg.com/teacher/teacher_add?tc_id=15&tc_name=aaa
    //    var search = location.search.slice(1);//从第一位开始截取
    //    var search = search.split('&');//把字符串按&拆分成数组
    //    //console.log(search);//["tc_id=15", "tc_name=aaa"]
    //    for(var i=0;i<search.length; i++){
    //        var temp = search[i].split('=');
    //        //console.log(temp[0]);
    //        //console.log(temp[1]);
    //        var o = {};
    //        o[temp[0]] = temp[1];
    //    }
    //    return o[key];
    //}
    //console.log(qs('tc_name'));
    var tc_id = utils.qs('tc_id'),
        html,
        teacherAdd = $('#teacherAdd'),
        tips;
    if(tc_id){
        //编辑讲师
        //根据讲师的ID，查询原始的信息，然后进行修改
        //  http://api.botue.com/teacher/edit
        //  /api     http://api.botue.com
        $.ajax({
            url:'/api/teacher/edit',
            type:'get',
            data:{tc_id: tc_id},
            success: function (info) {
                tips= "修改成功",
                console.log(info);
                info.result.btnText = ' 修 改 ';
                info.result.title = '讲师修改';
                info.result.action = '/api/teacher/update'
                //渲染页面
                html = template('teacherAddTpl',info.result);
                //追加到原来位置
                teacherAdd.html(html);
                dealForm();
            }
        })
    }else{
        //添加讲师
        tips ="添加成功",
        html = template('teacherAddTpl',{
            btnText:'添加',
            title:'讲师添加',
            action:'/api/teacher/add'
        })
        //追加到原来位置
        teacherAdd.html(html);
        dealForm();
    }

    //表单的处理
    function dealForm(){
        //jquery的插件有一个通用的用法
        //$(DOM元素).插件提供的方法
        teacherAdd.find('form').validate({
            sendForm: false,
            onKeyup: true,
            eachValidField: function () {
                //this指的合法的表单项
                $(this).next().addClass('glyphicon-ok').removeClass('glyphicon-remove')
                    .parents('.form-group').addClass('has-success').removeClass('has-error');
            },
            eachInvalidField: function () {
                // this指的合法的表单项
                $(this).next().addClass('glyphicon-remove').removeClass('glyphicon-ok')
                    .parents('.form-group').addClass('has-error').removeClass('has-success');
            },
            valid: function () {
                // 所有表单项都合法，可以提交表单
                // 在此的this指当前表单
                $(this).ajaxSubmit({
                    //url: '/api/teacher/add',
                    type: 'post',
                    success: function (info) {
                        console.log(info);
                        if( info.code == 200){
                            alert(tips);
                        }
                    }
                });
            },
            description:{
                name: {
                    required: '用户名不能为空'
                },
                pass: {
                    required: '密码不能为空',
                    pattern: '密码只能为字母和数字且长度不能小于6位'
                }
            }
        })
    }

    ////提交表单
    //$('#teacherAdd').on('submit', function () {
    //
    //    var formData = $(this).serialize();
    //
    //    // /api http://api.botue.com
    //    // http://api.botue.com/teacher/add
    //    $.ajax({
    //        url: '/api/teacher/add',
    //        type: 'post',
    //        data: formData,
    //        success: function (info) {
    //            console.log(info);
    //        }
    //    });
    //
    //    return false;
    //})

});