<template>
  <div>

  <div class="mui-card-header" style="height: 40px" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'classes'}" tag="a" >返回</router-link>
    <router-link class=" mui-btn mui-btn-success mui-icon mui-icon-paperclip mui-pull-right" :to="{ name:'workclasses', params: student }" tag="button" >开课记录</router-link>
    <router-link class=" mui-btn mui-btn-success mui-icon mui-icon-settings mui-pull-right" :to="{ name:'workstudenttimes', params: student }" tag="button" >课次记录</router-link>
  </div>
  
  <div class="mui-card" >
    <div class="mui-card-header">
      <label v-if="student.studentactive == 1" class=" mui-badge-success mui-badge">{{student.studentname}}</label>
      <label v-else class=" mui-badge">{{student.studentname}}</label>
      <img class="mui-media-object mui-pull-right round_icon" v-bind:src="student.headimgurl">
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

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="student.classcardname" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>最大次数：</label>
        <input type="text" v-model="student.studentmaxtimes" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>剩余次数：</label>
        <input type="text" v-model="student.studenttimes" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>学生备注：</label>
        <textarea type="text" rows="2" v-model="student.studentdetails" readonly />
      </div>
      
      <div class="mui-input-row">
        <label>课程：</label>
        <input type="text" v-model="student.coursename" readonly>
      </div>

      <div class="mui-input-row">
        <label>班级：</label>
        <input type="text" v-model="student.classname" readonly >
      </div>
      
    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
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
      student: {},
      classid: "",
    }
  },
  activated: function () {
    if(this.$route.params.classid != undefined){
      this.classid = this.$route.params.classid;
      request.getstudentbyclass(this,this.classid);
    }
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

<style>
  .round_icon {
    width: 34px;
    height: 34px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
