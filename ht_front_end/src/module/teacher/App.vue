<template>
<div id="app" class="mui-content">

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div class="mui-card">
    <div class="mui-card-header">向日葵艺术教师申请</div>
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>姓名：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入姓名" v-model="form.teacherid" :disabled=textDisable >
      </div>

      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码" v-model="form.teachermobile" :disabled=textDisable >
      </div>

      <div class="mui-input-row" v-if="textDisable==false" >
        <label>性别：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="form.teacherusex" >
          <label>男</label>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="form.teacherusex" checked >
          <label>女</label>
        </div>
      </div>
      <div class="mui-input-row" v-else >
        <label>性别：</label> 
        <input type="text" v-if="form.teacherusex=='0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row" >
          <label>备注：</label>
					<input type="text" class="mui-input-clear" placeholder="备注" v-model="form.schooladmindetails" :disabled=textDisable >
			</div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" value="广州萝岗万达店" v-model="schoolname" readonly :disabled=textDisable>
        <a href="#middlePopover" class="mui-navigate-right" :style="{display:btn_display}" ></a>
      </div>
      
      <div class="mui-button-row">
          <button type="button"   :disabled=textDisable class="mui-btn mui-btn-warning" v-on:submit.prevent="submit" v-text="confirmText" ></button>
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
        teacherid: '',
        teachername: '',
        teachermobile: '',
        teacherusex: '',
        schoolid: '1',
        teacheropenid: '',
        teacheractive: 0,
      },
      schoolname: '广州萝岗万达店',
      schools: [],
      btn_display: 'block',
      textDisable: false,
    }
  },
  created() {
    request.getschools(this);
    request.getteacher(this);
  },
  computed: {
    confirmText() {
      if (this.form.teachername == '') {
        return '确定';
      }

      this.btn_display = "none";
      this.textDisable = true;

      if (this.form.teacheractive == 0) {
        mui.toast('申请成功,请等待审核 ^_^');
        return '申请成功';
      }
      
      return '审核成功';
    }
  },
  methods: {
    submit() {
      if (this.form.teachername == '' || this.form.teachermobile == '')
      {
        mui.alert('姓名、电话不能为空！', '向日葵艺术教师申请', function() {
					;
				});
        return;
      }

      request.postteacher(this);
    }
  },
  mounted() {
    mui.init();

    mui('.mui-scroll-wrapper').scroll();

    document.getElementById('schoolsid').addEventListener('selected',function(e){
      this.schoolname = e.detail.el.innerText;
		});
	}
}
</script>

<style>
  .mui-popover {
    height: 50px;
  }
</style>
