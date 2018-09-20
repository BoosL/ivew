<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        .origin {
        	display: inline-block;
            margin-top: 40px;
            margin-left: 30px;
        }

        .sort {
        	display: inline-block;
            /*position: absolute;
            left: 60px;
            top: 120px;*/
        }
        #sell, #name {
            width: 120px;
            height: 20px;
        }

        .proname {
        	display: inline-block;
            /*position: absolute;
            left: 320px;
            top: 120px;*/
        }

        #screen {
            width: 80px;
		    height: 30px;
		    margin-left: 10px;
        }
		.list-table{
			position: relative;
			width: 100%;
		    top: 30px;
			padding-left: 30px;
		    padding-right: 30px;
		   /* width: 1400px;*/
		    height: auto;
		    margin-bottom: 100px;
		}
        #Tabs {
            position: relative;
		    /*top: 100px;
		    left: 60px;*/
		   /* width: 1400px;*/
		    width: 100%;
		    height: auto;
		    margin-bottom: 100px;
        }
		
    }
</style>
<template>
    <div id="app">
        <div class="origin">
            <span>时间</span>
            <DatePicker type="datetime" placeholder="起" style="width: 152px" format="yyyy-MM-dd HH:mm:ss"
                        v-model="startTime"/>
            <DatePicker type="datetime" placeholder="止" style="width: 152px" format="yyyy-MM-dd HH:mm:ss"
                        v-model="endTime"/>
        </div>

        <div class="sort">
            <span>项目类别</span>
            <Select v-model="couponSelected" style="width:152px" name="public-choice" id="selected">
                <Option v-for="item in List" :value="item.classid" :key="item.value">{{item.classname}}</Option>
            </Select>
        </div>
        <div class="proname">
            <span>项目名称</span>
            <Input v-model="name" placeholder="" style="width: 152px"/>
        </div>
        <Button type="info" id="screen" @click="screen">筛选</Button>
        <div class="list-table">
        	<Tabs :animated="true" id="Tabs">
            <TabPane label="全部">
                <i-table highlight-row :columns="columns" :data="data" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <!--<Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>-->
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
            </TabPane>
            <TabPane label="未完成">
                <i-table highlight-row :columns="columns" :data="data1" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <!--<Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>-->
                <Page :total="pageTotal1" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePageo" @on-page-size-change='handlePageSizeo'></Page>
            </TabPane>
            <TabPane label="已完成">
                <i-table highlight-row :columns="columns" :data="data2" ref="table"></i-table>
                <br/>
                <!--<Button @click="handleSelectAll(true)">全选</Button>-->
                <!--<Button @click="handleSelectAll(false)">取消全选</Button>-->
                <!--<Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>-->
                <Page :total="pageTotal2" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePaget" @on-page-size-change='handlePageSizet'></Page>
            </TabPane>
        </Tabs>
    	</div>
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
//                  {
//                      type: 'selection',
//                      width: 30,
//                      align: 'center',
//                  },
//                  {
//                      title: '序号',
//                      type: 'index',
//                      //key: 'pid',
//                      align: 'center',
//                  },
                    {
                        title: '项目名称',
                        key: 'pname',
                        align: 'center',
                        width: 160
                    },
                    {
                        title: '项目类型',
                        key: 'classname',
                        align: 'center',
                        width: 120
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
                        width: 100
                    },
                    {
                        title: '落地页数量',
                        key: 'countLuodiye',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '表单数',
                        key: 'countSubmit',
                        align: 'center',
                        width: 100
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
                                    style: {
                                        marginRight: '5px'
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
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:(row.row.pstatus=="完成")?"none":"inline-block",                                       
                                    },
                                    on: {
                                        click: () => {
                                            var that = this;
                                            that.id = row.row.pid;
                                            that.pstatus = row.row.pstatus;
                                            var list = that.data;
//                                          setTimeout(() => {
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
                                                        }else{
                                                        	that.$Notice.open({
                                                                title: '锁定失败',
                                                                top: 300,
                                                                duration: 2,
                                                     			onClose: function () {
                                                                   console.log(row.row)
                                                                }
                                                            });
                                                        }
                                                        
                                                    })
                                                    .catch(function (error) {
														 
                                                        console.log(error);
                                                    });
//                                          }, 3000);
                                        }
                                    }
                                }, '锁定 '),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:(row.row.pstatus=="未完成")?"none":"inline-block",                                       
                                    },
                                    on: {
                                        click: () => {
                                            var that = this;
                                            that.id = row.row.pid;
                                            that.pstatus = row.row.pstatus;
                                            var list = that.data;
//                                          setTimeout(() => {
                                                axios.post(that.GLOBAL.BASE_URL + '/adproject/lockProject', {
                                                    id: that.id
                                                })
                                                    .then(function (response) {
                                                        if (response.data.e == 1) {
                                                            that.$Notice.open({
                                                                title: '解锁成功',
                                                                top: 300,
                                                                duration: 2,
                                                                onClose: function () {
                                                                    //that.$router.push({path: '/ulitem'});
                                                                    that.getAllData();
                                                                    that.getUnfinishData();
                                                                    that.getFinishData();      
                                                                }
                                                            });
                                                        }else{
                                                        	that.$Notice.open({
                                                                title: '解锁失败',
                                                                top: 300,
                                                                duration: 2
                                                            });
                                                        }
                                                        
                                                    })
                                                    .catch(function (error) {
														 
                                                        console.log(error);
                                                    });
//                                          }, 3000);
                                        }
                                    }
                                }, '解锁 '),
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
            console.log(that.pid )
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
                    that.pageTotal = res.data.total;
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
                    that.pageTotal1 = res.data.total;
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
                    that.pageTotal2 = res.data.total;
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
                    that.pageTotal = res.data.total;
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
                    that.pageTotal1 = res.data.total;
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
                    that.pageTotal2 = res.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
                
                
                
                
                
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
                        that.pageTotal = res.data.total;
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
                        that.pageTotal2 =  res.data.total;
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
                        that.pageTotal =  res.data.total;
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
            	//console.info("当前页码："+value)
                this.pageNum = value;
                this.getlist();
            },
            handlePageSize(value) {
            	//console.info("每页显示条数："+value)
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