<template>

  <div>
	<div class="mui-card" v-if="classcards == false">
		<router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'purchase' }" tag="a" ></router-link>
	</div>

  <div class="mui-card" v-for="cla in classcards" >
    <div class="mui-card-header">
      <label>{{cla.classcardname}}</label>
      <label class="mui-action-back mui-pull-right">课卡ID：{{cla.classcardid}}</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>课程类别：</label>
        <input type="text" v-model="cla.coursename" readonly>
      </div>
    
      <div class="mui-input-row">
        <label>课程次数：</label>
        <input type="text" v-model="cla.classcardtimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>课次时间：</label>
        <input type="text" v-model="cla.classcardtime" readonly>
      </div>
    
      <div class="mui-input-row" >
        <label>备注：</label>
        <input type="text" v-model="cla.classcarddetails" readonly>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>价格：{{cla.classcardprice}} ￥</label>
      <router-link v-if="cla.classcardactive == 1 " class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'purchase', params: cla }" tag="button" >选择</router-link>
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
	  request.getclasscardsbycourse(this,this.$route.params.courseid);
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
