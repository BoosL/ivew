<style lang="less" scoped>
    html, body, #app {
        position: relative;
        height: 2400px;
        .tits {
            font-weight: 600;
            margin-left: 60px;
            margin-top: 40px;
        }

        .see {
            position: absolute;
            top: 0;
            right: 60px;
            width: 200px;
            height: 40px;
            background-color: #0065b5;
            border: 1px solid #666;
            text-align: center;
            line-height: 40px;
            color: #ffffff;
            font-size: 22px;
            border-radius: 5px;
        }

        .selected {
            width: 200px;
            height: 30px;
            margin-top: 10px;
            margin-left: 160px;
        }

        .explain {
            position: absolute;
            right: 60px;
            top: 200px;
            color: #666;
        }

        .e-color {
            list-style: none;
            position: absolute;
            top: 260px;
            right: 120px;
        }
        .e-color li {
            width: 120px;
            height: 60px;
            line-height: 55px;
            overflow: hidden;
        }
        .e-color li span {
            display: block;
        }
        .e-color li .legnd-title {
            float: right;
        }
        .e-color li .legnd-block,
        .e-color li .legnd-title {
            display: block;
            width: 60px;
            height: 60px;
            margin-top: 10px;
            float: left;
            text-align: center;
        }
        .e-color li .legnd-block.first {
            background-color: #2f4554;
        }
        .e-color li .legnd-block.second {
            background-color: #61a0a8;
        }
        .e-color li .legnd-block.last {
            background-color: #c23531;
        }
        #myChart {
            position: absolute;
            left: 80px;
            top: 20px;
        }

        .heat-map {
            position: absolute;
            top: 500px;
            width: 100%;
            height: auto;
        }
        #app .heat-map h1[data-v-4473ff7a],
        body .heat-map h1[data-v-4473ff7a],
        html .heat-map h1[data-v-4473ff7a] {
            margin-left: 60px;
        }
        #app .selected[data-v-4473ff7a],
        body .selected[data-v-4473ff7a],
        html .selected[data-v-4473ff7a] {
            margin-left: 60px;
        }
        #app .selecteds[data-v-4473ff7a],
        body .selecteds[data-v-4473ff7a],
        html .selecteds[data-v-4473ff7a] {
            margin-left: 60px;
        }
        .heat-map h1 {
            margin-top: 60px;
        }

        .selecteds {
            width: 200px;
            height: 30px;
            margin-top: 10px;
            margin-left: 200px;
        }

        .LCM {
            position: relative;
            width: 600px;
            height: auto;
            left: 500px;
            top: 0;
            list-style: none;
        }
        .LCM li {
            margin-top: 5px;
            width: 320px;
            height: 320px;
            border: 1px solid #666666;
            text-align: center;
        }
        #myCharts {
            margin-top: 10px;
            margin-left: 10px;
        }

        .swiper-slide img {
            width: 320px;
            height: 320px;
        }

        #button {
            height: 300px;
        }
        #button div {
            float: left;
            margin-left: 20px;
            margin-top: 40px;
            width: 120px;
            height: 30px;
            border: 1px solid #666666;
            text-align: center;
            line-height: 30px;
        }
        #button div:nth-last-child(1) {
            margin-left: 90px;
            width: 160px;
            height: 40px;
            line-height: 40px;
            border-radius: 5px;
            background-color: blue;
            color: #ffffff;
        }
        #app #myChart[data-v-4473ff7a], body #myChart[data-v-4473ff7a], html #myChart[data-v-4473ff7a] {
            top: 90px;
        }

    }
