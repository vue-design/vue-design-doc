<template>
    <div class="stage">
        <div class="head">
            <img src="./assets/logo.png" class="logoPng" />&nbsp;&nbsp;
            <span class="head-text">vue-design 文档</span>
        </div>
        <div class="content">
            <ul class="menu-box">
                <li v-for="item in menuData" @click="activeMenu(item)" :class="{'active': activeMenuId == item.id}">
                    <router-link :to="item.view || ''" v-if="!hasSecondMenu(item)">
                        {{item.name}}
                    </router-link>

                    <div v-if="hasSecondMenu(item)">
                        {{item.name}}
                        <v-icon :type="secondMenuOpen ? 'up' : 'down'" size="small" v-if="hasSecondMenu(item)"></v-icon>
                    </div>
                    <second-menu v-if="hasSecondMenu(item)"
                                 v-show="secondMenuOpen"
                                 v-for="data in item.children"
                                 :menuData="data"
                                 :activeSubMenu="activeSubMenu"
                                 @secondMenuClick="getSecondMenuClick"
                                 @click.native.stop="">

                    </second-menu>
                </li>
            </ul>
            <div class="view-box">
                <router-view></router-view>
            </div>
            <div class="href-box">
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
    import { menuData, viewData } from "./docData";
    import secondMenu from "./components/second-menu.vue";
    export default{
        data(){
            return{
                serializeNum: "",
                viewData: JSON.stringify(viewData),
                activeMenuId: 0,
                secondMenuOpen: true,
                activeSubMenu: ""
            }
        },
        components: {
            secondMenu
        },
        computed: {
            menuData: function(){
                if(menuData.length){
                    this.addMenuId(menuData);
                    return menuData;
                }else {
                    return [];
                }
            }
        },
        methods: {
            addMenuId: function(arr){
                arr.forEach(function(v){
                    v.id = ++this.serializeNum;
                    if(v.children && v.children.length){
                        this.addMenuId(v.children);
                    }
                },this);
            },
            activeMenu: function(item){
                if(this.hasSecondMenu(item)){
                    this.secondMenuOpen = !this.secondMenuOpen;
                }else {
                    this.activeMenuId = item.id;
                }
            },
            hasSecondMenu: function(item){
                return item.children && item.children.length;
            },
            getSecondMenuClick: function(data){
                this.activeSubMenu = data.name;
            }
        },
        mounted: function(){
            this.activeMenu(1);
        }
    }
</script>

<style>

    .head{
        text-align: center;
        padding: 15px 0;
    }
    .logoPng{
        width: 35px;
        display: inline-block;
        vertical-align: middle;
    }
    .head-text{
        font-size: 15px;
        background-image: -webkit-gradient(linear, left 0, right 0, from(#2992e1),color-stop(0.35,#f0646f),color-stop(0.65,#35495e), to(#41b883));
        background-image: -webkit-linear-gradient(left, #2992e1,#f0646f,#35495e,#41b883);
        background-image: -moz-linear-gradient(left, #2992e1,#f0646f,#35495e,#41b883);
        background-image: -o-linear-gradient(left, #2992e1,#f0646f,#35495e,#41b883);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .stage{
        width: 100%;
        /*height: 100%;*/
        background-color: #ECECEC;
    }
    .content{
        width: 92%;
        min-width: 1000px;
        margin: 20px auto ;
        padding-top: 20px;
        border-radius: 6px;
        background-color: #FFFFFF;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
        overflow: hidden;
    }
    .footer{
        height: 40px;
    }
    .menu-box{
        width: 16.667%;
        float: left;
        border-right: 1px solid #e9e9e9;
    }
    .menu-box > li{
        line-height: 42px;
        text-overflow: ellipsis;
        padding: 0 16px 0 28px;
        cursor: pointer;
        color: #666666;
    }
    .menu-box > li:hover > a{
        color: #2db7f5;
    }
    .menu-box > li.active{
        border-right: 2px solid #2db7f5;
    }
    .menu-box > li > a{
        text-decoration: none;
        color: #666666;
        display: block;
    }
    .menu-box > li > div > i{
        float: right;
    }
    .menu-box > li.active > a{
        color: #2db7f5;
    }
    .view-box{
        width: 83.333%;
        padding: 0 30px;
        float: left;
    }
</style>
