const routers = [

    // {
    //     path: '/',
    //     name: 'LinkSettingsSave',
    //     component: (resolve) => require(['./views/createProject/LinkSettingsSave.vue'], resolve)//链接设置及保存
    // },

    // {
    //     path: '/',
    //     name: 'CreateLandingPage',
    //     component: (resolve) => require(['./views/createProject/CreateLandingPage.vue'], resolve)//创建落地页
    // },

    {
        path: '/',
        name: 'login',
        component: (resolve) => require(['./views/login/login.vue'], resolve),//登录页面
    },
    {
        path: 'index',
        name: 'index',
        component: (resolve) => require(['./views/index.vue'], resolve),//入口
        children: [
            {
                path: '/home',
                name: 'home',
                component: (resolve) => require(['./views/home-page/home.vue'], resolve),//首页
            },
            {
                path: '/ProjectSave',
                name: 'ProjectSave',
                component: (resolve) => require(['./views/ProjectManagement/ProjectSave.vue'], resolve)//创建项目
            },

            //创建项目
            {
                path: '/CreateLandingPage',
                name: 'CreateLandingPage',
                component: (resolve) => require(['./views/createProject/CreateLandingPage.vue'], resolve)//创建落地页
            },
            {
                path: '/LinkSettingsSave',
                name: 'LinkSettingsSave',
                component: (resolve) => require(['./views/createProject/LinkSettingsSave.vue'], resolve)//链接设置及保存
            },


            //管理项目
            {
                path: '/ulitem',
                name: 'ulitem',
                component: (resolve) => require(['./views/manage-projects/ulitem.vue'], resolve),//项目列表
            },
            {
                path: '/detail',
                name: 'detail',
                component: (resolve) => require(['./views/manage-projects/detail.vue'], resolve),//项目详情
            },
            {
                path: '/Advertising-data',
                name: 'Advertising-data',
                component: (resolve) => require(['./views/manage-projects/Advertising-data.vue'], resolve)//广告投放数据汇总
            },
            {
                path: '/Testproject',
                name: 'Testproject',
                component: (resolve) => require(['./views/manage-projects/Testproject.vue'], resolve),//项目监测数据详情页
            },


            //落地页列表
            {
                path: 'Landinglist',
                name: 'Landinglist',
                component: (resolve) => require(['./views/Landingpage/Landinglist.vue'], resolve),//落地页列表
            },


            //渠道管理列表
            {
                path: 'PipelineList',
                name: 'PipelineList',
                component: (resolve) => require(['./views/Pipeline/PipelineList.vue'], resolve),//渠道列表
            },


            //日志管理
            {
                path: '/viewLog',
                name: 'viewLog',
                component: (resolve) => require(['./views/logManagement/viewLog.vue'], resolve),//日志查看
            },

            //用户管理
            {
                path: '/userDetails',
                name: 'userDetails',
                component: (resolve) => require(['./views/userDetails/userDetails.vue'], resolve),//用户查看
            },
        ]
    },
];
export default routers;