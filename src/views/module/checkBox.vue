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
    <div id="app">
        <div class="model">
            <input type="checkbox" name="img1">
            <input type="checkbox" name="img2">
            <input type="checkbox" name="img3">
            <input type="checkbox" name="img4">
            <!--action="http://172.16.14.137:8080/Poster/ldyitems/ldyitemUpdate"-->
            <ul class="DCMM">
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
        name: 'singlePicture',
        props: {
            coms: [Array],
            num: [Number],
            itemId: [String],
            id: [Number],
            callback: [Function]
        },
        data() {
            return {
                imgOK: false,
                imgShow: false,
                imgerror: false,
                singlePicture: this.itemId,
                ids: this.id,
                comsList: [],
                clear: false,
                oNum : 0
            };
        },
        mounted() {

        },
        created() {
            this.callback(this.singlePicture, this.coms, this.clear);
            this.comsList = this.coms;
        },
        methods: {
            UploadImg(res) {
                this.imgOK = true;
                this.imgerror = false;
                this.imgShow = true;
            },
            UploadImgError(res) {
                this.imgOK = false;
                this.imgerror = true;
            },
            remove(res) {
                this.imgOK = false;
                this.imgShow = false;
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
                console.log(that.coms);
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
        }
    };
</script>