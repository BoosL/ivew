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
            top: 50%;
            transform: translate(0, -50%);
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
            <v-distpicker v-model="citys"
                          style="padding-top: 100px;margin-bottom: 40px;margin-left: 30px"></v-distpicker>
            <div style="margin-left: 20px;margin-top: 40px;position: relative;margin-bottom: 40px;">
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
    import VDistpicker from 'v-distpicker';

    export default {
        name: 'choice',
        props: {
            coms: [Array],
            itemIdf: [String],
            callback: [Function]
        },
        data() {
            return {
                value: '',
                citys: '',
                remove: true,
                choice: this.itemIdf
            };
        },
        created() {
            // console.log(this.coms);
            // console.log(this.itemIdf);
            this.callback(this.choice);
        },
        methods: {
            refer() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/ldyitems/ldyitemUpdate', {
                    'ldyitemid': that.itemIdf,

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
        components: {
            VDistpicker,
        },
    };
</script>