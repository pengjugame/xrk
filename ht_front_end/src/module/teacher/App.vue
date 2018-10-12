<template>
<div id="app" class="mui-content">

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div class="mui-card">
    <div class="mui-card-header">向舞教师注冊</div>
    
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>姓名：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入姓名" v-model.trim="form.teachername" >
      </div>

      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码" v-model.trim="form.teachermobile" >
      </div>

      <div class="mui-input-row" >
        <label>性别：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="form.teacherusex" >
          <label>男</label>
        </div>
        
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="form.teacherusex" >
          <label>女</label>
        </div>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>备注：</label>
        <textarea type="text" rows="2" class="mui-input-clear" placeholder="备注" v-model.trim="form.teacherdetails" />
      </div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" v-model="schoolname" readonly >
        <a href="#middlePopover" class="mui-navigate-right" ></a>
      </div>

      <div class="mui-button-row">
        <button type="button" id="submitid" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
      </div>

    </div>
    
    <div class="mui-card-footer">向舞</div>
  </div>

  <div id="middlePopover" class="mui-popover">
    <div class="mui-popover-arrow"></div>
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
      <ul class="mui-table-view mui-table-view-radio">
        <template v-for="school in schools">
          <li class="mui-table-view-cell mui-selected" v-if="school.schoolid == schoolid"  v-on:click="getschool(school)" >
            <a class="mui-navigate-right">{{school.schoolname}}</a>
          </li>
          <li class="mui-table-view-cell" v-else  v-on:click="getschool(school)" >
            <a class="mui-navigate-right">{{school.schoolname}}</a>
          </li>
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
        teacherid: '',
        teachername: '',
        teachermobile: '',
        teacherusex: 1,
        teacherdetails: '',
        schoolid: '1',
        teacheropenid: '',
        teacheractive: 0,
      },
      schoolid: '1',
      schoolname: '广州萝岗万达店',
      schools: [],

      updatestatus: 0,
    }
  },
  created() {
    request.getschools(this);
    request.getteacher(this);
  },
  computed: {
    confirmText() {
      if (this.form.teacherid == '') {
        return '确定';
      }

      if(this.form.teacheractive == 1){
        if(document.getElementById("submitid"))
            document.getElementById("submitid").disabled = "disabled"
        return '注册成功';
      }

      if(this.updatestatus == 0){
        return '更新';
      }

      mui.toast('提交成功,请等待 :-)');
      this.updatestatus = 0;
      return '更新';
    }
  },
  methods: {
    submit() {
      this.form.schoolid = this.schoolid;
      
      if (this.form.teachername == '' || this.form.teachermobile == '')
      {
        mui.alert('姓名、电话不能为空！', '向舞教师注冊', function() {
          ;
        });
        return;
      }

      if(this.form.teacherid == '')
        request.postteacher(this);
      else
        request.putselfteacher(this);
    },
    getschool(school){
      this.schoolid = school.schoolid;
      this.schoolname = school.schoolname;
    },
  },
  mounted() {
    mui.init();
    mui('.mui-scroll-wrapper').scroll();
  }
}
</script>

<style>
  .mui-popover {
    height: 50px;
  }
</style>
