/**
 * Created by denghm on 2016/9/14.
 */
import Vue from "vue";
import vueDesign from "vue-design";
import style from "vue-design/dist/vue-design.css"
import VueRouter from "vue-router";
import index from "./index.vue";
import routes from "./router";

Vue.use(VueRouter);
Vue.use(vueDesign);

// 路由配置
let router = new VueRouter({
    mode: 'history',
    routes
});

const app = new Vue({
    render: (h) => h(index),
    router
}).$mount("#stage");
