<template>
  <div>
  <div class="mui-card">
    <router-link class="mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:'classstudents' }" tag="a" ></router-link>
    <a class="active mui-icon mui-icon-plusempty mui-pull-right" v-on:click="add()" />
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

      <div class="mui-input-row" style="height: 70px" >
        <label>开课备注：</label>
        <textarea type="text"  rows="2" v-model="workclass.workclassdetails" readonly></textarea>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <button type="button" id="delid" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="del(workclass)" >删除</button>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'workstudents', params: workclass }" tag="button" >编辑</router-link>
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
