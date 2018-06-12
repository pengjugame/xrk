<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">再读学生</span>
    </a>
    <a class="mui-tab-item" href="#classesview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">班级列表</span>
    </a>
    <a class="mui-tab-item" href="#classcardsview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">课卡列表</span>
    </a>
  </nav>

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div id="main" class="mui-control-content mui-active ">
  <div class="mui-card" v-for="student in students" >
    <div class="mui-card-header">
      <label>学生记录</label>
      <a class="active mui-pull-right">{{student.studentname}}</a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text"  v-model="student.studentmobile" readonly>
      </div>

      <div class="mui-input-row">
        <label>性别：</label> 
        <input type="text" v-if="student.studentusex == '0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row" >
          <label>学生备注：</label>
					<input type="text" v-model="student.studentdetails" readonly>
			</div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="student.classcardid" readonly>
      </div>

      <div class="mui-input-row">
        <label>剩余课次：</label>
        <input type="text" v-model="student.studenttimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>班级：</label>
        <input type="text"  class="mui-input-clear" placeholder="输入班级ID" v-model="student.classid" >
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:submit.prevent="submit(student)" >确认</button>
    </div>
  </div>
  </div>

  <div id="classesview" class="mui-control-content">
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
    </div>

    <div class="mui-card-footer">
      <label>班级最大人数: {{cla.classmaxnumusers}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">班级当前人数：{{cla.classnumusers}}</a>
    </div>
  </div>
  </div>

  <div id="classcardsview" class="mui-control-content">
  <div class="mui-card" v-for="classcard in classcards" >
    <div class="mui-card-header">
      <label>{{classcard.classcardname}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">课卡ID：{{classcard.classcardid}}</a>
      </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text" v-model="classcard.coursename" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>上课次数：</label>
        <input type="text" v-model="classcard.coursetimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课分钟：</label>
        <input type="text" v-model="classcard.coursetime" readonly>
      </div>
 
      <div class="mui-input-row" >
        <label>课程介绍：</label>
        <input type="text" v-model="classcard.coursedetails" readonly>
			</div>
    </div>

    <div class="mui-card-footer">
      <label>价格：{{classcard.classcardprice}} ¥</label>
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
      students: [],
      classes: [],
      classcards: [],
    }
  },
  created() {
    request.getstudents(this);
    request.getclasses(this);
    request.getclasscards(this);
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
