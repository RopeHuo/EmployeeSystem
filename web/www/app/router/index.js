import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import axios from 'axios';

import Home from "../views/Home/index.vue";
import Add from "../views/Add/index.vue";
import Search from "../views/Search/index.vue";
import Login from "../views/Login/index.vue";


const router = new VueRouter({
    routes: [
        { path: "/login", name: "登陆中心", component: Login },
        { path: '/Home', name: "首页", component: Home, meta: { needLogin: true }, },
        { path: '/Add', name: "添加", component: Add, meta: { needLogin: true }, },
        { path: '/Search', name: "搜索", component: Search, meta: { needLogin: true }, },
        { path: "*", redirect: "/login"}
    ]
})

router.beforeEach(async (to, from, next) => {
    //当用户切换路由的时候，执行这里的语句
    if (to.meta.needLogin) {
    //     //验证用户是否登陆了
        const {login} = await axios.get("/api/checklogin").then(res => res.data);
        console.log(login)
        if (login) {
            next();//放行，调用next
        } else {
            router.push("/login");
        }
    } else {
        //不需要验证登陆的，直接放行
        next();
    }
})

export default router