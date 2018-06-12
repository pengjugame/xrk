<template>
<div id="app" class="mui-content">
  <nav class="mui-bar mui-bar-tab">
    <a class="mui-tab-item mui-active" href="#main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">预购记录</span>
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
  <div class="mui-card" v-for="purchase in purchases" >
    <div class="mui-card-header">
      <label>向日葵课卡预购记录</label>
      <a class="active mui-pull-right" v-if="purchase.purchaseactive == '1'" ><span class="mui-icon mui-icon-checkmarkempty"></span></a>
      <a class="mui-pull-right" v-else ><span class="mui-icon mui-icon-checkmarkempty"></span></a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>姓名：</label>
        <input type="text"  v-model="purchase.purchasename" readonly>
      </div>

      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text"  v-model="purchase.purchasemobile" readonly>
      </div>

      <div class="mui-input-row">
        <label>性别：</label> 
        <input type="text" v-if="purchase.purchaseusex == '0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row" >
          <label>学员备注：</label>
					<input type="text" v-model="purchase.purchasedetails" readonly>
			</div>

      <div class="mui-input-row">
        <label>上课时间：</label>
        <input type="text" v-model="purchase.purchasedatatime" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课地点：</label>
        <input type="text" v-model="purchase.purchaseaddress" readonly>
      </div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="purchase.classcardid" readonly>
      </div>
 
      <div class="mui-input-row" >
          <label>支付方式：</label>
					<input type="text" v-model="purchase.paydetails" readonly>
			</div>
    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:submit.prevent="submit(purchase)" v-if="purchase.purchaseactive == '0'" >确认</button>
    </div>
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

</div>
</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
      purchases: [],
      classcards: [],
    }
  },
  created() {
    request.getpurchases(this);
    request.getclasscards(this);
  },
  computed: {
  },
  methods: {
    submit(purchase) {
      request.putpurchaseactive(purchase);
    }
  },
  mounted() {
    mui.init();
	}
}
</script>

<style>
  .mui-popover {
    height: 50px;
  }
  .mui-content a.active {
    color: #08ec54f8;
  }
</style>
