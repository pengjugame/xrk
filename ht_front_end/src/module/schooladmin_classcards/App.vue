<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">创建课卡</span>
    </a>
    <a class="mui-tab-item" href="#coursesview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">课程列表</span>
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
  <div class="mui-card" >
    <div class="mui-card-header">创建课卡</div>
    
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课卡名称：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入课卡名称" v-model="form.classcardname" >
      </div>

      <div class="mui-input-row">
        <label>课程：</label>
        <input type="text" class="mui-input-clear" placeholder="填写课程ID" v-model="form.courseid" >
      </div>

      <div class="mui-input-row">
        <label>课卡价格：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入课卡价格" v-model="form.classcardprice" >
      </div>
      
      <div class="mui-button-row">
          <button type="button" class="mui-btn mui-btn-warning" v-on:submit.prevent="submit" >确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
      </div>
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
  </div>
  </div>

  <div id="coursesview" class="mui-control-content">
  <div class="mui-card" v-for="course in courses" >
    <div class="mui-card-header">
      <label>{{course.coursename}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">课程ID：{{course.courseid}}</a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>上课次数：</label>
        <input type="text" v-model="course.coursetimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" v-model="course.coursetime" readonly>
      </div>

      <div class="mui-input-row" >
        <label>课程介绍：</label>
        <input type="text" v-model="course.coursedetails" readonly>
			</div>
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
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
      form: {
        classcardid: '',
        classcardname: '',
        classcardprice: '',
        courseid: '',
        classcardactive: '',
      },
      classcards: [],
      courses: [],
    }
  },
  created() {
    request.getcourses(this);
    request.getclasscards(this);
  },
  computed: {
  },
  methods: {
    submit() {
      request.postclasscard(this);
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
</style>
