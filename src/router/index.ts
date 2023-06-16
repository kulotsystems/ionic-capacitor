import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/camera',
        name: 'Camera',
        component: () => import('../views/Camera.vue')
    },
    {
        path: '/haptics',
        name: 'Haptics',
        component: () => import('../views/Haptics.vue')
    },
    {
        path: '/browser',
        name: 'Browser',
        component: () => import('../views/Browser.vue')
    },
    {
        path: '/status-bar',
        name: 'StatusBar',
        component: () => import('../views/StatusBar.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
