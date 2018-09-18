<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        h1 {
            position: relative;
            left: 60px;
            top: 20px;
        }

        .proname {
            position: absolute;
            left: 280px;
            top: 120px;
            span {
                position: relative;
                top: 8px;
            }
        }

        .position {
            position: absolute;
            right: 280px;
            top: 80px;
            margin-left: 10px;
            span {
                position: relative;
                top: 8px;
            }
        }

        .link {
            position: absolute;
            left: 320px;
            top: 78px;
            margin-left: 10px;
            span {
                position: relative;
                top: 8px;
            }
        }

        .channel {
            position: absolute;
            right: 280px;
            top: 140px;
            margin-left: 10px;
            span {
                position: relative;
                top: 8px;
            }
        }

        #sell, #name, #junp, #access, #throw {
            width: 120px;
            height: 20px;
        }

        .sort {
            position: absolute;
            left: 80px;
            top: 120px;
            span {
                position: relative;
                top: 8px;
            }
        }

        .origin {
            margin-top: 40px;
            margin-left: 80px;
        }

        #screen {
            position: absolute;
            right: 40px;
            top: 80px;
            width: 100px;
            height: 40px;
        }

        #Dcostcalculation {
            position: absolute;
            right: 40px;
            top: 160px;
            width: 100px;
            height: 40px;
        }

        #Tabs {
            position: relative;
            top: 120px;
            left: 120px;
            width: 1400px;
            height: auto;
        }

        .Costing {
            position: fixed;
            width: 600px;
            height: 400px;
            border: 1px solid #cccccc;
            left: 20%;
            top: 200px;
            z-index: 999;
            background-color: #ffffff;
            h2 {
                position: absolute;
                top: 20px;
                left: 60px;
            }
            span {
                position: absolute;
                right: 40px;
                top: 20px;
            }
            .Costingt {
                position: relative;
                margin-top: 80px;
                margin-left: 80px;
                span {
                    position: absolute;
                    left: -40px;
                    top: 10px;
                }
            }
            .pronamet {
                position: absolute;
                left: 60px;
                top: 160px;
                span {
                    position: absolute;
                    left: -40px;
                    top: 0;
                }
                #sellt {
                    width: 120px;
                    height: 20px;
                }
            }

            .accesslink {
                position: absolute;
                left: 260px;
                top: 160px;
                span {
                    position: absolute;
                    left: -60px;
                    top: 0;
                }
                #link {
                    width: 120px;
                    height: 20px;
                }
            }

            .onchannel {
                position: absolute;
                right: 30px;
                top: 160px;
                span {
                    position: absolute;
                    left: -60px;
                    top: 0;
                }
                #channel {
                    width: 120px;
                    height: 20px;
                }
            }
            .quantity {
                position: absolute;
                top: 200px;
                list-style: none;
                left: 20px;
            }
            .quantity li {
                float: left;
                margin-left: 40px;
            }

            .amount {
                position: absolute;
                left: 100px;
                top: 240px;
                span {
                    position: absolute;
                    left: 0;
                    top: 10px;
                }
                #amounts {
                    margin-left: 60px;
                    width: 220px;
                    height: 30px;
                }
            }

            .cost {
                position: absolute;
                left: 100px;
                top: 300px;
                width: 200px;
                span {
                    position: absolute;
                    left: 0;
                    top: 10px;
                }
            }

            #calculate {
                position: absolute;
                bottom: 20px;
                width: 100px;
                height: 30px;
                left: 50%;
                margin-left: -50px;
            }

        }

    }
