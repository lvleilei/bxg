
//配置文件
requirejs.config({
    baseUrl: '/public',
    paths: {
        jquery: 'assets/jquery/jquery.min',
        cookie: 'assets/jquery-cookie/jquery.cookie',
        template: 'assets/artTemplate/template-web',
        nprogress:'assets/nprogress/nprogress',
        validate: 'assets/jquery-validate/jquery-validate.min',//表单验证插件
        form: 'assets/jquery-form/jquery.form',//表单提交插件
        bootstrap: 'assets/bootstrap/js/bootstrap.min',
        datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',//日期日历插件
        language: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        ckeditor: 'assets/ckeditor/ckeditor',
        region: 'assets/jquery-region/jquery.region',
        uploadify: 'assets/uploadify/jquery.uploadify.min'
    },
    shim: {
    	validate: {
            deps: ['jquery'] // 使用别人东西（依赖）
        },
        bootstrap: {
            deps: ['jquery']
        },
        language: {
            deps: ['datepicker', 'jquery']
        },
        ckeditor: {
            exports: 'CKEDITOR'//暴露出来东西供使用
        },
        uploadify: {
            deps: ['jquery']
        }
    }
});

require(['src/common','bootstrap']);