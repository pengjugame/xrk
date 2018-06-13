<template>
	<div>

	<div class="mui-card">
		<router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classes'}" tag="a" ></router-link>
	</div>
	
	<div class="mui-card" v-for="student in students" >
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
				<input type="text" v-model="student.classname" readonly>
			</div>

			<div class="mui-input-row" >
				<label>学生备注：</label>
				<input type="text" v-model="student.studentdetails" readonly>
			</div>
			
		</div>

		<div class="mui-card-footer">
			<label>剩余课次：</label>
			<div class="mui-numbox mui-pull-right" data-numbox-min='0' v-bind:data-numbox-max="[student.studentmaxtimes]" >
				<button class="mui-btn jl-mui-btn-numbox-minus" type="button" v-on:click="minusplusstudenttimes(0,student)">-</button>
				<input class="mui-input-numbox" type="number" v-model="student.studenttimes" />
				<button class="mui-btn jl-mui-btn-numbox-plus"  type="button" v-on:click="minusplusstudenttimes(1,student)">+</button>
			</div>
			<button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="updatestudenttimes(student)" >确认</button>
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
      students: [{studentname:'studentname',studentmobile:'studentmobile',studentusex:1,
				studentdetails:'studentdetails',classcardname:'classcardname',classname:'classname',studenttimes:3,studentmaxtimes:30},
				{studentname:'studentname',studentmobile:'studentmobile',studentusex:0,
				studentdetails:'studentdetails',classcardname:'classcardname',classname:'classname',studenttimes:3,studentmaxtimes:30}],
    }
  },
  created() {
    request.getclassstudents(this,this.$route.params.classid);
  },
  computed: {
  },
  methods: {
    updatestudenttimes(student) {
      request.putstudenttimes(student);
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
</style>
