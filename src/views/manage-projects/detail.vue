<style lang='less' scoped>
    html, body, #app {
        height: 100%;

        .tits {
            font-size: 30px;
            font-weight: 600;
            margin-left: 60px;
            margin-top: 40px;
        }

        .detBox {
            list-style: none;
            margin-top: 40px;
            margin-left: 60px;
        }

        .detBox li {
            margin-top: 10px;
        }

        .button {
            list-style: none;
            width: auto;
            position: absolute;
            right: 60px;
            top: 60px;
        }
        .button li {
            width: 200px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            border: 1px solid #666;
            border-radius: 10px;
            margin-top: 10px;
        }

        .listbox {
            width: 80%;
            margin-top: 40px;
            margin-left: 200px;
        }

    }
</style>
<template>
    <div id=app>
        <h1 class='tits'>项目详情</h1>
        <ul class='detBox'>
            <li>
                <span>项目名称</span>
                &nbsp; &nbsp;
                <span>{{classname}}项目</span>
                &nbsp; &nbsp;
                <a>编辑项目</a>
            </li>
            <li>
                <span>项目类型</span>
                &nbsp; &nbsp;
                <span>{{pname}}</span>
            </li>
            <li>
                <span>项目说明</span>
                &nbsp; &nbsp;
                <span>{{pnote}}</span>
            </li>
            <li>
                <span>执行时间</span>
                &nbsp; &nbsp;
                <span>起 {{begintime}}</span>
                &nbsp; &nbsp;
                <span>止 {{endtime}}</span>
            </li>
            <li>
                <span>总pv {{pv}}</span>
                &nbsp; &nbsp;
                <span>总ip {{ip}}</span>
                &nbsp; &nbsp;
                <span>总uv {{uv}}</span>
                &nbsp; &nbsp;
                <span>总表单数 {{subCout}}</span>
            </li>
        </ul>
        <ul class='button'>
            <li @click="add">落地页添加</li>
            <li @click='Advertising'>广告投放数据汇总</li>
            <li @click='detail'>项目监测数据明细</li>
        </ul>
        <div class="listbox">
            <i-table highlight-row :columns="columns" :data="data" ref="selection"></i-table>
            <br/>
            <Button @click="handleSelectAll(true)">全选</Button>
            <Button @click="handleSelectAll(false)">取消全选</Button>
            <br/><br/>
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer
                  show-total
                  placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'detail',
        data() {
            return {
                //分页
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '序号',
                        key: 'ldylinkid',
                        align: 'center',
                    },
                    {
                        title: '链接',
                        key: 'link',
                        align: 'center',
                    },
                    {
                        title: '投放渠道',
                        key: 'channelname',
                        align: 'center',
                    },
                    {
                        title: '关键词备注',
                        key: 'lnote',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '锁定'),
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        href: this.data[params.index].link
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    domProps: {
                                        href: this.data[params.index].link
                                        // params.row.leaderIdNumber
                                    }
                                    /*on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }*/
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '编辑 '),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '发布'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '另存为'),
                            ]);
                        }
                    }
                ],
                data: [],
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,


                classname: '',
                pname: '',
                pnote: '',
                begintime: '',
                endtime: '',
                pv: '',
                ip: '',
                uv: '',
                subCout: '',
            };
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.get();
            });
        },
        beforeRouteLeave(to, from, next) {
            next();
        },
        methods: {
            get() {
                var that = this;
                that.$route.params.id;
                that.id = localStorage.getItem('id');
                axios.post(that.GLOBAL.BASE_URL + '/adproject/getRedisByProjectId', {
                    pid: this.id
                })
                    .then(function (res) {
                        that.classname = res.data.result.classname;
                        that.pname = res.data.result.pname;
                        that.pnote = res.data.result.pnote;
                        that.begintime = new Date(res.data.result.begintime);
                        that.endtime = new Date(res.data.result.endtime);
                        that.pv = res.data.result.pv;
                        that.ip = res.data.result.ip;
                        that.uv = res.data.result.uv;
                        that.subCout = res.data.result.subCout;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


                axios.post(that.GLOBAL.BASE_URL + '/luodiye/luodiyeListByProjectId', {
                    pid: that.id,
                    page: that.pageNum,
                    rows: that.pageSize
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
            add() {
                this.$router.push({
                    name: 'CreateLandingPage',
                });
            },
            Advertising() {
                this.$router.push({
                    name: 'Advertising-data',
                });
            },
            detail() {
                this.$router.push({
                    name: 'Testproject',
                });
            },
            getlist() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/luodiye/luodiyeListByProjectId', {
                    pid: that.id,
                    page: that.pageNum,
                    rows: that.pageSize
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
            //全选 关闭全选
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            show(index) {
                this.$Modal.info({
                    title: '信息',
                    content: `序号：${this.data[index].pid}<br>链接：${this.data[index].pname}<br>投放渠道：${this.data[index].classname}<br>关键字备注：${this.data[index].begintime}<br>操作：${this.data[index].pstatus}`
                });
            },

            //分页
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