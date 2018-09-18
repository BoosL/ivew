<style lang="less" scoped>
    html, body, #app {
        height: 100vh;
        .backimg {
            width: 100%;
            height: 100%;
            background-image: url("../../images/back.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            .loginbox {
                position: relative;
                top: 200px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 300px;
                height: 200px;
                background-color: #ffffff;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                h1 {
                    margin-left: 120px;
                    color: #666;
                }
            }
        }
    }
</style>
<template>
    <div id="app">
        <div class="backimg">
            <form ref="ruleForm" class="loginbox">
                <h1>登陆</h1>
                <Input v-model="userName" placeholder="账号"
                       style="width: 200px;margin-left: 50px;margin-top: 20px"/>
                <Input type="password" v-model="password" placeholder="密码"
                       style="width: 200px;margin-left: 50px;margin-top: 20px"/>
                <Button type="primary" @click="submitForm('ruleForm')"
                        style="width: 20%;margin-left: 120px;margin-top: 20px;">登陆
                </Button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'login',
        data() {
            return {
                userName: '', //用户名
                password: ''  //密码
            };
        },
        created() {

        },
        methods: {
            submitForm(formName) {
                //保存的账号
                var name = this.userName;
                //保存的密码
                var pass = this.password;
                if (name == '' || name == null) {
                    this.$Notice.open({
                        title: '请输入正确的用户名',
                    });
                    return;
                } else if (pass == '' || pass == null) {
                    this.$Notice.open({
                        title: '请输入正确的密码',
                    });
                    return;
                }
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(name, pass, 1);
                //接口
                var that = this;
                axios({
                    method: 'post',
                    url: that.GLOBAL.BASE_URL + '/admin/adminLogin',
                    data: {
                        username: name,
                        password: pass
                    },
                    withCredentials: true
                })
                    .then(function (response) {
                        if (response.data.e == 0) {
                            that.$Notice.open({
                                title: '用户名或密码错误,请重新输入',
                            });
                            that.userName = '';
                            that.password = '';
                        } else {
                            that.$Notice.open({
                                title: '登陆成功',
                            });
                            that.$router.push('/home');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date();//获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存的天数
                //字符串拼接cookie
                window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString();
                window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('=');//再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.userName = arr2[1];//保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie('', '', -1);//修改2值都为空，天数为负1天就好了
            }
        },
        mounted() {
            this.getCookie();
        }
    };
</script>

