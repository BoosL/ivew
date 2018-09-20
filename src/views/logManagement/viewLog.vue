<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        min-width: 800px;
        overflow: hidden;
        h1 {
            position: absolute;
            left: 3%;
            top: 60px;
        }
        #table {
            margin-left: 8%;
            margin-top: 5%;
            width: 1200px;
        }
        .ivu-page {
            margin-left: 8%;
        }
    }
</style>
<template>
    <div id="app">
        <h1>日志流水表</h1>
        <div style="margin-left: -5%;padding-top: 3%;">
            <i-table highlight-row :columns="columns" :data="data" ref="table" id="table"></i-table>
            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
                  placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'viewLog',
        data() {
            return {
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '操作类型',
                        key: 'optname'
                    },
                    {
                        title: '操作代码',
                        key: 'optcode'
                    },
                    {
                        title: '操作人',
                        key: 'username'
                    },
                    {
                        title: '创建时间',
                        key: 'logtime'
                    },

                ],
                data: [],
                pageTotal: 0,
                pageNum: 1,
                pageSize: 10,
            };
        },
        created() {
            var that = this;
            axios.post(that.GLOBAL.BASE_URL + '/userlog/logList', {
                page: this.pageNum,
                rows: this.pageSize
            })
                .then(function (res) {
                    console.log(res)
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
            remove(index) {
                this.data.splice(index, 1);
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
