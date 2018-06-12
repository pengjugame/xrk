<template>

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
      <router-link class="mui-action-back mui-btn mui-btn-link mui-pull-right" ></router-link>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right" herf="teacher_students.html" >学生管理</a>
    </div>
  </div>

</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
      classes: [{classid:"1",classname:"s",schoolname:"ddd"}],
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
