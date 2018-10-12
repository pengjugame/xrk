<template>
  <div>
  <div class="mui-card-header" style="height: 40px" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'classstudents' }" tag="a" >返回</router-link>
    <button class="mui-btn mui-btn-success mui-icon mui-icon-plusempty mui-pull-right" v-on:click="add()" >开课</button>
  </div>

  <div class="mui-card" v-for="workclass in workclasses" >

    <div class="mui-card-header">
      <label>班级开课时间表</label>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
        <label>班级名称：</label>
        <input type="text"  v-model="workclass.classname" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课时间：</label>
        <input type="text"  v-model="workclass.workclasstime" readonly>
      </div>

      <div class="mui-input-row">
        <label>开课老师：</label>
        <input type="text"  v-model="workclass.teachername" readonly>
      </div>

      <div class="mui-input-row">
        <label>上课状态：</label>
        <input type="text" v-if="workclass.workclassactive==0" value="已上课" readonly>
        <input type="text" v-else value="未上课" style="color:#31e207" readonly>
      </div>

      <div class="mui-input-row" style="height: 70px" >
        <label>上课备注：</label>
        <textarea type="text"  rows="2" v-model="workclass.workclassdetails" ></textarea>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向舞</label>
      <button type="button" id="delid" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="del(workclass)" >删除</button>
      <button type="button" id="updateid" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="update(workclass)" >更新</button>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'workstudents', params: workclass }" tag="button" >查看</router-link>
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
      workclasses: [],
      classid: "",
    }
  },
  activated: function () {
    if(this.$route.params.classid != undefined)
      this.classid = this.$route.params.classid;
    else
      return;
    request.getworkclasses(this);
  },
  created() {
  },
  computed: {
  },
  methods: {
    del(workclass) {
      request.delworkclass(this,workclass);
    },
    update(workclass) {
      request.putworkclass(this,workclass);
      mui.toast('提交成功 :-)');
    },
    add(){
      var workclass = {};
      workclass.classid = this.classid;
      var vm = this;

      var btnArray = ['取消', '确定'];
      mui.prompt('请输入开课备注：', '上课时间、地点', '开  课', btnArray, function(e) {
        if (e.index == 1) {
          workclass.workclassdetails = e.value;
          request.postworkclass(vm,workclass);
        }
      })
    },
  },
  mounted() {
    mui.init();
  }
}
</script>
