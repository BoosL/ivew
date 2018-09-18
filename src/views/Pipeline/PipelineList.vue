<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        min-width: 800px;
        overflow: hidden;
        h1 {
            margin-left: 60px;
            margin-top: 40px;
        }
        .addbutton {
            position: absolute;
            width: 200px;
            height: 50px;
            right: 120px;
            top: 40px;
            border: 1px solid #666666;
            border-radius: 10px;
            text-align: center;
            line-height: 50px;
        }
        .add {
            position: fixed;
            width: 400px;
            height: 200px;
            left: 50%;
            margin-left: -200px;
            top: 200px;
            background-color: #ffffff;
            z-index: 99;
            border: 1px solid #666666;
            span {
                position: absolute;
                right: 20px;
                top: 10px;
            }
            .ss {
                margin-left: 60px;
                margin-top: 30px;
                .save {
                    position: absolute;
                    width: 120px;
                    height: 40px;
                    top: 140px;
                    left: 160px;
                    line-height: 30px;
                }
            }
        }
        #table {
            margin-left: 200px;
            margin-top: 120px;
            width: 1200px;
        }
        .ivu-page {
            margin-left: 200px;
        }
    }
</style>
<template>
    <div id="app">
        <h1>渠道管理列表</h1>
        <div class="addbutton" @click="addbox">添加投放渠道</div>
        <div class="add" v-if="ontrun">
            <span @click="close">关闭</span>
            <div class="ss">
                渠道名字&nbsp;&nbsp;<Input v-model="Channelname" placeholder="" style="width: 200px"/> <br/><br/>
                渠道代码&nbsp;&nbsp;<Input v-model="Channelcode" placeholder="" style="width: 200px"/>
                <Button type="primary" size="large" class="save" @click="save">
                    保存
                </Button>
            </div>
        </div>
        <div class="add" v-if="onedit">
            <span @click="closeEditBox">关闭</span>
            <div class="ss">
                投放渠道&nbsp;&nbsp;<Input v-model="Editname" placeholder="" style="width: 200px"/> <br/><br/>
                渠道代码&nbsp;&nbsp;<Input v-model="Editcode" placeholder="" style="width: 200px"/>
                <Button type="primary" size="large" class="save" @click="saveEdit">
                    保存
                </Button>
            </div>
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
        name: 'PipelineList',
        data() {
            return {
                ontrun: false,
                onedit:false,
                Channelname: '',
                Channelcode: '',
                Editname:'',
                Editcode:'',
                EditId:'',
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '投放渠道',
                        key: 'channelname'
                    },
                    {
                        title: '渠道代码',
                        key: 'channelcode'
                    },
                    {
                        title: '创建人',
                        key: 'userName'
                    },
                    {
                        title: '创建时间',
                        key: 'addtime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.openEditBox(params.index);
                                        }
                                    }
                                }, '编辑'),
                               /* h('Button', {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '锁定'),*/
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [],
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,
            };
        },
        created() {
            var that = this;
            axios.post(that.GLOBAL.BASE_URL + '/adchannel/list', {
                page: that.pageNum,
                rows: that.pageSize
            })
                .then(function (res) {
                    console.log(res);
                    var list = res.data.result;
                    //绑定的iview table数据，是一个数组
                    that.data = list;
                    that.pageTotal = res.data.result.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            addbox() {
                this.ontrun = true;
            },
            close() {
                this.ontrun = false;
            },
            openEditBox(index){
                this.onedit = true;
                this.Editname=this.data[index].channelname;
                this.Editcode=this.data[index].channelcode;
                this.EditId=this.data[index].channelid;
            },
            closeEditBox(){
                this.onedit = false;
            },
            save() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adchannel/add', {
                    channelname: that.Channelname,
                    channelcode: that.Channelcode
                },{ withCredentials: true})
                    .then(function (res) {
                        if(res.data.e==1){
                            that.close();
                            that.$Notice.open({
                                title: '成功',
                                top: 300,
                                duration: 2,
                                onClose:function(){
                                  that.getlist();
                                }
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            saveEdit(){
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adchannel/update', {
                    channelname: that.Editname,
                    channelcode: that.Editcode,
                    channelid: that.EditId
                },{ withCredentials: true})
                    .then(function (res) {
                        if(res.data.e==1){
                            that.closeEditBox();
                            that.$Notice.open({
                                title: '添加成功',
                                top: 300,
                                duration: 2,
                                onClose:function(){
                                  that.getlist();
                                }
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            remove(index) {
                var that=this;
                this.data.splice(index, 1);
                 axios.post(that.GLOBAL.BASE_URL + '/adchannel/delete', {
                    id:that.data[index].channelid
                },{ withCredentials: true})
                    .then(function (res) {
                          if(res.data.e==1){
                            that.$Notice.open({
                                title: '删除成功',
                                top: 300,
                                duration: 2,
                                onClose:function(){
                                  that.getlist();
                                }
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.getlist();
            },
            //分页
            getlist() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adchannel/list', {
                    page: this.pageNum,
                    rows: this.pageSize,
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

        }
    };
</script>

