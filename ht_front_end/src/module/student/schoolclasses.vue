<template>

  <div>
  <div class="mui-card" v-for="cla in classes" >
    <div class="mui-card-header">
      <label>{{cla.classname}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">班级ID：{{cla.classid}}</a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课程名：</label>
        <input type="text" v-model="cla.coursename" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" v-model="cla.classtime" readonly>
      </div>
	  
      <div class="mui-input-row">
        <label>班级备注：</label>
        <input type="text" v-model="cla.classaddress" readonly>
      </div>
	  
      <div class="mui-input-row" >
        <label>最大人数：</label>
        <input type="text" v-model="cla.classmaxnumusers" readonly>
	  </div>

      <div class="mui-input-row" >
        <label>当前人数：</label>
        <input type="text" v-model="cla.classnumusers" readonly>
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
	  <label>向日葵艺术</label>
      <router-link v-if="cla.classnumusers < cla.classmaxnumusers " class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'student', params: cla }" tag="button" >选择</router-link>
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
      classes: [{classid:'1',classname:'testclass',coursename:'testcourse',
				classtime:'7.16-7.25 9:00-10:30',classaddress:'testaddress',
				classmaxnumusers:'30',classnumusers:'20',teachername:'testteachername',schoolname:'schoolname'},
				{classid:'1',classname:'testclass',coursename:'testcourse',classtime:'testtime',classaddress:'testaddress',
				classmaxnumusers:'30',classnumusers:'30',teachername:'testteachername',schoolname:'schoolname'},],
    }
  },
  created() {
	request.getclasses(this);
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
