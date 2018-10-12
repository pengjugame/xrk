<template>

  <div>
  <div class="mui-card-header" style="height: 40px" v-if="classcards == false">
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:fromname }" tag="a" >返回</router-link>
  </div>

  <div class="mui-card" v-for="cla in classcards" >
    <div class="mui-card-header">
      <label>{{cla.classcardname}}</label>
      <label class="mui-pull-right">课卡ID：{{cla.classcardid}}</label>
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
    
      <div class="mui-input-row" style="height: 70px" >
        <label>备注：</label>
        <textarea type="text" rows="2" v-model="cla.classcarddetails" readonly />
      </div>

    </div>

    <div class="mui-card-footer">
      <label>价格：{{cla.classcardprice}} ￥</label>
      <router-link v-if="cla.classcardactive == 1 " class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:fromname, params: cla }" tag="button" >选择</router-link>
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
      fromname:'',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromname = from.name;
      request.getclasscardsbycourse(vm,vm.$route.params.courseid);
    });
  },
  activated: function () {
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
