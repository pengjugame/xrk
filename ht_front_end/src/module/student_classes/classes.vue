<template>

  <div>
  <div class="mui-card" v-for="cla in classes" >
    <div class="mui-card-header">
      <label>{{cla.classname}}</label>
      <label class=" mui-pull-right">班级ID：{{cla.classid}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">
  
      <div class="mui-input-row">
        <label>课程名：</label>
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
        <label>教师：</label>
        <input type="text" v-model="cla.teachername" readonly>
      </div>

      <div class="mui-input-row" >
        <label>校区：</label>
        <input type="text" v-model="cla.schoolname" readonly>
      </div>

    </div>
  
    <div class="mui-card-footer">
      <label>向舞</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'student', params: cla }" tag="button" >详细信息</router-link>
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
    }
  },
  created() {
  request.getstudentclasses(this);
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
