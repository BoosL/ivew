<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        .luodiye {
            width: 80%;
            height: auto;
            margin-left: 10%;
            .h1 {
                position: relative;
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #666;
                h1 {
                    margin-top: 40px;
                    margin-left: 60px;
                }
                .preview, .save {
                    width: 60px;
                    height: 40px;
                    border: 1px solid #666;
                }
                .preview {
                    position: absolute;
                    top: 0;
                    right: 15%;
                }
                .save {
                    position: absolute;
                    top: 0;
                    right: 5%;
                }
            }
            .addbox {
                position: absolute;
                right: 10%;
                top: 200px;
                width: 300px;
                .BgColor{
                    background:rgb(0,143,255);
                    color:#fff;
                }
                h2 {
                    position: absolute;
                    right: 70px;
                    width: 120px;
                    top: -40px;
                }
                .addmodel {
                    position: absolute;
                    right: 70px;
                    top: 20px;
                    list-style: none;
                    width: 200px;
                }
                .addmodel li {
                    width: 90px;
                    height: 40px;
                    border: 1px solid #666;
                    cursor: pointer;
                    float: left;
                    margin-left: 10px;
                    margin-top: 5px;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                }
            }

            .luodiname {
                margin-top: 40px;
                margin-left: 60px;
                font-size: 14px;
            }
            .iphone {
                top: 40px;
                left: 8%;
                box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999, 0 0 30px 0px rgba(0, 0, 0, 0.7);
                border: 5px solid #d9dbdc;
                background: #f8f8f8;
                padding: 15px;
                border-radius: 50px;
                height: auto;
                width: 424px;
                position: relative;
                -webkit-transform: scale(0.8);
                transform: scale(0.8);
                .iphone-top {
                    padding: 5px 110px 40px;
                    position: relative;
                    .speaker {
                        display: block;
                        width: 70px;
                        height: 6px;
                        margin: 0 auto;
                        border-radius: 6px;
                        background: #292728;
                    }
                    .camera {
                        display: block;
                        margin: 0 auto;
                        height: 10px;
                        width: 10px;
                        border-radius: 50%;
                        margin-bottom: 13px;
                        background: #333;
                    }
                    .sensor {
                        display: block;
                        width: 15px;
                        height: 15px;
                        float: left;
                        background: #333;
                        margin-top: -5px;
                        border-radius: 50%;
                    }
                }

                .iphone .top-bar, .iphone .bottom-bar {
                    display: block;
                    width: 423px;
                    height: 15px;
                    border-left: 5px solid #BBB;
                    border-right: 5px solid #BBB;
                    position: absolute;
                    left: -5px;
                }
                .iphone .top-bar {
                    top: 65px;
                }
                .iphone .bottom-bar {
                    bottom: 65px;
                }

                .iphone-screen {
                    background: #fff;
                    border: 1px solid #fff;
                    height: auto;
                    width: 375px;
                    margin: 0 auto;
                    border: 2px solid rgba(0, 0, 0, 0.9);
                    border-radius: 3px;
                    /*overflow: hidden;*/
                    .LCM {
                        list-style: none;
                    }
                    .LCM li {
                        position: relative;
                        height: auto;
                        width: 100%;
                        border-bottom: 1px solid #666;
                    }
                }
                .iphone-screen img {
                    width: 100%;
                }

                .iphone .buttons .on-off, .iphone .buttons .up, .iphone .buttons .down, .iphone .buttons .sleep {
                    display: block;
                    background: #CCC;
                    position: absolute;
                    border-radius: 2px 0px 0px 2px;
                }
                .iphone .buttons .on-off {
                    height: 40px;
                    width: 3px;
                    top: 100px;
                    left: -8px;
                }
                .iphone .buttons .up, .iphone .buttons .down, .iphone .buttons .sleep {
                    height: 60px;
                    width: 5px;
                    left: -10px;
                }
                .iphone .buttons .up {
                    top: 170px;
                }
                .iphone .buttons .down {
                    top: 250px;
                }
                .iphone .buttons .sleep {
                    left: auto;
                    right: -10px;
                    top: 170px;
                    border-radius: 0px 2px 2px 0px;
                }
            }
        }
    }
