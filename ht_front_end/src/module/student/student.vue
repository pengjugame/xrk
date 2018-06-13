<template>
	<div>

	<div class="mui-card" >
		<div class="mui-card-header">学生注册</div>

		<div class="mui-card-content mui-input-group ">

			<div class="mui-input-row">
				<label>姓名：</label>
				<input type="text"  v-model="form.studentname" class="mui-input-clear" placeholder="请输入姓名" >
			</div>
			
			<div class="mui-input-row">
				<label>手机：</label>
				<input type="text"  v-model="form.studentmobile" class="mui-input-clear" placeholder="请输入手机">
			</div>

			<div class="mui-input-row" >
				<label>性别：</label> 
				<div class=" mui-radio mui-pull-left mui-left">
				  <input name="radio" type="radio" value="0" v-model="form.studentusex" >
				  <label>男</label>
				</div>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<div class="mui-radio mui-pull-left mui-left">
				  <input name="radio" type="radio" value="1" v-model="form.studentusex" >
				  <label>女</label>
				</div>
			</div>
			
			<div class="mui-input-row" >
				<label>学生备注：</label>
				<input type="text" v-model="form.studentdetails" class="mui-input-clear" placeholder="请输入购买信息">
			</div>

			<div class="mui-input-row">
				<label>选择班级：</label>
				<input type="text" v-model="classname" readonly>
				<router-link class="mui-navigate-right" :to="{ name:'schoolclasses' }" tag="a" ></router-link>
			</div>
			
			<div class="mui-input-row">
				<label>选择校区：</label>
				<input type="text" value="广州萝岗万达店" v-model="schoolname" readonly >
				<a href="#middlePopover" class="mui-navigate-right" ></a>
			</div>
			
			<div class="mui-button-row">
				<button type="button" :style="{display:textDisable}" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
			</div>
			
		</div>

		<div class="mui-card-footer">向日葵艺术</div>
	</div>
	
	<div id="middlePopover" class="mui-popover">
		<div class="mui-popover-arrow"></div>
		<div class="mui-scroll-wrapper">
		  <div class="mui-scroll">
			<ul id="schoolsid" class="mui-table-view">
				<template v-for="school in schools">
					<li class="mui-table-view-cell mui-selected" v-if="school.schoolname == schoolname"  v-bind:value="school.schoolid" >{{school.schoolname}}</li>
					<li class="mui-table-view-cell " v-else  v-bind:value="school.schoolid" >{{school.schoolname}}</li>
				</template>
			</ul>
		  </div>
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
      form: {
		  studentid: '',
		  studentname: '',
		  studentmobile: '',
		  studentusex: 1,
		  studentdetails: '',
		  classcardid: '',
		  classid: '',
		  schoolid: 1,
		  studentopenid: '',
		  studenttimes: 0,
		  studentmaxtimes: 0,
		  studentactive: 0,
	  },
	  classid: '',
	  classname : '',
	  schoolname: '广州萝岗万达店',
      schools: [],
	  textDisable: false,
    }
  },
  activated: function () {
	if(this.$route.params.classid != undefined)
		this.classid = this.$route.params.classid;

	if(this.$route.params.classid != undefined)
		this.classname = this.$route.params.classname;
		
	console.log(this.classid);
  },
  created() {
	
    request.getschools(this);
  },
  computed: {
    confirmText() {
		if (this.form.studentid == '') {
			return '确定';
		}

		this.textDisable = true;
		
		if (this.form.studentactive == 0) {
			mui.toast('提交成功,请等待 :-)');
			return '更新';
		}

		return '注册成功';
    }
  },
  methods: {
    submit() {
		this.form.classid = this.classid;
		
		console.log(this.form);
		
		if (this.form.studentname == '' || this.form.studentmobile == '' || this.form.classid == '')
		{
			mui.alert('姓名、电话、班级不能为空！', '向日葵艺术学生注册', function() {
						;
					});
			return;
		}
		
		request.poststudent(this);
    },
  },
  mounted() {
    mui.init();
  }
}
</script>
