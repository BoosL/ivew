<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        .origin {
            margin-top: 40px;
            margin-left: 60px;
        }

        .sort {
            position: absolute;
            left: 60px;
            top: 120px;
        }
        #sell, #name {
            width: 120px;
            height: 20px;
        }

        .proname {
            position: absolute;
            left: 320px;
            top: 120px;
        }

        #screen {
            position: absolute;
            right: 40px;
            top: 40px;
            width: 100px;
            height: 40px;
        }

        #Tabs {
            position: relative;
            top: 160px;
            left: 5%;
            width: 1400px;
            height: auto;
            margin-bottom: 100px;
        }

    }
</style>
<template>
    <div id="app">
        <div class="origin">
            <span>时间</span>
            <DatePicker type="datetime" placeholder="起" style="width: 200px" format="yyyy-MM-dd HH:mm:ss"
                        v-model="startTime"/>
            <DatePicker type="datetime" placeholder="止" style="width: 200px" format="yyyy-MM-dd HH:mm:ss"
                        v-model="endTime"/>
        </div>

        <div class="sort">
            <span>项目类别</span>
            <Select v-model="couponSelected" style="width:200px" name="public-choice" id="selected">
                <Option v-for="item in List" :value="item.classid" :key="item.value">{{item.classname}}</Option>
            </Select>
        </div>
        <div class="proname">
            <span>项目名称</span>
            <Input v-model="name" placeholder="" style="width: 200px"/>
        </div>
        <Button type="info" id="screen" @click="screen">筛选</Button>
        <Tabs :animated="true" id="Tabs">
            <TabPane label="全部">
                <i-table highlight-row :columns="columns" :data="data" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>
                <br/><br/>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
            </TabPane>
            <TabPane label="未完成">
                <i-table highlight-row :columns="columns" :data="data1" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>
                <br/><br/>
                <Page :total="pageTotal1" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePageo" @on-page-size-change='handlePageSizeo'></Page>
            </TabPane>
            <TabPane label="已完成">
                <i-table highlight-row :columns="columns" :data="data2" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>
                <br/><br/>
                <Page :total="pageTotal2" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePaget" @on-page-size-change='handlePageSizet'></Page>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ulitem',
        data() {
            return {
                List: '',
                single: '',
                //项目内容
                startTime: '',
                endTime: '',
                couponSelected: '',
                name: '',
                //分类
                all: '',
                unfinished: '',
                Completed: '',
                //分页
                columns: [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center',
                    },
                    {
                        title: '序号',
                        type: 'index',
                        //key: 'pid',
                        align: 'center',
                    },
                    {
                        title: '项目名称',
                        key: 'pname',
                        align: 'center',
                    },
                    {
                        title: '项目类型',
                        key: 'classname',
                        align: 'center',
                    },
                    {
                        title: '执行周期',
                        key: 'cycleTime',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'pstatus',
                        align: 'center',
                    },
                    {
                        title: '落地页数量',
                        key: 'countLuodiye',
                        align: 'center',
                    },
                    {
                        title: '表单数',
                        key: 'countSubmit',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, row) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.id = row.row.pid;
                                            this.$router.push({
                                                name: 'ProjectSave',
                                                params: {
                                                    id: this.id
                                                }
                                            });
                                        }
                                    }
                                }, '编辑'),
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
                                            this.id = row.row.pid;
                                            localStorage.setItem('id', this.id);
                                            this.$router.push({
                                                name: 'detail',
                                                params: {
                                                    id: this.id
                                                }
                                            });
                                        }
                                    }
                                }, '数据'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            var that = this;
                                            that.id = row.row.pid;
                                            that.pstatus = row.row.pstatus;
                                            var list = that.data;
                                            setTimeout(() => {
                                                axios.post(that.GLOBAL.BASE_URL + '/adproject/lockProject', {
                                                    id: that.id
                                                })
                                                    .then(function (response) {
                                                        if (response.data.e == 1) {
                                                            that.$Notice.open({
                                                                title: '锁定成功',
                                                                top: 300,
                                                                duration: 2,
                                                                onClose: function () {
                                                                    //that.$router.push({path: '/ulitem'});
                                                                    that.getAllData();
                                                                    that.getUnfinishData();
                                                                    that.getFinishData();
                                                                }
                                                            });
                                                        }
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });
                                            }, 3000);
                                        }
                                    }
                                }, '锁定 '),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.id = row.row.pid;
                                            this.pnames = row.row.pname;
                                            this.$router.push({
                                                name: 'CreateLandingPage',
                                                params: {
                                                    id: this.id,
                                                    pnames: this.pnames
                                                }
                                            });
                                        }
                                    }
                                }, '制作落地页')
                            ]);
                        }
                    }
                ],
                data: [],
                data1: [],
                data2: [],
                pageTotal: 0,
                pageTotal1: 0,
                pageTotal2: 0,
                pageNum: 1,
                pageSize: 10,
            };
        },
        created() {
            var that = this;
            that.pid = that.$route.params.pid;
            axios.post(that.GLOBAL.BASE_URL + '/adclass/list', {})
                .then(function (response) {
                    that.List = response.data.result;
                    /*that.couponSelected = that.List[0].classname;*/
                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
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

            axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                pstatus: '未完成',
                page: this.pageNum,
                rows: this.pageSize
            })
                .then(function (res) {
                    var list = res.data.result;
                    //绑定的iview table数据，是一个数组
                    that.data1 = list;
                    that.pageTotal1 = res.data.result.length;
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                pstatus: '完成',
                page: this.pageNum,
                rows: this.pageSize
            })
                .then(function (res) {
                    var list = res.data.result;
                    //绑定的iview table数据，是一个数组
                    that.data2 = list;
                    that.pageTotal2 = res.data.result.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                that.$route.params.pnames;
                that.id = that.$route.params.id;
                that.pnames = that.$route.params.pnames;
            },
            screen() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data = list;
                        that.pageTotal = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                    pstatus: '未完成'
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data1 = list;
                        that.pageTotal1 = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                    pstatus: '完成'
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data2 = list;
                        that.pageTotal2 = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getlist() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
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
            getlisto() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    pstatus: '完成',
                    page: this.pageNum,
                    rows: this.pageSize
                })
                    .then(function (res) {
                        var list = res.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data2 = list;
                        that.pageTotal2 = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getlistt() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
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
            //全选 关闭全选
            // handleSelectAll(status) {
            //     this.$refs.selection.selectAll(status);
            // },
            // 下载数据
            exportData(type) {
                if (type === 1) {
                    //用$refs.table获取页面的元素table
                    this.$refs.table.exportCsv({
                        filename: 'data'
                    });
                }
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

            handlePageo(value) {
                this.pageNum = value;
                this.getlisto();
            },
            handlePageSizeo(value) {
                this.pageSize = value;
                this.getlisto();
            },


            handlePaget(value) {
                this.pageNum = value;
                this.getlistt();
            },
            handlePageSizet(value) {
                this.pageSize = value;
                this.getlistt();
            },
            getAllData() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data = list;
                        that.pageTotal = res.data.result.length;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getUnfinishData() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                    pstatus: '未完成'
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data1 = list;
                        that.pageTotal1 = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getFinishData() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/projectList', {
                    'beginTime': this.startTime,
                    'classId': this.couponSelected,
                    'endTime': this.endTime,
                    'projectName': this.name,
                    page: this.pageNum,
                    rows: this.pageSize,
                    pstatus: '完成'
                })
                    .then(function (response) {
                        var list = response.data.result;
                        //绑定的iview table数据，是一个数组
                        that.data2 = list;
                        that.pageTotal2 = res.data.result.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }


        }
    };
</script>