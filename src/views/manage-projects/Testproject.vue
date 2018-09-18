<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        h1 {
            position: relative;
            left: 60px;
            top: 20px;
            width: 200px;
        }

        .position {
            position: absolute;
            right: 280px;
            top: 80px;
            margin-left: 10px;
        }

        .link {
            position: absolute;
            left: 70px;
            top: 160px;
            margin-left: 10px;
        }

        .channel {
            position: absolute;
            right: 280px;
            top: 140px;
            margin-left: 10px;
        }

        #sell, #name, #junp, #access, #throw {
            width: 120px;
            height: 20px;
        }

        .box {
            width: 800px;
            height: auto;
            margin-top: 40px;
        }

        .box {
            width: 800px;
            height: auto;
            padding-top: 40px;
        }

        #all {
            margin-top: 40px;
            margin-left: 40px;
        }

        #download {
            margin-top: 40px;
            margin-left: 60px;
        }

        .origin {
            margin-top: 40px;
            margin-left: 80px;
        }

        .sort {
            position: absolute;
            left: 80px;
            top: 120px;
        }

        .proname {
            position: absolute;
            left: 320px;
            top: 120px;
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

        .box {
            width: 800px;
            height: auto;
            margin-top: 40px;
        }

        #Tabs {
            position: relative;
            top: 200px;
            left: 10%;
            width: 80%;
            height: auto;

        }

        .Costing {
            position: fixed;
            width: 600px;
            height: 400px;
            border: 1px solid #cccccc;
            left: 30%;
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
                    top: 5px;
                }
                #sellt {
                    width: 120px;
                    height: 20px;
                }
            }

            .accesslink {
                position: absolute;
                left: 350px;
                top: 160px;
                span {
                    position: absolute;
                    left: -60px;
                    top: 5px;
                }
                #link {
                    width: 120px;
                    height: 20px;
                }
            }

            .onchannel {
                position: absolute;
                right: 30px;
                top: 240px;
                span {
                    position: absolute;
                    left: -60px;
                    top: 5px;
                }
                #channel {
                    width: 120px;
                    height: 20px;
                }
            }
            .quantity {
                position: absolute;
                top: 310px;
                list-style: none;
                right: 160px;
            }
            .quantity li {
                float: left;
                margin-left: 40px;
            }

            .amount {
                position: absolute;
                left: 20px;
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

            #chioce {
                position: absolute;
                right: 20px;
                bottom: 65px;
                width: 60px;
                height: 30px;
            }

            .cost {
                position: absolute;
                left: 20px;
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
        .listpage {
            list-style: none;
            position: absolute;
            top: 240px;
            left: 200px;
        }
        .listpage li {
            float: left;
            margin-left: 20px;
        }

    }
