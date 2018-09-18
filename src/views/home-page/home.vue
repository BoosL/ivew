<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        position: relative;
    }

    .Info {
        position: relative;
        width: 90%;
        height: 300px;
        left: 5%;
        border-bottom: 1px solid #666666;
    }

    .user {
        position: absolute;
        left: 60px;
        top: 40px;
        color: #666666;
    }

    .user span:nth-child(1) {
        font-weight: 600;
        font-size: 30px;
    }

    .user span:nth-child(2) {
        margin-left: 20px;
        font-size: 16px;
    }

    .time {
        position: absolute;
        right: 40px;
        top: 20px;
        text-align: center;
    }

    .time #btn {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        margin-top: 10px;
        boder: none;
        outline: none;
        cursor: pointer;
    }

    .promes {
        position: absolute;
        top: 100px;
        left: 40px;
        color: #000;
        font-weight: 600;
    }

    .going, .finish {
        margin-top: 20px;
        margin-left: 20px;
        text-align: center;
    }

    .Detailed-number {
        list-style: none;
        position: absolute;
        right: 40px;
        top: 100px;
    }

    .Detailed-number li {
        float: left;
        margin-left: 10px;
        width: 90px;
        height: 90px;
        border: 1px solid #666;
        border-radius: 10px;
        text-align: center;
    }

    .Detailed-number li p {
        margin-top: 14px;
        font-weight: 600;
    }

    .Detailed-number li p:nth-child(2) {
        color: #0065b5;
        height: 30px;
    }

    .proBBox {
        position: relative;
        width: 90%;
        height: 100%;
        left: 5%;
        top: 0;
    }

    .title {
        font-weight: 600;
        font-size: 16px;
        color: #666;
        position: absolute;
        top: 20px;
        left: 40px;
    }

    .probox {
        width: 100%;
        height: 400px;
    }

    .proimg {
        margin-top: 80px;
        width: 400px;
        height: 250px;
        border: 1px solid #ccc;
        margin-left: 40px;
    }

    .rightbox {
        margin-left: 70%;
        margin-top: -200px;
    }

    .rightbox p {
        font-weight: 600;
        font-size: 22px;
        margin-left: 40px;
    }

    .mes {
        width: 280px;
        margin-left: 20px;
        float: left;
    }

    .mes span {
        margin-left: 20px;
        margin-top: 10px;
    }

    .click {
        list-style: none;
        margin-top: 30px;
        margin-left: 40px;
    }

    .click li {
        float: left;
        margin-left: 20px;
    }

    #amend, #monitoring {
        width: 100px;
        height: 50px;
        border: 1px solid #666666;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
    }

    #amend:hover {
        background-color: #1a9ee3;
        border: 1px solid #fff;
        color: #fff;
    }

    #monitoring:hover {
        background-color: #1a9ee3;
        border: 1px solid #fff;
        color: #fff;
    }


</style>
<template>
    <div id="app">
        <div class="Info">
            <div class="user">
                <span>{{userName}}</span>
                <span>角色:{{roleName}}</span>
            </div>
            <div class="time">
                <p>登陆时间：2018年7月5日 13:14分</p>
                <Button type="success" @click="create" id="btn">创建项目</Button>
            </div>
            <div class="promes">
                <div class="going">
                    <p>正在进行项目</p>
                    <p>{{undoneCount}}</p>
                </div>
                <div class="finish">
                    <p>已经完成项目</p>
                    <p>{{doneCount}}</p>
                </div>
            </div>
            <ul class="Detailed-number">
                <li>
                    <p>表单项目</p>
                    <p>{{ldyCount}}</p>
                </li>
                <li>
                    <p>总表单数</p>
                    <p>{{allCount}}</p>
                </li>
                <li>
                    <p>今日新增表单</p>
                    <p>{{todayCount}}</p>
                </li>
            </ul>
        </div>
        <div class="proBBox">
            <span class="title">正在进行项目</span>
            <div class="probox" v-for="item in listproject">
                <img class="proimg" :src="GLOBAL.Cdn_URL + item.picurl"/>
                <div class="rightbox">
                    <p>{{item.pname}}</p>
                    <span>点击 {{item.pv}}</span>
                    <span>表单数{{item.subtoday}}</span>
                    <span>今日表单数 {{item.subCount}}</span>
                    <span>平均跳出率 {{item.jump}}%</span>
                    <span>平均跳出时长{{item.timeOut}}s</span>
                    <ul class="click">
                        <li>
                            <div id="amend" @click="modification">落地页修改</div>
                        </li>
                        <li>
                            <div id="monitoring" @click='monitor'>监测数据</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'home',
        data() {
            return {
                listproject: '',
                undoneCount: '',
                doneCount: '',
                ldyCount: '',
                allCount: '',
                todayCount: '',
                userName: '',
                roleName: '',
            };
        },
        created() {
            var that = this;
            axios.post(that.GLOBAL.BASE_URL + '/adproject/indexList', {
                pstatus: '未完成',
                page: 1,
                rows: 10
            })
                .then(function (response) {
                    that.listproject = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.post(that.GLOBAL.BASE_URL + '/adproject/topCount', {})
                .then(function (response) {
                    that.undoneCount = response.data.result.undoneCount;
                    that.doneCount = response.data.result.doneCount;
                    that.ldyCount = response.data.result.ldyCount;
                    that.allCount = response.data.result.allCount;
                    that.todayCount = response.data.result.todayCount;
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios({
                method: 'post',
                url: that.GLOBAL.BASE_URL + '/adadm/getSessionObj',
                data: {},
                withCredentials: true
            })
                .then(function (response) {
                    if (response.data.e == 1) {
                        that.userName = response.data.result.username;
                        that.roleName = response.data.result.roleName;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        methods: {
            create() {
                let self = this;
                self.$router.push({path: '/ProjectSave'});
            },
            modification() {
                let self = this;
                self.$router.push({path: '/CreateLandingPage'});
            },
            monitor() {
                let self = this;
                self.$router.push({path: '/Testproject'});
            }
        }
    };
</script>

