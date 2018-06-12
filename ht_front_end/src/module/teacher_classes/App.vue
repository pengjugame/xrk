<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">班级</span>
    </a>
  </nav>

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div id="main" class="mui-control-content mui-active ">
  <div class="mui-card" v-for="cla in classes" >
    <div class="mui-card-header">
      <label>{{cla.classname}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">班级ID：{{cla.classid}}</a>
      </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>上课地点：</label>
        <input type="text" v-model="cla.classaddress" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" v-model="cla.classtime" readonly>
      </div>

      <div class="mui-input-row">
        <label>课程名：</label>
        <input type="text" v-model="cla.coursename" readonly>
      </div>

      <div class="mui-input-row" >
        <label>教师：</label>
        <input type="text" v-model="cla.teachername" readonly>
			</div>

      <div class="mui-input-row" >
        <label>校区：</label>
        <input type="text" v-model="cla.schoolname" readonly>
			</div>

      <div class="mui-input-row" >
        <label>班级最大人数：</label>
        <input type="text" v-model="cla.classmaxnumusers" readonly>
			</div>

      <div class="mui-input-row" >
        <label>班级当前人数：</label>
        <input type="text" v-model="cla.classnumusers" readonly>
			</div>

    </div>

    <div class="mui-card-footer">
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right" herf="teacher_students.html" >学生管理</a>
    </div>
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
      classes: [],
    }
  },
  created() {
    request.getclasses(this);
  },
  computed: {
  },
  methods: {
    submit(student) {
      request.putstudent(student);
    }
  },
  mounted() {
    mui.init();
	}
}
</script>

<style>
  .mui-popover {
    height: 50px;
  }
  .mui-content a.active {
    color: #08ec54f8;
  }
</style>
