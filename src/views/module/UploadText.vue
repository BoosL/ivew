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
            {{num}}
            <Input v-model="UploadText" size="large" style="position: absolute;top: 5px;display: none"/>
            <Input v-model="value" type="textarea" :autosize="{minRows: 10,maxRows: 10}"
                   placeholder="请输入所需要的内容"
                   style="width: 98%;margin-left: 0.5%;border: 1px solid #666;font-size: 16px; position: absolute;top: 50%;transform: translate(0,-50%);"/>
            <ul class="DCMM">
                <li>
                    <Button type="primary" ghost @click="refer">提交</Button>
                </li>
                <li>
                    <Button type="primary" ghost @click="removes">移除</Button>
                </li>
                <li>
                    <Button type="primary" ghost @click="moveup" v-show="this.coms[num].num>0">上移</Button>
                </li>
                <li>
                    <Button type="primary" ghost @click="movedown" v-show="this.coms[num].num<this.coms.length-1">下移</Button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    export default {
        name: 'UploadText',
        props: {
            coms: [Array],
            num: [Number],
            itemIdth: [String],
            callback: [Function]
        },
        data() {
            return {
                value: '',
                remove: true,
                UploadText: this.itemIdth
            };
        },
        created() {
            // console.log(this.coms);
            // console.log(this.itemIdth);
            this.callback(this.UploadText, this.coms, this.clear);
        },
        methods: {
            refer() {
                var that = this;
                axios.post(that.GLOBAL.BASE_URL + '/ldyitems/ldyitemUpdate', {
                    'ldyitemid': that.itemIdth,
                    'ltext': that.value,
                })
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            removes() {
                var that = this;
                that.coms.splice(that.num,1);
                if(that.coms.length<1){
                    that.clear = true;
                }
                that.callback(this.singlePicture, this.coms, this.clear);
            },
            moveup() {
                var that = this;
                var x = that.num;
                var temp = that.coms[x-1];
                Vue.set(that.coms,x-1,that.coms[x]);
                Vue.set(that.coms,x,temp);
                for(var i = 0; i<that.coms.length; i++){
                    that.coms[i].num = i;
                }
            },
            movedown() {
                var that = this;
                var x = that.num;
                var temp = that.coms[x+1];
                Vue.set(that.coms,x+1,that.coms[x]);
                Vue.set(that.coms,x,temp);
                for(var i = 0; i<that.coms.length; i++){
                    that.coms[i].num = i;
                }
            },
        },
    };
</script>