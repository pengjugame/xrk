<template>

  <div>
  
  <div class="mui-card-header" style="height: 40px" v-if="classes == false">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name: fromname }" tag="a" >返回</router-link>
  </div>

  <div class="mui-card" v-for="cla in classes" >
    <div class="mui-card-header">
      <label>{{cla.classname}}</label>
      <label class=" mui-pull-right">班级ID：{{cla.classid}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课程类别：</label>
        <input type="text" v-model="cla.coursename" readonly>
      </div>
    
      <div class="mui-input-row">
        <label>上课日期：</label>
        <input type="text" v-model="cla.classdate" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" v-model="cla.classtime" readonly>
      </div>
    
      <div class="mui-input-row" >
        <label>最大人数：</label>
        <input type="text" v-model="cla.classmaxnumusers" readonly>
    </div>

      <div class="mui-input-row" >
        <label>当前人数：</label>
        <input type="text" v-model="cla.classnumusers" readonly>
    </div>
    
      <div class="mui-input-row" style="height: 70px" >
        <label>备注：</label>
        <textarea type="text" rows="2" v-model="cla.classdetails" readonly />
      </div>

      <div class="mui-input-row" >
        <label>校区：</label>
        <input type="text" v-model="cla.schoolname" readonly>
    </div>

    </div>
  
    <div class="mui-card-footer">
      <label>向舞</label>
      <router-link v-if="cla.classnumusers < cla.classmaxnumusers " class="mui-btn mui-btn-warning mui-pull-right" :to="{ name: fromname , params: cla }" tag="button" >选择</router-link>
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
      classes: [],
      fromname: '',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromname = from.name;
      if(vm.$route.params.courseid != undefined)
        request.getclassesbycourse(vm,vm.$route.params.courseid);
    });
  },
  activated: function () {
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
