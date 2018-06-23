<template>
  <div>

  <div class="mui-card">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'teachers'}" tag="a" ></router-link>
  </div>

  <div class="mui-card" >
    <div class="mui-card-header">
      <label>向日葵艺术教师修改</label>
      <img class="mui-media-object mui-pull-right round_icon" v-bind:src="teacher.headimgurl">
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>姓名：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入姓名" v-model="teacher.teachername" >
      </div>

      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码" v-model="teacher.teachermobile" >
      </div>

      <div class="mui-input-row">
        <label>性别：</label>
        <form class="mui-input-group">
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="teacher.teacherusex" >
          <label>男</label>
        </div>
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="teacher.teacherusex" >
          <label>女</label>
        </div>
        </form>
      </div>

      <div class="mui-input-row" >
        <label>备注：</label>
        <input type="text" class="mui-input-clear" placeholder="备注" v-model="teacher.teacherdetails" >
      </div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" v-model="schoolname" readonly >
        <a href="#middlePopover" class="mui-navigate-right" ></a>
      </div>

      <div class="mui-input-row">
        <label>状态：</label>
        <form class="mui-input-group">
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="teacher.teacheractive" >
          <label>离职</label>
        </div>
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="teacher.teacheractive" >
          <label>在职</label>
        </div>
        </form>
      </div>

      <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-warning" v-on:click="submit" v-text="confirmText" ></button>
      </div>
      
    </div>

    <div class="mui-card-footer">向日葵艺术</div>
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
      teacher: {},
      
      schoolid: 1,
      schoolname: '广州萝岗万达店',
      schools: [],

      updatestatus: 0,
    }
  },
  activated: function () {
    this.updatestatus = 0;
    if(this.$route.params != undefined)
      this.teacher = this.$route.params;
    else
      return;

    this.schoolid = this.$route.params.schoolid;
    this.schoolname = this.$route.params.schoolname;
  },
  created() {
    request.getschools(this);
  },
  computed: {
    confirmText() {
      if (this.updatestatus == 0)
      {
        if(document.getElementById("submitid"))
          document.getElementById("submitid").disabled = "";
        return '更新1';
      }
      
      document.getElementById("submitid").disabled = "disabled"
      return '提交成功';
    }
  },
  methods: {
    submit() {
      this.teacher.schoolid = this.schoolid;
      
      if (this.teacher.teachername == '' || this.teacher.teachermobile == '' || this.teacher.schoolid == '')
      {
        mui.alert('姓名、电话、学校不能为空！', '向日葵艺术教师修改', function() {
              ;
            });
        return;
      }
      
      request.putteacher(this);
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
  .round_icon {
    width: 34px;
    height: 34px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
