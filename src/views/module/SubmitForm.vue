<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        .model {
            position: relative;
            height: 400px;
            background-color: #c1c1c1;
            margin-top: 10px;
        }
        .DCMM {
            position: relative;
            top: 100px;
            left: 400px;
            list-style: none;
            width: 60px;
            z-index: 99;
        }
        .DCMM li {
            margin-top: 20px;
            font-size: 14px;
        }
    }
</style>
<template>
    <div id="app" v-if="remove">
        <div class="model">
            <Input v-model="choice" size="large" style="position: absolute;top: 5px;display: none"/>
            <div style="margin-left: 20px;margin-top: 40px;position: relative;margin-bottom: 40px; text-align: center">
                <div style="position: absolute;top: 100px;left: 20px;">
                    <span style="margin-top: 20px;margin-left: 30px">可添加跳转——链接\电话,文案可修改</span>
                    <div style="margin-top: 60px;">
                        链接地址&nbsp;&nbsp;<Input v-model="url" size="large" placeholder="" style="width: 200px;"/>
                    </div>
                    <div style="margin-top: 60px">
                        按钮文本&nbsp;&nbsp;<Input v-model="ltext" size="large" placeholder="" style="width: 200px;"/>
                    </div>
                </div>
                <ul class="DCMM">
                    <li>
                        <Button type="primary" ghost @click="refer">提交</Button>
                    </li>
                    <li>
                        <Button type="primary" ghost @click="removes">移除</Button>
                    </li>
                    <li>
                        <Button type="primary" ghost @click="">上移</Button>
                    </li>
                    <li>
                        <Button type="primary" ghost @click="">下移</Button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'SubmitForm',
        props: {
            choice: '',
            coms: [Array],
            itemIdSIX: [String],
            callback: [Function]
        },
        data() {
            return {
                value: '',
                citys: '',
                remove: true,
                URL: this.itemIdSIX,
                url: '',
                ltext: '',
            };
        },
        created() {
            // console.log(this.coms);
            // console.log(this.itemIdSIX);
            this.callback(this.URL);
        },
        methods: {
            refer() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/ldyitems/ldyitemUpdate', {
                    'ldyitemid': that.itemIdSIX,
                    'url': that.url,
                    'ltext': that.ltext,

                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            removes() {
                // this.remove = false;
            },
        },
    };
</script>