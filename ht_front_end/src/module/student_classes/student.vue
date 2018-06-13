<template>
	<div>

	<div class="mui-card">
		<router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classes'}" tag="a" ></router-link>
	</div>
	
	<div class="mui-card" >
		<div class="mui-card-header">
			<label>学生记录</label>
			<a class="active mui-pull-right">{{student.studentname}}</a>
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
				<input type="text" v-model="classname" readonly>
				<router-link class="mui-navigate-right" :to="{ name:'schoolclasses'}" tag="a" ></router-link>
			</div>
			
			<div class="mui-input-row">
				<label>最大课程次数：</label>
				<input type="text" v-model="student.studentmaxtimes" readonly>
			</div>
			
			<div class="mui-input-row">
				<label>剩余课程次数：</label>
				<input type="text" v-model="student.studenttimes" readonly>
			</div>

			<div class="mui-input-row" >
				<label>学生备注：</label>
				<input type="text" v-model="student.studentdetails" readonly>
			</div>
			
		</div>

		<div class="mui-card-footer">
			<label>向日葵艺术</label>
			<button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="updatestudentclass(student)" >修改班级</button>
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
      student: {studentname:'studentname',studentmobile:'studentmobile',studentusex:1,studentdetails:'studentdetails',
				classcardname:'classcardname',classname:'classname',studenttimes:3,studentmaxtimes:30},
	  init: 0,
	  classid: '',
	  classname : '',
    }
  },
  created() {
	this.classid = this.$route.params.classid;
	this.classname = this.$route.params.classname;
  
	if(this.init != 0){
		return ;
	}
	
    request.getstudentbyclass(this,this.classid);
	this.init = 1;
  },
  computed: {
  },
  methods: {
    updatestudentclass(student) {
		if(this.classid == student.classid)
			return;

		student.classid = this.classid;
		request.putstudentclass(student);
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
</style>
