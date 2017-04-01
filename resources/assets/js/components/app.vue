<template>
    <div class="v-contracts-app">
        <Row class="layout">
            <div class="layout-nav">
                <Menu :theme="theme2" :open-names="['3']" active-name="3-2" accordion>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            合同
                        </template>
                        <router-link to="/contracts">
                            <Menu-item name="1-1">合同</Menu-item>
                        </router-link>
                        <router-link to="/discusses">
                            <Menu-item name="1-2">讨论记录</Menu-item>
                        </router-link>
                        <Menu-item name="1-3">举报管理</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </template>
                        <Menu-item name="2-1">新增用户</Menu-item>
                        <Menu-item name="2-2">活跃用户</Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            客服模块
                        </template>
                        <!--<Menu-group title="服务">-->
                            <router-link to="/customers">
                                <Menu-item name="3-1">客户总览</Menu-item>
                            </router-link>
                            <router-link to="/customer2s">
                                <Menu-item name="3-2">联系人总览</Menu-item>
                            </router-link>
                            <router-link to="/contracts">
                                <Menu-item name="3-3">合同总览</Menu-item>
                            </router-link>
                            <router-link to="/services">
                                <Menu-item name="3-4">服务单总览</Menu-item>
                            </router-link>
                        <!--</Menu-group>-->
                    </Submenu>
                </Menu>
            </div>
            <div class="layout-right">
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <transition name="foo">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </Row>

    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
a
    color:#657180
.v-contracts-app
    .layout
        display:flex
        .layout-nav
            flex 0 0 240px
            width 240px
        .layout-right
            flex 1
            margin -5px 0
            padding 0 15px
            .layout-content
                width calc(98vw - 240px)
                margin 10px 0 0 -5px
                padding 10px 0
                border-top 1px solid rgba(0,0,0,.1)
            .foo-enter-active,foo-leave-active
                transition all .6s ease-in
            .foo-enter,.foo-leave-active
                opacity:0;
</style>

<script>
    export default {
        data(){
            return{
                theme2: 'light'
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
    }
</script>
