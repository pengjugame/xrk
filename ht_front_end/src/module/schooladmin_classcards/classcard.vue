<template>
  <div>

  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classcards'}" tag="a" ></router-link>
  </div>

  <div class="mui-card" >
    <div class="mui-card-header">向日葵艺术课卡新建</div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课卡名称：</label>
        <input type="text"  v-model="form.classcardname" class="mui-input-clear" placeholder="请输入课卡名" >
      </div>
    
      <div class="mui-input-row">
        <label>课程次数：</label>
        <input type="text" v-model="form.classcardtimes" class="mui-input-clear" placeholder="请输入课程次数">
      </div>

      <div class="mui-input-row">
        <label>课次时间：</label>
        <input type="text" v-model="form.classcardtime" class="mui-input-clear" placeholder="请输入课次时间">
      </div>
      
      <div class="mui-input-row">
        <label>课卡简介：</label>
        <input type="text"  v-model="form.classcarddetails" class="mui-input-clear" placeholder="请输入课卡简介">
      </div>

      <div class="mui-input-row">
        <label>价格：</label>
        <input type="text"  v-model="form.classcardprice" class="mui-input-clear" placeholder="请输入价格">
      </div>

      <div class="mui-input-row">
        <label>选择课程：</label>
        <input type="text" v-model="coursename" readonly>
        <li id="menu-btn" class="mui-navigate-right" ></li>
      </div>

      <div class="mui-input-row" >
        <label>状态：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="form.classcardactive" >
          <label>未上架</label>
        </div>
        
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="form.classcardactive" >
          <label>已上架</label>
        </div>
      </div>
      
      <div class="mui-button-row">
        <button type="button" id="submitid" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
      </div>
      
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
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
        classcardtimes: '',
        classcardtime: '',
        classcardprice: '',
        classcarddetails: '',
        courseid: '',
        classcardactive: 1,
      },

      courseid: '',
      coursename: '',
      courses: [],
    }
  },
  activated: function () {
  this.form.classcardid = '';
  },
  created() {
  request.getcourses(this);
  },
  computed: {
    confirmText() {
      if (this.classcardid == 0) {
        if(document.getElementById("submitid"))
          document.getElementById("submitid").disabled = "";
        return '确定';
      }
      
      document.getElementById("submitid").disabled = "disabled"
      return '提交成功';
    }
  },
  methods: {
    submit() {
      this.form.courseid = this.courseid;

      if (this.form.classcardname == '')
      {
        mui.alert('课卡名不能为空！', '向日葵艺术课卡新建', function() {
              ;
            });
        return;
      }
      
      request.postclasscard(this);
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
  },
  mounted() {
    mui.init();

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
</style>