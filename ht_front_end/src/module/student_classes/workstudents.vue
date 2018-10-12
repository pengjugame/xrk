<template>
  <div>
  <div class="mui-card">
    <router-link class="mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'workclasses' }" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-for="workstudent in workstudents" >

    <div class="mui-card-header">
      <label>{{workstudent.studentname}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <form class="mui-input-group">
      <div class="mui-input-row mui-radio">
        <label>正常</label>
        <input name="radio" type="radio" value="0" v-model="workstudent.workstudentstatus">
      </div>
      <div class="mui-input-row mui-radio">
        <label>请假</label>
        <input name="radio" type="radio" value="1" v-model="workstudent.workstudentstatus" >
      </div>
      <div class="mui-input-row mui-radio">
        <label>缺勤</label>
        <input name="radio" type="radio" value="2" v-model="workstudent.workstudentstatus">
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>备注：</label>
        <textarea type="text"  rows="2" v-model.trim="workstudent.workstudentdetails" class="mui-input-clear" placeholder="请输入备注"></textarea>
      </div>
      </form>

    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="submit(workstudent)" v-if="workclass.workclassactive==1" >更新</button>
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
      workstudents: [],
      workclass: {},
      student: {},
    }
  },
  activated: function () {
    if(this.$route.params != undefined){
      this.workclass = this.$route.params.workclass;
      this.student = this.$route.params.student;
    }else
      return;

    request.getworkstudentbyworkclass(this);
  },
  created() {
  },
  computed: {
  },
  methods: {
    submit(workstudent) {
      request.putworkstudent(workstudent);
      mui.toast('提交成功 :-)');
    },
  },
  mounted() {
    mui.init();
  }
}
</script>
