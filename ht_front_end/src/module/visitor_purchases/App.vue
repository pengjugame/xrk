<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">预购</span>
    </a>
    <a class="mui-tab-item" href="#classcardsview">
      <span class="mui-icon mui-icon-list"></span>
      <span class="mui-tab-label">课卡</span>
    </a>
  </nav>

  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:30vw;background-image:url(./logo.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div id="main" class="mui-control-content mui-active ">
  <div class="mui-card">
    <div class="mui-card-header">向日葵课卡预购</div>
    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>姓名：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入姓名" v-model="form.purchasename" >
      </div>

      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码" v-model="form.purchasemobile" >
      </div>

      <div class="mui-input-row">
        <label>性别：</label> 
        <div class=" mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="0" v-model="form.purchaseusex" >
          <label>男</label>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="mui-radio mui-pull-left mui-left">
          <input name="radio" type="radio" value="1" v-model="form.purchaseusex" checked>
          <label>女</label>
        </div>
      </div>

      <div class="mui-input-row" >
          <label>学生备注：</label>
					<input type="text" class="mui-input-clear" placeholder="学生备注" v-model="form.purchasedetails" >
			</div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" class="mui-input-clear" placeholder="希望上课时间" v-model="form.purchasedatatime" >
      </div>

      <div class="mui-input-row">
        <label>上课地点：</label>
        <input type="text" class="mui-input-clear" placeholder="希望上课地点" v-model="form.purchaseaddress" >
      </div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" class="mui-input-clear" v-model="form.classcardid" placeholder="填写课卡ID">
      </div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" value="广州萝岗万达店" v-model="schoolname" readonly>
        <a href="#middlePopover" class="mui-navigate-right" ></a>
      </div>
 
      <div class="mui-input-row" >
          <label>支付方式：</label>
					<input type="text" class="mui-input-clear" placeholder="支付方式" v-model="form.paydetails" >
			</div>
      
      <div class="mui-button-row">
          <button type="button" :disabled=textDisable class="mui-btn mui-btn-warning" v-on:submit.prevent="submit" v-text="confirmText" ></button>
      </div>

    </div>
    <div class="mui-card-footer">向日葵艺术</div>
  </div>
  </div>

  <div id="classcardsview" class="mui-control-content">
  <div class="mui-card" v-for="classcard in classcards" >
    <div class="mui-card-header">
      <label>{{classcard.classcardname}}</label>
      <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">课卡ID：{{classcard.classcardid}}</a>
      </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>课程名称：</label>
        <input type="text" v-model="classcard.coursename" readonly>
      </div>
      
      <div class="mui-input-row">
        <label>上课次数：</label>
        <input type="text" v-model="classcard.coursetimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课分钟：</label>
        <input type="text" v-model="classcard.coursetime" readonly>
      </div>
 
      <div class="mui-input-row" >
        <label>课程介绍：</label>
        <input type="text" v-model="classcard.coursedetails" readonly>
			</div>
    </div>

    <div class="mui-card-footer">
      <label>价格：{{classcard.classcardprice}} ¥</label>
    </div>
  </div>
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
        purchaseid: '',
        purchasename: '',
        purchasemobile: '',
        purchaseusex: '',
        purchasedetails: '',
        classcardid: '1',
        purchaseaddress: '',
        purchasedatatime: '',
        schoolid: '1',
        purchaseopenid: '',
        paydetails: '',
        purchaseactive: 0,
      },
      schoolname: '广州萝岗万达店',
      schools: [],
      classcards: [],
      textDisable: false,
    }
  },
  created() {
    request.getschools(this);
    request.getclasscards(this);
  },
  computed: {
    confirmText() {
      if (this.form.purchasename == '') {
        return '确定';
      }

      this.textDisable = true;

      if (this.form.purchaseactive == 0) {
        mui.toast('申请成功,请等待审核 ^_^');
        return '预购申请中...';
      }
      
      return '预购审核成功';
    }
  },
  methods: {
    submit() {
      if (this.form.classcardid == '' || this.form.purchasename == '' || this.form.purchasemobile == '')
      {
        mui.alert('课卡ID、姓名、电话不能为空！', '向日葵艺术预购', function() {
					;
				});
        return;
      }

      request.postpurchase(this);
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