</style>
<template>
    <div id="app">
        <h1>项目监测数据</h1>
        <div class="origin">
            <span>时间</span>
            <DatePicker type="date" placeholder="起" style="width: 200px" v-model="startTime"/>
            <DatePicker type="date" placeholder="止" style="width: 200px" v-model="endTime"/>

        </div>
        <div class="proname">
            <span>项目</span>
            <i-select style="width:200px" v-model="couponSelected">
                <i-option v-for="item in pname" :value="item.pid" :key="item.value">{{item.pname}}</i-option>
            </i-select>
        </div>
        <div class="link">
            <span>访问链接</span>
            <i-select v-model="model" style="width:200px">
                <i-option v-for="item in link" :value="item.ldylinkid" :key="item.value">{{ item.link }}</i-option>
            </i-select>
        </div>
        <div class="channel">
            <span>投放渠道</span>
            <i-select v-model="channelid" style="width:200px">
                <i-option v-for="item in channelname" :value="item.channelid" :key="item.value">
                    {{item.channelname}}
                </i-option>
            </i-select>
        </div>
        <div class="position">
            <span>跳出位置</span>
            <i-select v-model="modelt" style="width:200px">
                <i-option v-for="item in pnote" :value="item.pnote" :key="item.value">{{ item.pnote }}</i-option>
            </i-select>
        </div>
        <div class="sort">
            <span>关键字</span>
            <Input v-model="value" placeholder="请输入关键字" style="width: 180px" id="name"/>
        </div>
        <ul class="listpage">
            <li>pv: {{pvCount}}</li>
            <li>ip: {{ipCount}}</li>
            <li>uv: {{uvCount}}</li>
            <li>表单数: {{subCount}}</li>
        </ul>
        <Button type="info" id="screen" @click='screen'>筛选</Button>
        <Button type="info" id="Dcostcalculation" @click="show">每日成本计算</Button>


        <Tabs :animated="true" id="Tabs">
            <TabPane label="访问量">
                <i-table highlight-row :columns="columns" :data="data" ref="table"></i-table>
                <Button @click="handleSelectAll(true)">全选</Button>
                <Button @click="handleSelectAll(false)">取消全选</Button>
                <Button type="primary" size="large" @click="exportData(1)">
                    数据下载
                </Button>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                      placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
            </TabPane>
            <TabPane label="已填表单">
                <!--<table border="1" cellpadding="0" cellspacing="0">-->
                <!--<tr>-->
                <!--<th v-for="item in channelname">{{item.channelname}}</th>-->
                <!--</tr>-->
                <!--<tr v-for="item in channelname">-->
                <!--<th v-for="item in channelname">{{item.channelname}}</th>-->
                <!--</tr>-->
                <!--</table>-->
            </TabPane>
        </Tabs>


        <div class="Costing" v-if="onoff">
            <span @click="close">关闭</span>
            <h2>成本计算</h2>
            <div class="Costingt">
                <span>时间</span>
                <DatePicker v-model="countstart" type="date" placeholder="起" style="width: 200px"></DatePicker>
                <DatePicker v-model="countend" type="date" placeholder="止" style="width: 200px"></DatePicker>
            </div>
            <div class="pronamet">
                <span>项目</span>
                <i-select v-model="project" style="width:200px">
                    <i-option v-for="item in pname" :value="item.pid" :key="item.value">{{item.pname}}</i-option>
                </i-select>
            </div>
            <div class="accesslink">
                <span>访问链接</span>
                <i-select v-model="ldylinkid" style="width:200px">
                    <i-option v-for="item in link" :value="item.ldylinkid" :key="item.value">{{ item.link }}</i-option>
                </i-select>
            </div>
            <div class="onchannel">
                <span>投放渠道</span>
                <i-select v-model="channelid" style="width:200px">
                    <i-option v-for="item in channelname" :value="item.channelid" :key="item.value">
                        {{item.channelname}}
                    </i-option>
                </i-select>
            </div>
            <Button type="success" size="large" id="chioce" @click="chioce">
                筛选
            </Button>
            <ul class="quantity">
                <li>pv: {{pvCounts}}</li>
                <li>ip: {{ipCounts}}</li>
                <li>uv: {{uvCounts}}</li>
                <li>表单数: {{subCounts}}</li>
            </ul>
            <div class="amount">
                <span>投放金额</span>
                <Input v-model="sum" placeholder="请输入关键字" style="width: 180px" id="amounts"/>
            </div>
            <div class="cost">
                <span>投放成本:&nbsp;&nbsp; {{cost}}元/个</span>
            </div>
            <Button type="success" size="large" id="calculate" @click="count">
                计算成本
            </Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Testproject',
        data() {
            return {
                List: '',
                onoff: false,
                startTime: '',
                endTime: '',
                value: '',
                couponSelected: '',
                pname: '',
                pnote: '',
                model: '',
                link: '',
                modelo: '',
                channelname: '',
                modelt: '',
                countstart: '',
                countend: '',
                project: '',
                ldylinkid: '',
                channelid: '',
                sum: '',
                name: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户id',
                        key: 'id',
                        align: 'center',
                    },
                    {
                        title: '访问链接',
                        key: 'linkName',
                        align: 'center',
                    },
                    {
                        title: '投放渠道',
                        key: 'className',
                        align: 'center',
                    },
                    {
                        title: '访问时间',
                        key: 'comeDate',
                        align: 'center',
                    },
                    {
                        title: '跳出位置',
                        key: 'jumpAddr',
                        align: 'center',
                    },
                    {
                        title: '最常停留位置',
                        key: 'stopAddr',
                        align: 'center',
                    },
                    {
                        title: '停留时长',
                        key: 'stopTime',
                        align: 'center',
                    },
                    {
                        title: '是否填写信息',
                        key: 'isSub',
                        align: 'center',
                    },
                ],
                data: [],
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,
                pvCount: '',
                ipCount: '',
                subCount: '',
                uvCount: '',
                //每日计算
                cost: '',
                number: 0,
                pvCounts: '',
                ipCounts: '',
                subCounts: '',
                uvCounts: '',
            };
        },
        created() {
            var that = this;
            //pv ip sub uv
            axios.post(that.GLOBAL.BASE_URL + '/adproject/redisData', {})
                .then(function (response) {
                    that.pvCount = response.data.result.pvCount;
                    that.ipCount = response.data.result.ipCount;
                    that.subCount = response.data.result.subCount;
                    that.uvCount = response.data.result.uvCount;
                })
                .catch(function (error) {
                    console.log(error);
                });

            //所有渠道
            axios.post(that.GLOBAL.BASE_URL + '/adchannel/AllList', {})
                .then(function (response) {
                    console.log(response)
                    that.channelname = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });

            //所有链接
            axios.post(that.GLOBAL.BASE_URL + '/lydlink/AllList', {})
                .then(function (response) {
                    that.link = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });
            //项目接口
            axios.post(that.GLOBAL.BASE_URL + '/adproject/AllList', {})
                .then(function (response) {
                    that.pname = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });
            //分页
            axios.post(that.GLOBAL.Rdies_URL + '/userRedis/userList', {
                number: this.pageSize,
            })
                .then(function (res) {
                    var list = res.data;
                    //绑定的iview table数据，是一个数组
                    that.data = list;
                    that.pageTotal = that.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            //page
            screen() {
                var that = this;
                axios.post(that.GLOBAL.Rdies_URL + '/userRedis/userList', {
                    'begintime': this.startTime,
                    'classid': this.couponSelected,
                    'endtime': this.endTime,
                    'model': this.model,
                    'channelid': this.channelid,
                    'modelt': this.modelt,
                    'value': this.value,
                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            show() {
                this.onoff = true;
            },
            close() {
                this.onoff = false;
            },
            getlist() {
                var that = this;
                axios.post(that.GLOBAL.Rdies_URL + '/userRedis/userList', {
                    number: this.pageSize,
                })
                    .then(function (res) {
                        console.log(res.data);
                        var list = res.data;
                        //绑定的iview table数据，是一个数组
                        that.data = list;
                        that.pageTotal = that.data.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //全选 关闭全选
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            // handleSelectAllo(status) {
            //     this.$refs.selection.selectAll(status);
            // },
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


            //弹出框
            chioce() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/costCalculate/lookCompute', {
                    'beginTime': that.countstart,
                    'endTime': that.countend,
                    'pId': that.project * 1,
                    'linkId': that.ldylinkid * 1,
                    'channelId': that.channelid * 1,
                })
                    .then(function (response) {
                        if (response.data.e == 0) {
                            axios.post(that.GLOBAL.BASE_URL + '/adproject/redisData', {
                                'beginTime': that.countstart,
                                'endTime': that.countend,
                                'pId': that.project,
                                'linkId': that.ldylinkid,
                                'channelId': that.channelid
                            })
                                .then(function (response) {
                                    that.ipCounts = response.data.result.ipCount;
                                    that.pvCounts = response.data.result.pvCount;
                                    that.subCounts = response.data.result.subCount;
                                    that.uvCounts = response.data.result.uvCount;
                                    if (that.subCounts == 0) {
                                        that.sum = that.sum;
                                        that.cost = 0;
                                    } else {
                                        that.sum = that.sum;
                                        that.cost = that.sum / that.subCounts;
                                    }
                                    if (that.ipCounts == null && that.pvCounts == null && that.uvCounts == null) {
                                        that.ipCounts = that.number;
                                        that.pvCounts = that.number;
                                        that.uvCounts = that.number;
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        } else {
                            that.ipCounts = response.data.result.ipcount;
                            that.pvCounts = response.data.result.pvcount;
                            that.subCounts = response.data.result.subcount;
                            that.uvCounts = response.data.result.uvcount;
                            that.sum = response.data.result.sum;
                            that.cost = that.sum / that.subCounts;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            count() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/costCalculate/compute', {
                    'beginTime': that.countstart,
                    'channelId': that.channelid,
                    'cost': that.cost,
                    'endTime': that.countend,
                    'ipCount': that.ipCounts,
                    'linkId': that.ldylinkid,
                    'pId': that.project,
                    'pvCount': that.pvCounts,
                    'subCount': that.subCounts,
                    'sum': that.sum,
                    'uvCount': that.uvCounts,
                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    };
</script>
