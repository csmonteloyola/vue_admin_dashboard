import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Services from '@/views/Services.vue'
import Calendar from '@/views/Calendar.vue'
import Migration from '@/views/Migration.vue'
import Schedule from '@/views/Schedule.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar
        },
        {
            path: '/services',
            name: 'services',
            component: Services
        },
        {
            path: '/migration',
            name: 'migration',
            component: Migration
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: Schedule
        }
    ]
})