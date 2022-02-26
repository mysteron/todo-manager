/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import Vue from 'vue'
import VueRouter from 'vue-router';

import Home from './components/Home'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import TodoList from "./components/TodoList";
import CategoryList from "./components/CategoryList";

import { ROUTES } from "./consts";

const routes = [
    {
        path: '/', component: Home, name: 'home', children: [
            {
                path: 'todo-list',
                component: TodoList,
                name: ROUTES.TODO_LIST
            },
            {
                path: 'categories',
                component: CategoryList,
                name: ROUTES.CATEGORIES
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: '/app/',
    routes
})

Vue.use(VueRouter)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router
}).$mount('#app')