</style>
<template>
    <div id="app">
        <h1 class="tits">广告投放数据汇总</h1>
        <router-link to="/Testproject" class="see">查看数据明细</router-link>
        <Select name="public-choice" v-model="couponSelected" class="selected" @on-change="SelectedC">
            <Option v-for="item in List" :value="item.luodiyeid" :key="item.luodiyeid">{{item.lname}}</Option>
        </Select>
        <!-- <span class="explain">数据说明: 用户点击：停留时常：=大于45s，有效停留</span>-->
        <ul class="e-color">
            <li>
                <span class="legnd-block first"></span>
                <span class="legnd-title">10s内</span>
            </li>
            <li>
                <span class="legnd-block second"></span>
                <span class="legnd-title">15s-20s</span>
            </li>
            <li>
                <span class="legnd-block last"></span>
                <span class="legnd-title">45s以上</span>
            </li>
        </ul>
        <div id="myChart" :style="{width: '500px', height: '500px'}"></div>
        <div class="heat-map">
            <h1>广告投放界面热力图</h1>
            <Select name="public-choice" v-model="couponSelected" class="selecteds">
                <Option v-for="item in List" :value="item.luodiyeid" :key="item.luodiyeid">{{item.lname}}</Option>
            </Select>
            <ul class="LCM">
                <li>
                    <div id="myCharts" :style="{width: '300px', height: '300px'}"></div>
                </li>
                <li>
                    <video-player class="video-player vjs-custom-skin" id="video"
                                  ref="videoPlayer"
                                  :playsinline="true"
                                  :options="playerOptions"
                    ></video-player>
                </li>
                <li>
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide><img src="http://pic1.win4000.com/pic/e/f8/ec0965d3dd.jpg"></swiper-slide>
                        <swiper-slide><img src="http://pic1.win4000.com/pic/e/f8/ec0965d3dd.jpg"></swiper-slide>
                        <swiper-slide><img src="http://pic1.win4000.com/pic/e/f8/ec0965d3dd.jpg"></swiper-slide>
                    </swiper>
                </li>

                <li>
                    <span>文本框</span>
                </li>
                <li id="button">
                    <div>132</div>
                    <div>1221123</div>
                    <br>
                    <div>1231</div>
                    <div>13211</div>
                    <br>
                    <div>提交</div>
                </li>

            </ul>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    require('video.js/dist/video-js.css');
    require('vue-video-player/src/custom-theme.css');

    require('swiper/dist/css/swiper.css');
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');


    export default {
        name: 'Advertising-data',
        data() {
            return {
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
                List: '',
                couponSelected: '',
                bindata: '',
            };
        },
        mounted() {
        },
        created() {
            var that = this;
            // axios.post(that.GLOBAL.Redis_URL + 'luodiyeRedis/countClick', {})
            //     .then(function (res) {
            //         console.log(res);
            //         var list = res.data.result;
            //         //绑定的iview table数据，是一个数组
            //         that.data = list;
            //         that.pageTotal = res.data.result.length;
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

            axios.post(that.GLOBAL.BASE_URL + '/luodiye/list', {})
                .then(function (response) {
                    that.List = response.data.result;
                    that.couponSelected = that.List[0].luodiyeid;
                    that.SelectedC();
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        methods: {
            drawLine() {
                var me = this;
                var data0 = me.bindata;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'));
                let myCharts = echarts.init(document.getElementById('myCharts'));
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            label: {
                                normal: {
                                    formatter: '{d}% {c}人',
                                    textStyle: {
                                        fontWeight: 'normal',
                                        fontSize: 15
                                    }
                                }
                            },
                            data: data0
                        }
                    ],
                });
                var base = +new Date(1968, 9, 3);
                var oneDay = 24 * 3600 * 1000;
                var date = [];
                var data = [Math.random() * 300];
                for (var i = 1; i < 20000; i++) {
                    var now = new Date(base += oneDay);
                    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
                }
                myCharts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },

                    series: [
                        {
                            name: '模拟数据',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(255, 70, 131)'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(255, 158, 68)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(255, 70, 131)'
                                    }])
                                }
                            },
                            data: data
                        }
                    ]
                });
            },
            SelectedC() {
                var me = this;
                axios.post(me.GLOBAL.BASE_URL + '/luodiye/luodiyeRedisInfo', {
                    luodiyeId: me.couponSelected
                })
                    .then(function (response) {
                        var data = [];
                        var item45 = {
                            value: response.data.result.time_45,
                            name: '45s以上'
                        };
                        var item10 = {
                            value: response.data.result.time_10,
                            name: '10s以内'
                        };
                        var item20 = {
                            value: response.data.result.time_20,
                            name: '15s-20s'
                        };
                        data.push(item45);
                        data.push(item10);
                        data.push(item20);
                        me.bindata = data;
                        setTimeout(function () {
                            me.drawLine();
                        }, 2500);
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