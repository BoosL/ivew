<style lang="less" scoped>
    html, body, #app {
        height: 100%;
        .index {
            position: relative;
            width: 100%;
            height: 100%;
            .contenttext {
                width: 100%;
                height: auto;
            }
        }
    }
</style>
<template>
    <div id="app">
        <myheader></myheader>
        <div class="layout-content">
            <Row>
                <i-col span="3">
                    <Menu ref="leftMenu" active-name="name" width="auto" :open-names="['1']" @on-select="menuSelect">
                        <MenuItem name="home">
                            <Icon type="home"/>
                            首页
                        </MenuItem>
                        <Submenu name="1-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                创建
                            </template>
                            <MenuItem name="ProjectSave">创建项目</MenuItem>
                            <!--<MenuItem name="CreateLandingPage">创建落地页</MenuItem>-->
                            <!--<MenuItem name="LinkSettingsSave">链接设置及保存</MenuItem>-->
                        </Submenu>
                        <Submenu name="2-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                管理项目
                            </template>
                            <MenuItem name="ulitem">项目列表</MenuItem>
                            <!--<MenuItem name="detail">项目详情页</MenuItem>-->
                            <MenuItem name="Advertising-data">广告投放数据汇总</MenuItem>
                            <!--<MenuItem name="Testproject">项目监测数据详情页</MenuItem>-->
                        </Submenu>
                        <Submenu name="3-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                落地页管理
                            </template>
                            <MenuItem name="Landinglist">落地页列表</MenuItem>
                        </Submenu>
                        <Submenu name="4-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                渠道管理
                            </template>
                            <MenuItem name="PipelineList">渠道列表</MenuItem>
                        </Submenu>
                        <Submenu name="5-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                日志管理
                            </template>
                            <MenuItem name="viewLog">日志查看</MenuItem>
                        </Submenu>
                        <Submenu name="6-1">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="userDetails">用户查看</MenuItem>
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="21" class="contenttext">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </i-col>
            </Row>
            <!--<myfooter></myfooter>-->

        </div>
    </div>
</template>
<script>
    import header from './components/header.vue';
    //import footer from './components/footer.vue';
    import axios from 'axios';

    export default {
        name: 'index',
        data() {
            return {};
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    this.$refs.leftMenu.currentActiveName = val.name;
                },
                deep: true
            }
        },
        created() {
            this.$router.push({name: 'home'});
        },
        methods: {
            menuSelect(name) {
                this.$router.push({name: name});
            }
        },
        components: {
            myheader: header,
            // myfooter: footer,
        },
    };
</script>
