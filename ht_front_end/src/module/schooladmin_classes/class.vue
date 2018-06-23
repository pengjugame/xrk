<template>
  <div>

  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classes'}" tag="a" ></router-link>
  </div>

  <div class="mui-card" >
    <div class="mui-card-header">向日葵艺术班级新建</div>
    
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>班级名称：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入班级名称" v-model="form.classname" >
      </div>

      <div class="mui-input-row">
        <label>上课日期：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课日期" v-model="form.classdate" >
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课时间" v-model="form.classtime" >
      </div>

      <div class="mui-input-row">
        <label>上课人数：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入上课人数" v-model="form.classmaxnumusers" >
      </div>

      <div class="mui-input-row" >
        <label>班级备注：</label>
        <input type="text" v-model="form.classdetails" class="mui-input-clear" placeholder="请输入班级备注">
      </div>

      <div class="mui-input-row">
        <label>选择课程：</label>
        <input type="text" v-model="coursename" readonly>
        <li id="menu-btn" class="mui-navigate-right" ></li>
      </div>

      <div class="mui-input-row">
        <label>选择教师：</label>
        <input type="text" v-model="teachername" readonly >
        <router-link class="mui-navigate-right" :to="{ name:'teachers'}" tag="a" ></router-link>
      </div>
      
      <div class="mui-input-row">
        <label>选择校区：</label>
        <input type="text" value="广州萝岗万达店" v-model="schoolname" readonly >
        <a href="#middlePopover" class="mui-navigate-right" ></a>
      </div>

      <div class="mui-button-row">
          <button type="button" id="submitid" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
      </div>
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
  </div>

  <div id="middlePopover" class="mui-popover">
    <div class="mui-popover-arrow"></div>
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
      <ul class="mui-table-view mui-table-view-radio">
        <template v-for="school in schools">
          <li class="mui-table-view-cell mui-selected" v-if="school.schoolid == schoolid"  v-on:click="getschool(school)" >
            <a class="mui-navigate-right">{{school.schoolname}}</a>
          </li>
          <li class="mui-table-view-cell" v-else  v-on:click="getschool(school)" >
            <a class="mui-navigate-right">{{school.schoolname}}</a>
          </li>
        </template>
      </ul>
      </div>
    </div>
  </div>
  
  <div id="menu-wrapper" class="menu-wrapper hidden">
    <div id="menu" class="menu">
      <ul class="mui-table-view mui-table-view-inverted" v-model="coursename">
        <template v-for="course in courses">
          <li class="mui-table-view-cell mui-selected" v-if="course.courseid == courseid" v-on:click="selectcourse(course)">{{course.coursename}}</li>
          <li class="mui-table-view-cell" v-else v-on:click="selectcourse(course)">{{course.coursename}}</li>
        </template>
      </ul>
    </div>
  </div>
  
  <div id="menu-backdrop" class="menu-backdrop"></div>
  
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
        classdate: '',
        classtime: '',
        classmaxnumusers: 18,
        classnumusers: 0,
        classdetails: '',
        classid: '',
        teacherid: '',
        schoolid: 1,
        classactive: 1,
    },
    courseid: '',
    coursename: '',
    courses: [],
    schoolid: 1,
    schoolname: '广州萝岗万达店',
    schools: [],
    teacherid: '',
    teachername: '',
    }
  },
  activated: function () {
    this.form.classid = '';
    
    if(this.$route.params.teacherid != undefined)
      this.teacherid = this.$route.params.teacherid;

    if(this.$route.params.teachername != undefined)
      this.teachername = this.$route.params.teachername;
  },
  created() {
    request.getcourses(this);
    request.getschools(this);
  },
  computed: {
    confirmText() {
      if (this.form.classid == '') {
        if(document.getElementById("submitid"))
          document.getElementById("submitid").disabled = "";
        return '确定';
      }

      if(document.getElementById("submitid"))
        document.getElementById("submitid").disabled = "disabled"
      return '提交成功';
    }
  },
  methods: {
    submit() {
      this.form.courseid = this.courseid;
      this.form.schoolid = this.schoolid;
      this.form.teacherid = this.teacherid;
      
      if (this.form.classname == '')
      {
        mui.alert('班级名称不能为空！', '向日葵艺术班级新建', function() {
              ;
            });
        return;
      }
      
      request.postclass(this);
    },
    selectcourse(course){
      this.courseid = course.courseid;
      this.coursename = course.coursename;
      
      var menuWrapper = document.getElementById("menu-wrapper");
      var menu = document.getElementById("menu");
      var menuWrapperClassList = menuWrapper.classList;
      var backdrop = document.getElementById("menu-backdrop");
      document.body.classList.remove('menu-open');
      menuWrapper.className = 'menu-wrapper fade-out-up animated';
      menu.className = 'menu bounce-out-up animated';
      setTimeout(function() {
        backdrop.style.opacity = 0;
        menuWrapper.classList.add('hidden');
      }, 500);
    },
    getschool(school){
      this.schoolid = school.schoolid;
      this.schoolname = school.schoolname;
    },
  },
  mounted() {
    mui.init();
    mui('.mui-scroll-wrapper').scroll();

    var menuWrapper = document.getElementById("menu-wrapper");
    var menu = document.getElementById("menu");
    var menuWrapperClassList = menuWrapper.classList;
    var backdrop = document.getElementById("menu-backdrop");
    
    backdrop.addEventListener('tap', toggleMenu);
    document.getElementById("menu-btn").addEventListener('tap', toggleMenu);
    
    //mui('#menu').on('tap', 'li', function() {
    //  toggleMenu();
    //});
    
    var busying = false;
    function toggleMenu() {
      if (busying) {
        return;
      }
      busying = true;
      if (menuWrapperClassList.contains('mui-active')) {
        document.body.classList.remove('menu-open');
        menuWrapper.className = 'menu-wrapper fade-out-up animated';
        menu.className = 'menu bounce-out-up animated';
        setTimeout(function() {
          backdrop.style.opacity = 0;
          menuWrapper.classList.add('hidden');
        }, 500);
      } else {
        document.body.classList.add('menu-open');
        menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
        menu.className = 'menu bounce-in-down animated';
        backdrop.style.opacity = 1;
      }
      setTimeout(function() {
        busying = false;
      }, 500);
    }
  }
}
</script>

