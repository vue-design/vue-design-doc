/**
 * author      : denghm
 * createTime  : 2016/11/22 16:06
 * description : doc-router
 */

const routers = [
    {
        path: '/introduce',
        component: resolve => require(['./views/introduce.vue'], resolve)
    },
    {
        path: '/install',
        component: resolve => require(['./views/install.vue'], resolve)

    },
    {
        path: '/quickStart',
        component: resolve => require(['./views/quickStart.vue'], resolve)
    },
    {
        path: '/standard',
        component: resolve => require(['./views/standard.vue'], resolve)
    },
    {
        path: '/customTheme',
        component: resolve => require(['./views/customTheme.vue'], resolve)
    },
    {
        path: '/aboutDoc',
        component: resolve => require(['./views/aboutDoc.vue'], resolve)
    },
    {
        path: '/button',
        component: resolve => require(['./views/button.vue'], resolve)
    }
];
export default routers;