<template>
  <div>

  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'courses'}" tag="a" ></router-link>
  </div>

  <div class="mui-card" >
    <div class="mui-card-header">向日葵艺术课程修改</div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text"  v-model.trim="course.coursename" class="mui-input-clear" placeholder="请输入课程名" >
      </div>
      
      <div class="mui-input-row" style="height: 70px" >
        <label>课程简介：</label>
        <textarea type="text"  rows="2" v-model.trim="course.coursedetails" class="mui-input-clear" placeholder="请输入课程简介"></textarea>
      </div>

      <div class="mui-input-row" >
        <label>状态：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="course.courseactive" >
          <label>未上架</label>
        </div>
        
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="course.courseactive" >
          <label>已上架</label>
        </div>
      </div>
      
      <div class="mui-button-row">
        <button type="button" id="delid" class="mui-btn mui-btn-warning" v-on:click="del" v-text="delText" ></button>
        <button type="button" id="submitid" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="updateText" ></button>
      </div>
      
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
  </div>
  
  </div>

</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
      course: {},

      updatestatus: 0,
      delstatus: 0,
    }
  },
  activated: function () {
    this.updatestatus = 0;
    this.delstatus = 0;

    if (this.updatestatus == 0) {
      if(document.getElementById("submitid"))
        document.getElementById("submitid").disabled = ""
    }

    if (this.delstatus == 0) {
      if(document.getElementById("delid"))
        document.getElementById("delid").disabled = ""
    }

    if(this.$route.params != undefined)
      this.course = this.$route.params;
    else
      return;
  },
  created() {
  },
  computed: {
    updateText() {
    if (this.updatestatus == 0) {
      if(document.getElementById("submitid"))
          document.getElementById("submitid").disabled = "";
      return '更新';
    }
    
    document.getElementById("submitid").disabled = "disabled";
    return '提交成功';
    },
  delText(){
    if (this.delstatus == 0) {
      if(document.getElementById("delid"))
          document.getElementById("delid").disabled = "";
      return '删除';
    }
    
    document.getElementById("submitid").disabled = "disabled";
    document.getElementById("delid").disabled = "disabled";
    return '提交成功';
  },
  },
  methods: {
    submit() {    
    if (this.course.coursename == '')
    {
      mui.alert('课程名不能为空！', '向日葵艺术课程修改', function() {
            ;
          });
      return;
    }
    
    request.putcourse(this);
    },
    del() {    
    if (this.course.courseid == '')
    {
      mui.alert('不能删除课程！', '向日葵艺术课程修改', function() {
            ;
          });
      return;
    }
    
    request.delcourse(this);
    },
  },
  mounted() {
    mui.init();
    mui(".mui-input-clear").input();
  }
}
</script>