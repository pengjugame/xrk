<template>
  <div>
  <div class="mui-card">
    <router-link class="mui-icon mui-icon-plusempty mui-pull-right" :to="{ name:'classcard' }" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-for="classcard in classcards" >
    <div class="mui-card-header">
      <label>{{classcard.classcardname}}</label>
      <label class=" mui-pull-right">课卡ID：{{classcard.classcardid}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课程类别：</label>
        <input type="text" v-model="classcard.coursename" readonly>
      </div>
    
      <div class="mui-input-row">
        <label>课程次数：</label>
        <input type="text" v-model="classcard.classcardtimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>课次时间：</label>
        <input type="text" v-model="classcard.classcardtime" readonly>
      </div>
    
      <div class="mui-input-row" >
        <label>备注：</label>
        <input type="text" v-model="classcard.classcarddetails" readonly>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>价格：{{classcard.classcardprice}} ￥</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'modclasscard', params: classcard }" tag="button" >修改课卡</router-link>
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
      classcards: [],
    }
  },
  activated: function () {
    request.getclasscards(this);
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
