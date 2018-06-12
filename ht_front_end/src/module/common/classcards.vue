<template>
  <div class="mui-card" v-for="classcard in classcards" >
    <div class="mui-card-header">{{classcard.classcardname}}</div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text" value="classcard.coursename" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>上课次数：</label>
        <input type="text" value="classcard.coursetimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课分钟：</label>
        <input type="text" value="classcard.coursetime" readonly>
      </div>
 
      <div class="mui-input-row" >
        <label>课程介绍：</label>
        <input type="text" value="classcard.coursedetails" readonly>
			</div>
    </div>

    <div class="mui-card-footer">
      <label>价格：{{classcard.classcardprice}} ¥</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">选&nbsp;&nbsp;择</a>
    </div>
  </div>
</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
      classcards: []
    }
  },
  created() {
    request.getclasscards(this);
  },
  computed: {
    confirmText() {
      this.note = '';
      if (this.form.adminid != '') {
        this.d_display = "none";
        this.border_width = 0;
        this.textDisable = true;
        if (this.form.active == 0) {
          this.note = '成功申请,请耐心等待审核';
        } else {
          this.note = '你已经是校长了';
        }
      }
      return '提交申请';
    }
  },
  name: "classcards",
  methods: {
    submit() {
      if (!this.$refs.ref_name.check() || !this.$refs.ref_tel.check()) {
        return;
      }

      request.adminRegister(this);
    }
  }
}

</script>

<style>
  .mui-popover {
    height: 50px;
  }
</style>
