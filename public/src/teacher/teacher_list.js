
define(['jquery','../utils','template'],function ($, utils, template) {
	// alert(1);
	//设置导航
	utils.setMenu('/teacher/teacher_list');

	//全局获取（起到缓存的作用）	
	var teacherList = $('#teacherList'),
        teacherModal = $('#teacherModal'),
		html;

	//发送请求给服务器要数据
	//  /api  http://api.botue.com
	$.ajax({
		url:'/api/teacher',
		type:'get',
		success:function(info){
            console.log(info);
			//调用模板引擎
			html = template('teacherTpl',{
				teachers: info.result});
			//添加DOM元素
			teacherList.find('tbody').html(html);
		}
	});

	//显示模态框(绑定事件时DOM元素未生成，使用冒泡)
    teacherList.on('click', '.view', function () {
        //alert(1);
        var tc_id = $(this).parent().attr('data-id');
        //发送请求 根据tc_id获取讲师 详细信息
        $.ajax({
            url:'/api/teacher/view',
            type:'get',
            data:{tc_id:tc_id},
            success: function (info) {
                console.log(info);
                info.result.tc_hometown = info.result.tc_hometown.split('|').join(' ');
                html = template('modalTpl',info.result);
                teacherModal.find('table').html(html);

                //显示模态框
                teacherModal.modal();
            }
        })

    });

    //注销或启用讲师
    teacherList.on('click','.handle', function () {
        //alert(1);

        //tc_status值为0 -- 启用状态   值为1 --注销状态
        var _this = $(this),
            tc_id = $(this).parent().attr('data-id'),
            tc_status = $(this).attr('data-status');
        $.ajax({
            url:'/api/teacher/handle',
            type:'post',
            //将讲师当前状态发送给服务端
            data:{tc_id: tc_id,tc_status:tc_status},
            success: function (info) {
                //服务端返回的是修改后的状态
                //console.log(info);
                //返回结果  如果info.result.tc_status为0，当前为启用
                //文字应该为 注销
                //返回结果  如果info.result.tc_status为1   当前为注销
                //文字应该为 启用
                var text = info.result.tc_status == 0 ? '注 销' : '启 用';
                _this.text(text);
                _this.attr('data-status',info.result.tc_status);
            }
        })
    })

})