<style lang="less" scoped>
    .layout {
        position: relative;
        width: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        height: 100%;
    }

    .layout-logo {
        width: 21px;
        height: 20px;
        float: left;
        position: relative;
        top: 40px;
        left: 20px;
        background-image: url("../../images/logo.png");
        background-repeat: no-repeat;
    }

    .layout-title {
        position: absolute;
        top: 20px;
        margin-left: 30px;
        font-size: 20px;
        color: #ffffff;
        font-weight: 600;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
    }

    .layout-assistant {
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        position: absolute;
        height: 89% !important;
        background: #fff;
        width: 100%;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .ivu-menu-dark {
        min-width: 500px !important;
        background: #ff0000 !important;
        height: 100px !important;
    }

    .layout-ceiling-main {
        float: right;
        margin-right: 22px;
        font-size: 14px;
        color: #fff;
    }

    .layout-ceiling-main a {
        color: #fff;
        position: absolute;
        right: 160px;
        top: 10px;
    }

    .logname {
        right: 60px;
        position: absolute;
        top: 10px;
    }

    .login {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-top: 22px;
    }

    .loginb .icon {
        position: absolute;
        right: 38px;
        top: 25px;
    }

    .logname {
        cursor: pointer;
        color: #ffffff;
    }

</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <span class="layout-title">黎古广告监测管理系统</span>
            <div class="layout-ceiling-main">
                <router-link to="/home"><img src="../../images/home.png">&nbsp;&nbsp;返回首页</router-link>
                <div class="loginb">
                    <span class="logname"><Icon class="icon" type="chevron-down"></Icon>{{userName}}</span>
                    <img class="login"
                         src="http://img.hb.aicdn.com/472a9ca69a8717d832235ffcd7077a3729d0f5439247e-p3q7Wc_fw658">
                </div>
            </div>
        </Menu>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                userName: ''
            };
        },
        created() {
            var that = this;
            axios({
                method: 'post',
                url: that.GLOBAL.BASE_URL + '/adadm/getSessionObj',
                data: {},
                withCredentials: true
            })
                .then(function (response) {
                    if (response.data.e == 1) {
                        that.userName = response.data.result.username;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {}
    };
</script>
