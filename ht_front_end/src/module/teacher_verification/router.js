'use strict'

//const Vue = require('vue')
//const VueRouter = require('vue-router')
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'teacher_verification',
      component: require("./App.vue")
    }
  ]
})
