/**
 * Created by 鬼儿 on 2017/4/22.
 */
define(['jquery','form','validate'], function ($) {

    $('#repassForm').validate({
        sendForm:false,
        onKeyup:true,
        eachValidField: function () {

        },
        eachInvalidField: function () {

        },
        valid: function () {
            //alert('都合法了');
            $(this).ajaxSubmit({
                url:'/api/teacher/repass',
                type:'post',
                success: function (info) {
                    if(info.code == 200){
                        alert('修改成功，下次生效')
                    }
                }
            })

        },
        invalid: function () {
            alert('有些不合法了');
        },
        conditional: {//条件
            confirm: function () {
                //this 指向对当前表单
                console.log($(this).val());
                //返回一个条件 如果条件值为true 则合法
                //否则不合法
                return $(this).val() == $('.pass').val();
            }
        },
        description:{
            repass:{
                required:'密码不能为空',
                conditional:'两次密码不一致'
            }
        }
    });
    //单词记忆
    //if(conditional){//conditional--条件
    //    //logic--逻辑
    //}

})