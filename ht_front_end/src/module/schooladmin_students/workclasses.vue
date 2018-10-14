<template>
  <div >
  <div class="mui-card-header" style="height: 40px" >
    <router-link class=" mui-icon mui-icon-left-nav mui-pull-left " style="font-size:16px;" :to="{ name:'classstudents' }" tag="a" >返回</router-link>
    <button class="mui-btn mui-btn-success mui-icon mui-icon-plusempty mui-pull-right" v-on:click="add()" >开课</button>
  </div>

  <div class="mui-card" v-for="workclass in workclasses" >

    <div class="mui-card-header" >
      <label>班级开课时间表</label>
    </div>

    <div class="mui-card-content mui-input-group " >

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

      <div class="mui-input-row" >
        <label>上课时间：</label>
        <a class=" active mui-icon-extra mui-icon-extra-outline " style="width:10%;float:right;padding-top:8px"  v-on:click="gettime(workclass)" ></a>
        <input type="text" style="width:55%;float:right" v-model="workclass.workclassdetails" readonly>
      </div>

    </div>

    <div class="mui-card-footer" >
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
import "vue-awesome-mui/mui/examples/hello-mui/css/mui.picker.min.css";
import "vue-awesome-mui/mui/examples/hello-mui/js/mui.picker.min.js";

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
      var today = new Date();
      var time = today.getFullYear() +'年 '+ (today.getMonth()+1) +'月 '+ today.getDate() +'日 '+ today.getHours() +'时 '+ today.getMinutes() +'分';
      workclass.workclassdetails = time;
      request.postworkclass(this,workclass);
    },
    gettime(workclass){
      var picker = new mui.DtPicker({"type":"datetime"});
      picker.show(function(rs) {
          workclass.workclassdetails = rs.y.text +'年 '+ rs.m.text +'月 '+ rs.d.text +'日 '+ rs.h.text +'时 '+ rs.i.text +'分';
      });
    },
  },
  mounted() {
    mui.init();
  }
}
</script>
