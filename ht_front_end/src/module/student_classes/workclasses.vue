<template>
  <div>
  <div class="mui-card-header" style="height:40px;" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'student' }" tag="a" >返回</router-link>
  </div>

  <div class="mui-card" v-for="workstudentclass in workstudentclasses" >

    <div class="mui-card-header">
      <label>班级开课时间表</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>班级名称：</label>
        <input type="text"  v-model="workstudentclass.classname" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课时间：</label>
        <input type="text"  v-model="workstudentclass.workclasstime" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课老师：</label>
        <input type="text"  v-model="workstudentclass.teachername" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课状态：</label>
        <input type="text" v-if="workstudentclass.workclassactive==0" value="已上课" readonly>
        <input type="text" v-else value="未上课" style="color:#31e207" readonly>
      </div>

      <div class="mui-input-row" >
        <label>上课时间：</label>
        <input type="text" v-model="workstudentclass.workclassdetails" readonly></input>
      </div>

      <div class="mui-input-row" >
        <label>学生状态：</label>
        <input type="text" v-if="workstudentclass.workstudentstatus==0" value="正常" style="color:#31e207" readonly>
        <input type="text" v-else-if="workstudentclass.workstudentstatus==1" value="请假" style="color:#FFD700" readonly>
        <input type="text" v-else value="缺勤" style="color:#FF4500" readonly>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="submit(workstudentclass,0)" v-if="workstudentclass.workclassactive==1" >撤销请假</button>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="submit(workstudentclass,1)" v-if="workstudentclass.workclassactive==1" >申请请假</button>
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
      workstudentclasses: [],
      student: {},
      classid: "",
    }
  },
  activated: function () {
    if(this.$route.params.classid != undefined){
      this.student = this.$route.params;
      this.classid = this.student.classid;
    }else
      return;
    request.getworkstudent(this);
  },
  created() {
  },
  computed: {
  },
  methods: {
    submit(workstudent,v) {
      workstudent.workstudentstatus = v;
      request.putworkstudent(workstudent);
      mui.toast('提交成功 :-)');
    },
  },
  mounted() {
    mui.init();
  }
}
</script>