<style>
  html,
  body {
    min-height: 100%;
    background-color: #efeff4;
  }
  .animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes bounceInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes bounceInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  .bounce-in-down {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }
  @-webkit-keyframes fadeInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  .fade-in-down {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }
  @-webkit-keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .bounce-out-up {
    -webkit-animation-name: bounceOutUp;
    animation-name: bounceOutUp;
  }
  @-webkit-keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .fade-out-up {
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }
  .menu-open {
    height: 100%;
    width: 100%;
  }
  .menu-open .mui-scroll-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
  }
  .menu-backdrop {
    display: none;
  }
  .menu-open .menu-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: block;
    z-index: 998;
  }
  .menu-wrapper {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 999;
    text-align: center;
    background-color: rgba(238, 134, 15, 0.952);
    width: 100%;
  }
  .menu-wrapper.hidden {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    z-index: -1;
  }
  .menu {
    width: 100%;
  }
  .menu .mui-table-view-inverted {
    color: rgba(238, 134, 15, 0.952);
    font-size: 12px;
    background: #efeff4;
  }
  .menu .mui-table-view-inverted .mui-table-view-cell:after {
    height: 2px;
    left: 0;
    right: 0;
  }
  .menu-wrapper.mui-active,
  .menu-wrapper.mui-active .menu {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  #info{
    padding: 20px 10px ;
   }
  .mui-popover {
    height: 50px;
   }
</style>
