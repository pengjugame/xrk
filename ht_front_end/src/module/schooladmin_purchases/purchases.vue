<template>
  <div>

  <div class="mui-card" v-for="purchase in purchases" >

    <div class="mui-card-header">
      <label>{{purchase.purchasename}}</label>
      <label class=" mui-pull-right">预购ID：{{purchase.purchaseid}}</label>
      <img class="mui-media-object mui-pull-right round_icon" v-bind:src="purchase.headimgurl">
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

      <div class="mui-input-row">
        <label>年龄：</label>
        <input type="text"  v-model="purchase.purchaseage" readonly>
      </div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="purchase.classcardname" readonly >
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'modpurchase', params: purchase }" tag="button" >修改预购</router-link>
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
    request.getpurchases(this);
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
