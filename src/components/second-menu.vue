<template>
    <div>
        <div class="group-name" v-text="menuData.group"></div>
        <ul class="second-list">
            <li v-for="data in menuData.list" @click="subMenuActive(data)" :class="{'active': data.name == activeSubMenu}">
                <router-link :to="data.href">
                    <span v-text="data.name"></span>
                    <span class="subtitle-name" v-text="data.subtitle"></span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        props: {
            menuData: Object,
            activeSubMenu: String
        },
        data(){
            return{}
        },
        methods: {
            subMenuActive: function(item){
                if(item.href){
                    this.$emit("secondMenuClick",item);
                }
            }
        },
        computed: {
        }
    }
</script>
<style>
    .group-name{
        color: #999;
        font-size: 12px;
        line-height: 1.5;
        padding: 8px 16px 8px 8px;
    }
    .second-list > li > a{
        font-size: 14px;
        text-decoration: none;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        color: #666;
        padding-left: 20px;
    }
    .second-list > li > a:hover,
    .second-list > li.active > a{
        color: #108ee9;
    }
    .subtitle-name{
        font-size: 12px;
        margin-left: 6px;
        font-weight: normal;
        opacity: .67;
    }

</style>
