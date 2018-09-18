<style lang="less" scoped>
    html, body, #app {
        height: 100%;
    }

    .establish {
        position: relative;
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 300px;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: 26px;
        font-weight: 600;
        margin-left: 20px;
        margin-top: 20px;
        color: #000;
    }

    .Fill {
        width: 100%;
        height: 100%;
        margin-top: 40px;
    }

    .Fill input {
        width: 100%;
        height: 40px;
        margin-top: 20px;
        outline: none;
    }

    #startTime, #endTime {
        margin-top: 20px;
    }

    #selected {
        width: 98%;
        height: 40px;
        margin-top: 20px;
    }

    #save, #makeing {
        width: 100px;
        height: 40px;
        outline: none;
        cursor: pointer;
        margin-top: 20px;
    }

    #save {
        margin-left: 100px;
    }
</style>
<template>
    <div id="app">
        <div class="establish">
            <span class="title">创建项目</span>
            <div class="Fill">
                <Input v-model="name" placeholder="项目名称" style="width: 300px"/>
                <DatePicker type="datetime" placeholder="项目开始时间" format="yyyy-MM-dd HH:mm:ss" style="width: 300px"
                            v-model="startTime" id="startTime"/>
                <DatePicker type="datetime" placeholder="项目结束时间" format="yyyy-MM-dd HH:mm:ss" style="width: 300px"
                            v-model="endTime" id="endTime"/>
                <Select name="public-choice" v-model="couponSelected" id="selected">
                    <Option v-for="item in List" :value="item.classid" :key="item.classid">{{item.classname}}</Option>
                </Select>
                <Input v-model="explain" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="项目说明"/>
                <Button type="primary" @click="save" id="save">保存</Button>
                <!--<Button type="primary" @click="makeland" id="makeing">制作落地页</Button>-->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ProjectSave',
        data() {
            return {
                List: '',
                couponSelected: '',
                name: '',
                startTime: '',
                endTime: '',
                explain: '',
                id: ''
            };
        },

        created() {
            var that = this;
            axios.post(that.GLOBAL.BASE_URL + '/adclass/list', {})
                .then(function (response) {
                    that.List = response.data.result;
                    //that.couponSelected = that.List[0].classname;
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
                that.id = that.$route.params.id;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/getInfoById', {
                    'id': that.id
                }, {
                    withCredentials: true
                })
                    .then(function (response) {
                        var model = response.data.result;
                        that.name = model.pname;
                        that.explain = model.pnote;
                        that.couponSelected = model.classid;
                        that.startTime = new Date(model.begintime);
                        that.endTime = new Date(model.endtime);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            save() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/adproject/add', {
                    'begintime': this.startTime,
                    'classid': this.couponSelected,
                    'endtime': this.endTime,
                    'pname': this.name,
                    'pnote': this.explain,
                }, {
                    withCredentials: true
                })
                    .then(function (response) {
                        console.log(response);
                        if (response.data.e == 1) {
                            that.pid = response.data.result.pid;
                            that.$Notice.open({
                                title: '添加项目成功',
                                top: 300,
                                duration: 2,
                                onClose: function () {
                                    that.$router.push({
                                        name: 'ulitem',
                                        params: {
                                            pid: that.pid,
                                        }
                                    });
                                    that.startTime = '';
                                    that.couponSelected = '';
                                    that.endTime = '';
                                    that.name = '';
                                    that.explain = '';
                                }
                            });
                        } else {
                            that.$Notice.open({
                                title: '添加项目失败，请重新填写',
                                top: 300,
                                duration: 2,
                                onClose: function () {
                                    that.startTime = '';
                                    that.couponSelected = '';
                                    that.endTime = '';
                                    that.name = '';
                                    that.explain = '';
                                }
                            });
                            return;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            makeland() {
                let self = this;
                self.$router.push({path: '/CreateLandingPage'});
            },

        }
    };

</script>

