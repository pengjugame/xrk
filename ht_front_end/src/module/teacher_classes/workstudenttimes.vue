<template>
  <div>
  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classstudents' }" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-for="workstudenttime in workstudenttimes" >

    <div class="mui-card-header">
      <label>{{workstudenttime.studentname}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>结算老师：</label>
        <input type="text"  v-model="workstudenttime.teachername" readonly>
      </div>

      <div class="mui-input-row">
        <label>结算时间：</label>
        <input type="text" v-model="workstudenttime.workstudenttime" readonly>
      </div>

      <div class="mui-input-row">
        <label>上次剩余：</label>
        <input type="text" v-model="workstudenttime.studentpretimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>剩余课次：</label>
        <input type="text" v-model="workstudenttime.studentcurtimes" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>备注：</label>
        <textarea type="text"  rows="2" v-model.trim="workstudenttime.workstudenttimedetails" readonly></textarea>
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
      workstudenttimes: [],
      student: {},
    }
  },
  activated: function () {
    if(this.$route.params != undefined)
      this.student = this.$route.params;
    else
      return;

    request.getworkstudenttimes(this);
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
