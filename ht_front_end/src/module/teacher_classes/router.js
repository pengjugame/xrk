'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
import "vue-awesome-mui/mui/examples/hello-mui/css/icons-extra.css";

// mount with global
Vue.use(Mui)
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'classes',
      component: require("./classes.vue")
    },
    {
      path: '/classstudents',
      name: 'classstudents',
      component: require("./classstudents.vue")
    },
    {
      path: '/workstudenttimes',
      name: 'workstudenttimes',
      component: require("./workstudenttimes.vue")
    },
    {
      path: '/workclasses',
      name: 'workclasses',
      component: require("./workclasses.vue")
    },
    {
      path: '/workstudents',
      name: 'workstudents',
      component: require("./workstudents.vue")
    }
  ]
})
