<template>
  <div>

  <div class="mui-card">
    <router-link class="mui-icon mui-icon-plusempty mui-pull-right" :to="{ name:'purchase'}" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-if="purchases == false">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" style="height:80vw;background-image:url(./purchases_none.png);background-size:cover;background-position:center;"></div>
    </div>
  </div>

  <div class="mui-card" v-for="purchase in purchases" >

    <div class="mui-card-header">
      <label>{{purchase.purchasename}}</label>
      <label class=" mui-pull-right">预购ID：{{purchase.purchaseid}}</label>
      <img class="mui-media-object mui-pull-right round_icon" v-bind:src="purchase.headimgurl">
    </div>

    <div class="mui-card-content mui-input-group ">
      
      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text"  v-model="purchase.purchasemobile" readonly>
      </div>

      <div class="mui-input-row">
        <label>性别：</label> 
        <input type="text" v-if="purchase.purchaseusex == '0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row">
        <label>年龄：</label>
        <input type="text"  v-model="purchase.purchaseage" readonly>
      </div>

      <div class="mui-input-row" >
        <label>上课时间：</label>
        <input type="text" v-model="purchase.purchasedatatime" readonly>
      </div>

      <div class="mui-input-row" >
        <label>上课地点：</label>
        <input type="text" v-model="purchase.purchaseaddress" readonly>
      </div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="purchase.classcardname" readonly >
      </div>
      
      <div class="mui-input-row">
        <label>校区：</label>
        <input type="text" v-model="purchase.schoolname" readonly >
      </div>

      <div class="mui-input-row" >
        <label>支付方式：</label>
        <input type="text" v-model="purchase.paydetails" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>预购备注：</label>
        <textarea type="text" rows="2" v-model="purchase.purchasedetails" readonly />
      </div>

      <div class="mui-input-row">
        <label>状态：</label>
        <input type="text" v-if="purchase.purchaseactive==0" value="未确认" readonly>
        <input type="text" v-else value="已确认" style="color:#31e207" readonly>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <router-link v-if="purchase.purchaseactive == 0 " class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'modpurchase', params: purchase }" tag="button" >修改预购</router-link>
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
    }
  },
  activated: function () {
    request.getvisitorpurchases(this);
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    mui.init();
  }
}
</script>

<style>
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
