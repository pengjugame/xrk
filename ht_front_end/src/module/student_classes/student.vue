<template>
  <div>

  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classes'}" tag="a" ></router-link>
  </div>
  
  <div class="mui-card" >
    <div class="mui-card-header">
      <label>学生记录</label>
      <label class=" mui-pull-right">{{student.studentname}}</label>
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

      <div class="mui-input-row" >
        <label>学生备注：</label>
        <input type="text" v-model="student.studentdetails" readonly>
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
      <label>向日葵艺术</label>
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
    }
  },
  created() {
    request.getstudentbyclass(this,this.$route.params.classid);
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
  .mui-card-header a.active {
    color: #08ec54f8;
  }
</style>
