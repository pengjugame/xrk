<template>
  <div>
  <div class="mui-card-header" style="height: 40px" >
    <router-link class="mui-btn mui-btn-success mui-icon mui-icon-plusempty mui-pull-right" :to="{ name:'course'}" tag="button" >添加课程</router-link>
  </div>

  <div class="mui-card" v-for="course in courses" >

    <div class="mui-card-header">
      <label>课程管理</label>
      <label class=" mui-pull-right">课程ID：{{course.courseid}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text"  v-model="course.coursename" readonly>
      </div>
      
      <div class="mui-input-row" style="height: 70px" >
        <label>课程简介：</label>
        <textarea type="text"  rows="2" v-model="course.coursedetails" readonly></textarea>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'modcourse', params: course }" tag="button" >修改课程</router-link>
    </div>

  </div>
  </div>
</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
    courses: [],
    }
  },
  activated: function () {
    request.getallcourses(this);
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    mui.init();
  }
}
</script>
