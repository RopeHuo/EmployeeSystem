import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

import mutations from "./store/mutations.js";
import actions from "./store/actions.js";
import getters from "./store/getters.js";
import Homestate from "./store/state.js";

import router from './router'
import ElementUI from 'element-ui';

Vue.use(ElementUI, { size: 'small' });
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        Homestate
    },
    mutations: {
        ...mutations
    },
    actions: {
        ...actions
    },
    getters: {
        ...getters
    }
})

new Vue({
    el: "#app",
    store,
    router,
    render: (h) => h(App)
})