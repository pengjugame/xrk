<template>
  <div>

  <div class="mui-card-header" style="height: 40px" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'courses'}" tag="a" >返回</router-link>
  </div>

  <div class="mui-card" >
    <div class="mui-card-header">向舞课程新建</div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text"  v-model.trim="form.coursename" class="mui-input-clear" placeholder="请输入课程名" >
      </div>
      
      <div class="mui-input-row" style="height: 70px" >
        <label>课程简介：</label>
        <textarea type="text" rows="2" v-model.trim="form.coursedetails" class="mui-input-clear" placeholder="请输入课程简介"></textarea>
      </div>

      <div class="mui-input-row" >
        <label>状态：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="form.courseactive" >
          <label>未上架</label>
        </div>
        
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="form.courseactive" >
          <label>已上架</label>
        </div>
      </div>
      
      <div class="mui-button-row">
        <button type="button" id="submitid" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
      </div>
      
    </div>

    <div class="mui-card-footer">向舞</div>
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
      courseid: '',
      coursename: '',
      coursedetails: '',
      courseactive: 1,
    },
    }
  },
  activated: function () {
    this.form.courseid = '';
  },
  created() {
  },
  computed: {
    confirmText() {
    if (this.form.courseid == '') {
        if(document.getElementById("submitid"))
          document.getElementById("submitid").disabled = "";
      return '确定';
    }

    if(document.getElementById("submitid"))
      document.getElementById("submitid").disabled = "disabled"
    return '提交成功';
    }
  },
  methods: {
    submit() {
    if (this.form.coursename == '')
    {
      mui.alert('课程名不能为空！', '向舞课程新建', function() {
        ;
      });
      return;
    }
    
    request.postcourse(this);
    },
  },
  mounted() {
    mui.init();
    mui(".mui-input-clear").input();
  }
}
</script>