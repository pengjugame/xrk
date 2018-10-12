<template>
  <div>

  <div class="mui-card-header" style="height: 40px" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'classes'}" tag="a" >返回</router-link>
    <router-link class=" mui-btn mui-btn-success mui-icon mui-icon-paperclip mui-pull-right" :to="{ name:'workclasses', params: {classid:classid} }" tag="button" >开课记录</router-link>
  </div>
  
  <div class="mui-card" v-for="student in students" >
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
        <label>班级：</label>
        <input type="text" v-model="student.classname" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>学生备注：</label>
        <textarea type="text" rows="2" v-model="student.studentdetails" readonly />
      </div>
      
    </div>

    <div class="mui-card-footer">
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'student', params: student }" tag="button" >详细信息</router-link>
      <div class="mui-numbox mui-pull-right" data-numbox-min='0' v-bind:data-numbox-max="[student.studentmaxtimes]" >
        <button class="mui-btn jl-mui-btn-numbox-minus" type="button" v-on:click="minusplusstudenttimes(0,student)">-</button>
        <input class="mui-input-numbox" type="number" v-model="student.studenttimes" />
        <button class="mui-btn jl-mui-btn-numbox-plus"  type="button" v-on:click="minusplusstudenttimes(1,student)">+</button>
      </div>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="updatestudenttimes(student)" v-text="confirmText" ></button>
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
      classid: "",
      updatestudenttimesstatus: 0,
    }
  },
  activated: function () {
    if(this.$route.params.classid != undefined){
      this.classid = this.$route.params.classid;
      request.getclassstudents(this,this.classid);
    }
  },
  created() {
  },
  computed: {
    confirmText() {
      if (this.updatestudenttimesstatus == 1) {
        mui.toast('提交成功 :-)');
        this.updatestudenttimesstatus = 0;
      }

      return '确认';
    }
  },
  methods: {
    updatestudenttimes(student) {
      request.putstudenttimes(this,student);
    },
  
    minusplusstudenttimes(plus,student){
      if(plus === 1){
        if((student.studenttimes + 1) <= student.studentmaxtimes)
          student.studenttimes += 1;
        else
          student.studenttimes = student.studentmaxtimes;
      }else{
        if((student.studenttimes - 1) >= 0)
          student.studenttimes -= 1;
        else
          student.studenttimes = 0;
      }
      
    },
  },
  mounted() {
    mui.init();
  }
}
</script>

<style>
  .mui-card-header a.active {
    color: #08ec54f8;
  }
  .jl-mui-btn-numbox-plus {
    right: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .jl-mui-btn-numbox-minus {
  left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  }
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
