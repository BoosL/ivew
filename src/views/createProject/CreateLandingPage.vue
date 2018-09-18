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
                    <li @click="image" ref="image">单图片模块</li>
                    <li @click="video" ref="video">视频模块</li>
                    <li @click="images" ref="images">轮播图模块</li>
                    <li @click="text" ref="text">文本框模块</li>
                    <li @click="chiose" ref="chiose">地区模块</li>
                    <li @click="SubmitForm" ref="SubmitForm">链接模块</li>
                    <li @click="button" ref="button">按钮模块</li>
                    <li @click="requiredFields" ref="requiredFields">必填项模块</li>
                    <li @click="NotMandatory" ref="NotMandatory">非必填项模块</li>
                </ul>
                <Input v-model="ModuleType" size="large" style="display: none"/>
                <div style="margin-top: 280px;position: relative" v-if="Module">
                    <Input v-model="ModuleName" size="large" placeholder="请填写模块名称"
                           style="width:200px;margin-left: 30px"/>
                    <Checkbox v-model="single" @on-change="check"
                              style="position: absolute;top: 10px;left: 80%;width: 60px;">
                        必填项
                    </Checkbox>
                    <Button type="success" @click="ModuleData"
                            style="position: absolute;top: 60px;left: 50%;transform: translate(-50%,0)">提交
                    </Button>
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

    export default {
        name: 'CreateLandingPage',
        data() {
            return {
                single: false,
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
            };
        },
        mounted() {
        },
        created() {
            var that = this;
            if (that.single == true) {
                that.single == '是';
            } else {
                that.single == '否';
            }
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
            check() {
            },
            image() {
                var that = this;
                that.ModuleType = '图片';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#2d8cf0';
                that.$refs.image.style.color = '#fff';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            video() {
                var that = this;
                that.ModuleType = '视频';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#2d8cf0';
                that.$refs.video.style.color = '#fff';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            images() {
                var that = this;
                that.ModuleType = '轮播图';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#2d8cf0';
                that.$refs.images.style.color = '#fff';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            text() {
                var that = this;
                that.ModuleType = '文本';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#2d8cf0';
                that.$refs.text.style.color = '#fff';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            chiose() {
                var that = this;
                that.ModuleType = '表单地区';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#2d8cf0';
                that.$refs.chiose.style.color = '#fff';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            SubmitForm() {
                var that = this;
                that.ModuleType = '链接';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#2d8cf0';
                that.$refs.SubmitForm.style.color = '#fff';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            button() {
                var that = this;
                that.ModuleType = '按钮';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#2d8cf0';
                that.$refs.button.style.color = '#fff';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },
            requiredFields() {
                var that = this;
                that.ModuleType = '必填项';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#2d8cf0';
                that.$refs.requiredFields.style.color = '#fff';

                that.$refs.NotMandatory.style.background = '#fff';
                that.$refs.NotMandatory.style.color = '#000';
            },

            NotMandatory() {
                var that = this;
                that.ModuleType = '非必填项';
                that.Module = true;
                that.ModuleName = '';
                that.single = false;
                that.$refs.image.style.background = '#fff';
                that.$refs.image.style.color = '#000';

                that.$refs.video.style.background = '#fff';
                that.$refs.video.style.color = '#000';

                that.$refs.images.style.background = '#fff';
                that.$refs.images.style.color = '#000';

                that.$refs.text.style.background = '#fff';
                that.$refs.text.style.color = '#000';

                that.$refs.chiose.style.background = '#fff';
                that.$refs.chiose.style.color = '#000';

                that.$refs.SubmitForm.style.background = '#fff';
                that.$refs.SubmitForm.style.color = '#000';

                that.$refs.button.style.background = '#fff';
                that.$refs.button.style.color = '#000';

                that.$refs.requiredFields.style.background = '#fff';
                that.$refs.requiredFields.style.color = '#000';

                that.$refs.NotMandatory.style.background = '#2d8cf0';
                that.$refs.NotMandatory.style.color = '#fff';
            },


            ModuleData() {
                var that = this;
                if (that.single == true) {
                    if (that.single == true) {
                        that.single = '是';
                    } else {
                        that.single = '否';
                    }
                    if (that.ModuleType == '图片') {
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
                                    that.itemId = response.data.result.itemId;
                                    that.coms.push({
                                        component: 'singlePicture',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.itemIds = response.data.result.itemId;
                                    that.coms.push({
                                        component: 'UploadVideo',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'UploadText',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'Chiose',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'SubmitF',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'btns',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'requiredF',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
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
                                    that.coms.push({
                                        component: 'NotM',
                                    });
                                    that.clear = false;
                                    that.callback = function (name) {
                                        that.Idlist.push(name);
                                    };
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                } else {
                    this.$Notice.open({
                        title: '必填项未选中',
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
            },
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
        }
    };
</script>

