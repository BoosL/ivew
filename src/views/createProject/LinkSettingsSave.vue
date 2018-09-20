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
                .previews {
                    position: absolute;
                    top: 0;
                    right: 10%;
                    width: 60px;
                    height: 40px;
                    border: 1px solid #666;
                }
                .preview {
                    position: absolute;
                    top: 0;
                    right: 2%;
                    width: 60px;
                    height: 40px;
                    border: 1px solid #666;
                }
            }
            .luodiname {
                position: absolute;
                top: 120px;
                left: 22%;
                width: 200px;
                height: 30px;
                border: 1px solid #666;
                border-radius: 5px;
                text-align: center;
                line-height: 30px;
            }
            .luodicotent {
                float: right;
                font-size: 14px;
                .ditch, .linkLabel, .remark, .button, .Postlinks {
                    margin-top: 60px;
                }
            }
            .iphone {
                float: left;
                margin-left: 20px;
                margin-top: 40px;
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
                    .LCM{
                        width: 100%;
                        height: 100%;
                    }
                    .LCM li{
                        background-color: #c1c1c1;
                        margin-top: 10px;
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
                    overflow: hidden;
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
                <Button class="previews" @click='preview'>预览</Button>
                <Button class="preview" @click="compile">编辑</Button>
            </div>
            <div class="luodiname">
                <span>{{luodiyenames}}</span>
            </div>
            <div class="luodicotent">
                <div class="ditch">
                    选择落地页发布渠道&nbsp;&nbsp;
                    <Select v-model="ditch" style="width:200px">
                        <Option v-for="item in alllist" :value="item.channelid" :key="item.channelid">
                            {{item.channelname}}
                        </Option>
                    </Select>
                </div>
                <div class="linkLabel">
                    &nbsp; &nbsp;自定义链接标签<br/>
                    <span>{{lianjie}}</span>
                    <Input v-model="linkLabel" placeholder="" value="" style="width: 150px"/>
                </div>
                <div class="remark">
                    落地页备注&nbsp;&nbsp;
                    <Input v-model="value" type="textarea" :autosize="{minRows: 10,maxRows: 10}"
                           placeholder="请输入所需要的内容"/>
                </div>
                <div class="button">
                    <!--<Button type="primary" style="margin-left: 20px;" @click="CtrlShift">另存为</Button>-->
                    <Button type="primary" style="margin-left: 140px;" @click="save">保存</Button>
                    <Button type="primary" style="margin-left: 20px;" @click="issue">发布</Button>
                </div>
                <div class="Postlinks" v-if="open">
                    发布落地页连接
                    <Input v-model="connOpen" style="width: 300px"/>
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
                        <ul class="LCM" v-for='item in luodilist' :key="">
                            <li style="height: 300px;text-align: center;font-size: 22px;line-height: 300px;">{{item.itemclass}}</li>
                            <!--<li>-->
                            <!--<img :src="GLOBAL.Cdn_URL + item.picurl" style="width: 100%;height: 100%">-->
                            <!--</li>-->
                            <!--<li>-->
                            <!--<video-player class="video-player vjs-custom-skin" id="video"-->
                            <!--ref="videoPlayer"-->
                            <!--:playsinline="true"-->
                            <!--:options="playerOptions">-->
                            <!--</video-player>-->
                            <!--</li>-->
                            <!--<li>-->
                            <!--<swiper :options="swiperOption" ref="mySwiper">-->
                            <!--<swiper-slide>-->
                            <!--<img src="http://pic1.win4000.com/pic/e/f8/ec0965d3dd.jpg">-->
                            <!--</swiper-slide>-->
                            <!--</swiper>-->
                            <!--</li>-->

                            <!--<li>-->
                            <!--<span>文本框</span>-->
                            <!--</li>-->
                            <!--<li id="button">-->
                            <!--<div>132</div>-->
                            <!--<div>1221123</div>-->
                            <!--<br>-->
                            <!--<div>1231</div>-->
                            <!--<div>13211</div>-->
                            <!--<br>-->
                            <!--<div>提交</div>-->
                            <!--</li>-->

                        </ul>
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
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    import VideoPlayer from 'vue-video-player';

    require('video.js/dist/video-js.css');
    require('vue-video-player/src/custom-theme.css');


    require('swiper/dist/css/swiper.css');

    export default {
        name: 'LinkSettingsSave',
        data() {
            return {
                ditch: '',
                linkLabel: '',
                value: '',
                luodilist: '',
                alllist: '',
                lianjie: 'http://ligucdn.e2cysd.com/luodiye/page/',
                pnames: '',
                open: false,
                connOpen: '',
                luodiyenames: '',
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: '',
                        src: '' //url地址
                    }],
                    poster: '../../images/logo.png', //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                swiperOption: {
                    loop: true,
                    pagination: '.swiper-pagination',
                    autoplay: true,
                    paginationClickable: true
                },
            };
        },
        created() {
            var that = this;
            axios.post(that.GLOBAL.BASE_URL + '/adchannel/AllList', {})
                .then(function (response) {
                    that.alllist = response.data.result;
                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.post(that.GLOBAL.BASE_URL + '/luodiye/luodiyeInfoById', {
                'luodiyeId': that.$route.params.luodiyeId
            }, {
                withCredentials: true
            })
                .then(function (response) {
                    console.log(response);
                    that.luodilist = response.data.result;
                    // for (var i = 0; i < response.data.result.length; i++) {
                    //     var dataInfo = response.data.result[i];
                    //     if (dataInfo.picurls != null) {
                    //         var arr = dataInfo.picurls.split(',');
                    //     }
                    // }
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
                that.$route.params.luodiyeId;
                that.$route.params.luodiyename;
                that.id = that.$route.params.id;
                that.pnames = that.$route.params.pnames;
                that.luodiyeIds = that.$route.params.luodiyeId;
                that.luodiyenames = that.$route.params.luodiyename;
            },
            //预览
            preview() {
                var that = this;
                window.open(that.GLOBAL.BASE_URL + '/luoOperate/lookLuodiye?luodiyeId=' + that.luodiyeIds);
            },

            //另存为
            CtrlShift() {
                //     var that = this;
                //     axios({
                //         method: 'post',
                //         url: that.GLOBAL.BASE_URL + '/lydlink/issueLink',
                //         data: {
                //             'channelid': that.ditch,
                //             'linkcode': that.linkLabel,
                //             'lnote': that.value,
                //             'link': that.lianjie + that.linkLabel,
                //             'luodiyeid': that.luodiyeIds
                //         },
                //         withCredentials: true
                //     })
                //         .then(function (response) {
                //             console.log(response);
                //         })
                //         .catch(function (error) {
                //             console.log(error);
                //         });
            },

            //发布
            issue() {
                var that = this;
                axios({
                    method: 'post',
                    url: that.GLOBAL.BASE_URL + '/lydlink/issueLink',
                    data: {
                        'channelid': that.ditch,
                        'linkcode': that.linkLabel,
                        'lnote': that.value,
                        'link': that.lianjie + that.linkLabel,
                        'luodiyeid': that.luodiyeIds
                    },
                    withCredentials: true
                })
                    .then(function (response) {
                        if (response.data.e == 1) {
                            that.$Notice.open({
                                title: '发布成功',
                            });
                            that.open = true;
                            that.connOpen = response.data.result.link;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //编辑
            compile() {
                var that = this;
                that.$router.push({name: 'CreateLandingPage'});
            },
            //保存
            save() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/lydlink/add', {
                    'channelid': that.ditch,
                    'linkcode': that.linkLabel,
                    'lnote': that.value,
                    'link': that.lianjie + that.linkLabel
                })
                    .then(function (response) {
                        console.log(response);
                        that.alllist = response.data.result;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components: {
            swiper,
            swiperSlide,
        }
    };
</script>

