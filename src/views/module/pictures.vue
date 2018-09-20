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
        {{num}}
        <Input v-model="pictures" size="large" style="position: absolute;top: 5px;display: none"/>
        <div class="model">
            <span style="position: absolute;left: 50%;transform: translate(-50%,0);top: 50px;font-size: 30px;font-weight: 600;color: #ff0000;"
                  v-if="imgOK">图片上传成功</span>
            <span style="position: absolute;left: 50%;transform: translate(-50%,0);top: 50px;font-size: 30px;font-weight: 600;color: #ff0000;"
                  v-if="imgerror">上传失败，请重新上传图片</span>
            <!--action="http://172.16.14.137:8080/Poster/ldyitems/ldyitemUpdate"-->
            <Upload
                    action="http://139.159.142.120:80/Poster/ldyitems/ldyitemUpdate"
                    accept="image"
                    :max-size="10240"
                    :format="['jpg','jpeg','png']"
                    name='files'
                    :data="{
                        'ldyitemid': pictures,
                        'pid':ids
                    }"
                    :on-success="UploadImg"
                    :on-format-error="UploadImgError"
                    style="position: absolute;left: 50%;transform: translate(-50%,0);top: 50%;">
                <Button type="primary" icon="ios-cloud-upload-outline">
                    上传轮播图图片
                </Button>
            </Upload>
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
        name: 'pictures',
        props: {
            coms: [Array],
            num: [Number],
            itemIdt: [String],
            id: [Number],
            callback: [Function]
        },
        data() {
            return {
                imgOK: false,
                imgerror: false,
                remove: true,
                pictures: this.itemIdt,
                ids: this.id
            };
        },
        created() {
            // console.log(this.coms);
            // console.log(this.itemIdt);
            this.callback(this.pictures, this.coms, this.clear);
        },
        methods: {
            UploadImg(res) {
                this.imgOK = true;
                this.imgerror = false;
            },
            UploadImgError(res) {
                this.imgOK = false;
                this.imgerror = true;
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