</style>
<template>
    <div id="app">
        <div class="luodiye">
            <div class="h1">
                <h1>{{pnames}}项目落地页制作</h1>
                <Button class="save" @click='preserve'>保存</Button>
            </div>
            <div class="luodiname">
                落地页名称&nbsp;&nbsp;<Input v-model="luodiyename" placeholder="" style="width: 300px"/>
            </div>
            <div class="addbox">
                <h2>模块功能添加</h2>
                <ul class="addmodel">
                    <li @click="listRender(index)" :class="{ BgColor: changeRed == index}" v-for="(item, index) of btnList" :key="item.index">{{item}}</li>
                </ul>
                <Input v-model="ModuleType" size="large" style="display: none"/>
                <div style="margin-top: 280px;position: relative" v-if="Module">
                    <Input v-model="ModuleName" size="large" placeholder="请填写模块名称"
                           style="width:200px;margin-left: 30px"/>
                    <!--<Checkbox v-model="single" @on-change="check"-->
                              <!--style="position: absolute;top: 10px;left: 80%;width: 60px;">-->
                        <!--必填项-->
                    <!--</Checkbox>-->

                    <Button type="success" @click="ModuleData"
                            style="position: absolute;top: 60px;left: 50%;transform: translate(-50%,0)">提交
                    </Button>
                    <input type="checkbox" name="true">
                </div>
                <div>
                </div>
            </div>
            <div class="iphone">
                <div class="iphone-top">
                    <span class="camera"></span>
                    <span class="sensor"></span>
                    <span class="speaker"></span>
                </div>
                <div class="top-bar"></div>
                <div class="iphone-screen">
                    <div class="heat-map">
                        <ul class="LCM" v-if="clear">
                            <li style="height: 700px"></li>
                        </ul>
                        <component :is="com.component" v-for="com in coms" :key='coms.coms' :coms="coms"
                                   :num="com.num"
                                   :itemId="itemId" :itemIds="itemIds" :itemIdt="itemIdt" :itemIdth="itemIdth"
                                   :itemIdf="itemIdf" :itemIdfi="itemIdfi" :itemIdSIX="itemIdSIX" :itemIdSev="itemIdSev"
                                   :itemIdEig="itemIdEig" :ModuleName="ModuleName" :id="id" :callback="callback">
                        </component>
                    </div>
                    <div class="buttons">
                        <span class="on-off"></span>
                        <span class="sleep"></span>
                        <span class="up"></span>
                        <span class="down"></span>
                    </div>
                    <div class="bottom-bar"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Chiose from '../module/chiose';
    import singlePicture from '../module/singlePicture';
    import Pictures from '../module/pictures';
    import UploadText from '../module/UploadText';
    import UploadVideo from '../module/UploadVideo';
    import btns from '../module/btns';
    import SubmitF from '../module/SubmitForm';
    import requiredF from '../module/requiredFields';
    import NotM from '../module/NotMandatory';
    import Radio from '../module/Radio';
    import checkBox from '../module/checkBox';

    export default {
        name: 'CreateLandingPage',
        data() {
            return {
                luodiyename: '',
                coms: [],
                clear: true,
                ModuleName: '',
                ModuleType: '',
                Module: false,
                itemId: [],  //图片
                itemIds: [],  //视频
                itemIdt: [], //轮播图
                itemIdth: [], //文本
                itemIdf: [], //表单地区
                itemIdfi: [], //按钮
                itemIdSIX: [],  //链接
                itemIdSev: [],  //必填项
                itemIdEig: [],  //非必填项
                singlePicture: '',
                Idlist: [],
                pnames: '',
                id: '',
                num: -1,
                btnList: [
                    '单图片模块'
                    ,'视频模块',
                    '轮播图模块',
                    '文本框模块',
                    '地区模块',
                    '链接模块',
                    '按钮模块',
                    '必填项模块',
                    '非必填项模块',
                    '单选模块'
                ],
                list: [
                    '图片',
                    '视频',
                    '轮播图',
                    '文本',
                    '表单地区',
                    '链接',
                    '按钮',
                    '必填项',
                    '非必填项',
                    '单选'
                ],
                listIndex: 0,
                changeRed: -1
            };
        },
        mounted() {
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
                that.$route.params.pnames;
                that.id = that.$route.params.id;
                that.pnames = that.$route.params.pnames;
            },
            listRender(index) {
                var that = this;
                that.listIndex = index;
                that.ModuleType = that.list[index];
                that.changeRed = that.listIndex;
                that.Module = true;
                that.ModuleName = '';
            },
            ModuleData() {
                var that = this;
                    if (that.ModuleType == '图片') {
                        console.log(1);
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
//                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                console.log(1);
                                if (response.data.e == 1) {
                                    console.log(2);
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.itemId = response.data.result.itemId;
                                    that.coms.push({
                                        component: 'singlePicture',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '视频') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.itemIds = response.data.result.itemId;

                                    that.coms.push({
                                        component: 'UploadVideo',
                                        num: that.num
                                    });

                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms = result;
                                        that.clear = y;
                                    };

                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '轮播图') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                that.itemIdt = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    that.coms.push({
                                        component: 'Pictures',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '文本') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                that.itemIdth = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'UploadText',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '表单地区') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                that.itemIdf = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'Chiose',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '链接') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                console.log(response);
                                that.itemIdSIX = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'SubmitF',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    if (that.ModuleType == '按钮') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                console.log(response);
                                that.itemIdfi = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'btns',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    //暂无字段
                    if (that.ModuleType == '必填项') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                that.itemIdSev = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'requiredF',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    //暂无字段
                    if (that.ModuleType == '非必填项') {
                        axios({
                            method: 'post',
                            url: that.GLOBAL.BASE_URL + '/ldyitems/add',
                            data: {
                                'itemclass': that.ModuleType,
                                'ltitle': that.ModuleName,
                                'ismust': that.single,
                            },
                            withCredentials: true
                        })
                            .then(function (response) {
                                that.itemIdEig = response.data.result.itemId;
                                if (response.data.e == 1) {
                                    if(that.coms.length==0){
                                        that.num=-1;
                                        that.num++;
                                    }else{
                                        that.num=that.coms.length-1;
                                        that.num++;
                                    }
                                    that.coms.push({
                                        component: 'NotM',
                                        num: that.num
                                    });
                                    that.clear = false;
                                    that.callback = function (name,x ,y) {
                                        that.Idlist.push(name);
                                        var result = x;
                                        for(var i=0;i < result.length;i++){
                                            result[i].num = i;
                                        }
                                        that.coms=result;
                                        that.clear = y;
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
            },
            //保存
            preserve() {
                var that = this;
                var isStr = that.Idlist.join(',');
                axios({
                    method: 'post',
                    url: that.GLOBAL.BASE_URL + '/luodiye/addLuodiye',
                    data: {
                        'lname': that.luodiyename,
                        'items': isStr,
                        'pid': that.id,
                    },
                    withCredentials: true
                })
                    .then(function (response) {
                        if (response.data.e == 1) {
                            that.luodiyeId = response.data.result.luodiyeId;
                            that.$router.push({
                                name: 'LinkSettingsSave',
                                params: {
                                    id: that.id,
                                    pnames: that.pnames,
                                    luodiyeId: that.luodiyeId,
                                    luodiyename: that.luodiyename,
                                }
                            });

                        } else {
                            that.$Notice.open({
                                title: '请添加模块及填写项目名称',
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components: {
            Chiose,
            singlePicture,
            Pictures,
            UploadText,
            UploadVideo,
            btns,
            SubmitF,
            requiredF,
            NotM,
            Radio,
            checkBox
        },

    };
</script>

