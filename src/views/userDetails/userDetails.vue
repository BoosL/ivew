<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        min-width: 800px;
        margin-top: 6%;
        margin-left: -3%;
        overflow: hidden;
        .adduser {
            position: absolute;
            top: 125px;
            left: 35%;
            transform: translate(-50%, 0);
            display: flex;
            flex-direction: row;
            .user, .password, .phone, .role{
                text-align: center;
                font-size: 16px;
            }
            .add{
                margin-left:20px;
                margin-top:-5px;
            }
        }

        .txt{
            width: 40px;
            text-align: center;
            line-height: 34px;
        }
        h1 {
            position: absolute;
            left: 3%;
            top: 60px;
        }
        #table {
            margin-left: 0;
            margin-top: 0;
            width: 1200px;
        }
        .ivu-page {
            margin-left: 0.5%;
        }
    }
</style>
<template>
    <div id="app">
        <h1>用户流水表</h1>
        <div class="adduser">
            <span class="txt">用户名</span>
            <div class="user">
                <Input v-model="user" placeholder="" style="width: 200px"/>
            </div>
            <span class="txt">密码</span>
            <div class="password">
                <Input v-model="password" placeholder="" style="width: 200px"/>
            </div>
            <span class="txt">手机号</span>
            <div class="phone">
                <Input v-model="phone" placeholder="" style="width: 200px"/>
            </div>
            <span class="txt">角色</span>
            <div class="role">
                <Select v-model="role" style="width:200px" name="public-choice"
                        id="selected">
                    <Option v-for="item in rolename" :value="item.roleid" :key="item.value">{{item.rolename}}</Option>
                </Select>
            </div>
            <Button type="primary" size="large" @click="add" class="add">
                添加
            </Button>
        </div>
        <div style="margin-left: 100px;padding-top: 100px;">
            <i-table highlight-row :columns="columns" :data="data" ref="table" id="table"></i-table>
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                  placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'userDetails',
        data() {
            return {
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '用户',
                        key: 'username'
                    },
                    {
                        title: '状态',
                        key: 'userstatus'
                    },
                    {
                        title: '手机',
                        key: 'phone'
                    },
                    {
                        title: '登录时间',
                        key: 'logintime'
                    },

                ],
                data: [],
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,


                user: '',
                password: '',
                phone: '',
                role: '',
                List: '',
                rolename: ''
            };
        },
        created() {
            var that = this;
            axios({
                method: 'post',
                url: that.GLOBAL.BASE_URL + '/adadm/list',
                data: {
                    page: this.pageNum,
                    rows: this.pageSize
                },
                withCredentials: true
            })
                .then(function (res) {
                    var list = res.data.result;
                    //绑定的iview table数据，是一个数组
                    that.data = list;
                    that.pageTotal = res.data.result.length;
                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.post(that.GLOBAL.BASE_URL + '/adrole/list', {
                page: this.pageNum,
                rows: this.pageSize
            })
                .then(function (res) {
                    that.rolename = res.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            remove(index) {
                this.data.splice(index, 1);
            },

            shuaxin() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adadm/list', {
                    page: this.pageNum,
                    rows: this.pageSize
                })
                    .then(function (res) {
                        var list = res.data.result;
                        that.data = list;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            getlist() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adadm/list', {
                    page: this.pageNum,
                    rows: this.pageSize
                })
                    .then(function (res) {
                        var list = res.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data = list;
                        that.pageTotal = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handlePage(value) {
                this.pageNum = value;
                this.getlist();
            },
            handlePageSize(value) {
                this.pageSize = value;
                this.getlist();
            },
            add() {
                var that = this;
                axios({
                    method: 'post',
                    url: that.GLOBAL.BASE_URL + '/adadm/add',
                    data: {
                        'username': that.user,
                        'password': that.password,
                        'phone': that.phone,
                        'adduserid': that.role,
                    },
                    withCredentials: true
                })
                    .then(function (response) {
                        if (response.data.e == 1) {
                            that.shuaxin();
                            that.$Notice.open({
                                title: '添加角色成功',
                            });
                            that.user = '';
                            that.password = '';
                            that.phone = '';
                            that.role = '';
                        } else {
                            that.$Notice.open({
                                title: '添加角色失败，请重新添加',
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    };
</script>
