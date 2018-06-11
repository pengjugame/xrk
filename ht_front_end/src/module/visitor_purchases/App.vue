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
          <label>学员备注：</label>
					<input type="text" class="mui-input-clear" placeholder="学员备注" v-model="form.purchasedetails" >
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
        <input type="text" v-model="form.classcardid" placeholder="填写课卡ID">
      </div>

      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" value="广州萝岗万达店" readonly v-model="schoolname" v-bind:value="form.schoolid" >
        <a href="#middlePopover" class="mui-navigate-right" ></a>
      </div>
 
      <div class="mui-input-row" >
          <label>支付方式：</label>
					<input type="text" class="mui-input-clear" placeholder="支付方式" v-model="paydetails" >
			</div>
      
      <div class="mui-button-row">
          <button type="button" class="mui-btn mui-btn-warning" @click="submit" v-text="confirmText" >确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
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

      <div class="mui-input-row">
        <label>上课最大人数：</label>
        <input type="text" v-model="classcard.coursemaxnumusers" readonly>
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
          <li class="mui-table-view-cell" v-for="school in schools" v-bind:value="school.schoolid" >
            {{school.schoolname}}
          </li>
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
      schoolname: '',
      schools: [],
      classcards: [],
    }
  },
  created() {
    request.getschools(this);
    request.getclasscards(this);
  },
  computed: {
    confirmText() {
      if (this.form.purchaseid != '') {
        mui.toast('预购成功,请等待审核 ^_^');
        return '继续预购';
      }
              
      mui.alert('预购失败，请正确填写课卡ID！', '向日葵艺术预购', function() {
					;
			});
      return '重新预购';
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

      request.pustpurchase(this);
    }
  },
  mounted() {
			mui.init();
			
			mui.plusReady(function () {});
			
			mui('.mui-scroll-wrapper').scroll();

			mui('body').on('shown', '.mui-popover', function(e) {
			});

			mui('body').on('hidden', '.mui-popover', function(e) {
			});

      document.getElementById('schoolsid').addEventListener('selected',function(e){
        console.log('当前选中的为：',e.detail.el.innerText);//detail为当前popover元素
		  });
		}
}

</script>

<style>
  .mui-popover {
    height: 50px;
  }
</style>
