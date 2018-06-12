<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">创建班级</span>
    </a>
    <a class="mui-tab-item" href="#coursesview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">课程列表</span>
    </a>
    <a class="mui-tab-item" href="#teachersview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">教师列表</span>
    </a>
    <a class="mui-tab-item" href="#classesview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">班级列表</span>
    </a>
  </nav>

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div id="main" class="mui-control-content mui-active ">
  <div class="mui-card" >
    <div class="mui-card-header">创建班级</div>
    
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>班级名称：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入班级名称" v-model="form.classname" >
      </div>

      <div class="mui-input-row">
        <label>上课地址：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课地址" v-model="form.classaddress" >
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课时间" v-model="form.classtime" >
      </div>

      <div class="mui-input-row">
        <label>上课人数：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课人数" v-model="form.classmaxnumusers" >
      </div>

      <div class="mui-input-row">
        <label>课程：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入课卡ID" v-model="form.courseid" >
      </div>

      <div class="mui-input-row">
        <label>教师：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入教师ID" v-model="form.teacherid" >
      </div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" value="广州萝岗万达店" v-model="schoolname" readonly>
        <a href="#middlePopover" class="mui-navigate-right" ></a>
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
  <div class="mui-card" v-for="teacher in teachers" >
    <div class="mui-card-header">
      <label>{{teacher.teachername}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">教师ID：{{teacher.teacherid}}</a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>教师手机：</label>
        <input type="text" v-model="teacher.teachermodile" readonly>
      </div>

      <div class="mui-input-row">
        <label>教师性别：</label> 
        <input type="text" v-if="teacher.teacherusex == '0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>教师简介：</label>
        <input type="text" v-model="teacher.teacherdetails" readonly>
      </div>
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
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

  <div id="middlePopover" class="mui-popover">
    <div class="mui-popover-arrow"></div>
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <ul id="schoolsid" class="mui-table-view">
          <template v-for="school in schools">
            <li class="mui-table-view-cell mui-selected" v-if="school.schoolname == schoolname"  v-bind:value="school.schoolid" >{{school.schoolname}}</li>
            <li class="mui-table-view-cell " v-else  v-bind:value="school.schoolid" >{{school.schoolname}}</li>
          </template>
        </ul>
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
        classid: '',
        classname: '',
        classaddress: '',
        classtime: '',
        classmaxnumusers: '',
        classnumusers: 0,
        courseid: '',
        teacherid: '',
        schoolid: 1,
        classactive: 1,
      },
      theachers: [],
      courses: [],
      classes: [],
      schools: [],
      schoolname: '广州萝岗万达店',
    }
  },
  created() {
    request.getschools(this);
    request.getcourses(this);
    request.getteachers(this);
    request.getclasses(this);
  },
  computed: {
  },
  methods: {
    submit() {
      request.postclass(this);
    }
  },
  mounted() {
    mui.init();

    mui('.mui-scroll-wrapper').scroll();

    document.getElementById('schoolsid').addEventListener('selected',function(e){
      this.schoolname = e.detail.el.innerText;
		});
	}
}
</script>

<style>
  .mui-popover {
    height: 50px;
  }
</style>
