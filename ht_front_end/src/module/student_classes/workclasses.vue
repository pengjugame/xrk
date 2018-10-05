<template>
  <div>
  <div class="mui-card">
    <router-link class="mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'student' }" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-for="workclass in workclasses" >

    <div class="mui-card-header">
      <label>班级开课时间表</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>班级名称：</label>
        <input type="text"  v-model="workclass.classname" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课时间：</label>
        <input type="text"  v-model="workclass.workclasstime" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课老师：</label>
        <input type="text"  v-model="workclass.teachername" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>开课备注：</label>
        <textarea type="text"  rows="2" v-model="workclass.workclassdetails" readonly></textarea>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'workstudents', params: {workclass:workclass,student:student} }" tag="button" >编辑</router-link>
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
      workclasses: [],
      student: {},
      classid: "",
    }
  },
  activated: function () {
    if(this.$route.params != undefined){
      this.student = this.$route.params;
      this.classid = this.student.classid;
    }else
      return;
    request.getworkclasses(this);
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
