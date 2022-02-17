import Main from '../pages/Main.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    { path: '/auth-app/:id', name: 'Main', component: Main },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
