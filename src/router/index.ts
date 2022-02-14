import Main from '../pages/Main.vue'

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Main },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