</style>
<template>
    <div id="app">
        <h1>落地页管理列表</h1>
        <div class="origin">
            <span>按创建时间</span>
            <DatePicker type="date" style="width: 160px" v-model="starttime"></DatePicker>
        </div>
        <div class="proname">
            <span>按项目类别</span>
            <i-select v-model="project" style="width:200px" id="sell">
                <i-option v-for="item in ItemClass" :value="item.classid" :key="item.value">{{item.classname}}
                </i-option>
            </i-select>
        </div>
        <div class="link">
            <span>按状态</span>
            <i-select v-model="state" style="width:200px" id="access">
                <i-option v-for="item in stateList" :value="item.type" :key="item.value">{{item.type}}</i-option>
            </i-select>
        </div>
        <div class="channel">
            <span>按创建人</span>
            <i-select v-model="creators" style="width:200px" id="throw">
                <i-option v-for="item in creator" :value="item.userid" :key="item.value">{{item.username}}</i-option>
            </i-select>
        </div>
        <div class="position">
            <span>按投放渠道</span>
            <i-select v-model="channels" style="width:200px" id="junp">
                <i-option v-for="item in channel" :value="item.channelid" :key="item.value">{{item.channelname}}
                </i-option>
            </i-select>
        </div>
        <div class="sort">
            <span>按关键字</span>
            <i-input :value.sync="keyword" placeholder="可筛选所有条件" id="name"></i-input>
        </div>

        <Button type="success" size="large" id="screen" @click="screen">
            筛选
        </Button>
        <Tabs :animated="true" id="Tabs" border>
            <TabPane label="全部">
                <Table border ref="table" :columns="columns" :data="data"></Table>
                <Button @click="handleSelectAll(true)">全选</Button>
                <Button @click="handleSelectAll(false)">取消全选</Button>
                <Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
            </TabPane>
        </Tabs>
    </div>
</template>


<script>
    import axios from 'axios';

    export default {
        name: 'Landinglist',
        data() {
            return {
                project: '',
                ItemClass: '',

                state: '',
                stateList: [
                    {
                        type: '已发布',
                    },
                    {
                        type: '锁定',
                    },
                    {
                        type: '待发布',
                    },
                ],
                starttime: '',

                channels: '',
                channel: '',

                creators: '',
                creator: '',

                keyword: '',

                langlist: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '序号',
                        key: 'luodiyeid',

                    },
                    {
                        title: '落地页名称',
                        key: 'lname'
                    },
                    {
                        title: '项目类型',
                        key: 'classname'
                    },
                    {
                        title: '创建时间',
                        key: 'addtime'
                    },
                    {
                        title: '状态',
                        key: 'lstatus'
                    },
                    {
                        title: '落地页链接',
                        key: 'link'
                    },
                    {
                        title: '投放渠道',
                        key: 'channelname'
                    },
                    {
                        title: '创建人',
                        key: 'username'
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '另存为'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '锁定 '),
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
                                }, '删除 '),
                            ]);
                        }
                    }
                ],
                data: [],
                // 初始化信息总条数
                // 每页显示多少条
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,
            };

        },
        created() {
            var that = this;
            //项目类别
            axios.post(that.GLOBAL.BASE_URL + '/adclass/list', {})
                .then(function (response) {
                    that.ItemClass = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });

            //创建人
            axios.post(that.GLOBAL.BASE_URL + '/adadm/AllList', {})
                .then(function (response) {
                    that.creator = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });

            //所有渠道
            axios.post(that.GLOBAL.BASE_URL + '/adchannel/AllList', {})
                .then(function (response) {
                    that.channel = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });
            //渲染列表
            axios.post(that.GLOBAL.BASE_URL + '/luodiye/luodiyeList', {
                page: that.pageNum,
                rows: that.pageSize
            })
                .then(function (response) {
                    var langlist = response.data.result;
                    //绑定的iview table数据，是一个数组
                    that.data = langlist;
                    that.pageTotal = that.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            //筛选  列表
            screen() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/luodiye/luodiyeList', {
                    addTime: that.starttime,
                    adduserid: that.creators,
                    channelid: that.channels,
                    classId: that.project,
                    lstatus: that.state,
                    page: that.pageNum,
                    rows: that.pageSize
                })
                    .then(function (response) {
                        var langlists = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data = langlists;
                        that.pageTotal = that.data.length;
                    })
                    .catch(function (error) {
                        console.log(error);
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

            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },

            show(index) {
                this.$Modal.info({
                    title: '信息',
                    content: `序号：${this.data1[index].number}<br>落地页名称：${this.data1[index].name}<br>项目类型：${this.data1[index].type}<br>创建时间：${this.data1[index].time}<br>状态：${this.data1[index].state}<br>落地页链接：${this.data1[index].link}<br>投放渠道：${this.data1[index].channel}<br>创建人：${this.data1[index].creator}<br>操作：${this.data1[index].operation}<br>`
                });
            },
            remove(index) {
                this.data1.splice(index, 1);
            },
            exportData(type) {
                if (type === 1) {
                    //用$refs.table获取页面的元素table
                    this.$refs.table.exportCsv({
                        filename: 'data'
                    });
                }
            }
        },
    };
</script>
