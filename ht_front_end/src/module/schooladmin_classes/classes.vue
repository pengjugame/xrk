<template>
  <div>

  <div class="mui-card">
    <span class="mui-pull-left mui-badge mui-badge-success">{{studentnum}}</span>
    <router-link class="mui-icon mui-icon-plusempty mui-pull-right" :to="{ name:'class'}" tag="a" ></router-link>
  </div>

  <div class="mui-content">
    <div class="mui-card">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse" v-for="cla in classes" >
          <a class="mui-navigate-right" href="#">
            {{cla.classname}}&nbsp;
            <span class="mui-badge mui-badge-warning">{{cla.classnumusers}}</span>
          </a>
            <div class="mui-collapse-content">
              <form class="mui-input-group">
                <div class="mui-input-row">
                  <label>课程名：</label>
                  <input type="text" v-model="cla.coursename" readonly>
                </div>

                <div class="mui-input-row">
                  <label>上课日期：</label>
                  <input type="text" v-model="cla.classdate" readonly>
                </div>
              
                <div class="mui-input-row">
                  <label>上课时间：</label>
                  <input type="text" v-model="cla.classtime" readonly>
                </div>
              
                <div class="mui-input-row" >
                  <label>最大人数：</label>
                  <input type="text" v-model="cla.classmaxnumusers" readonly>
                </div>

                <div class="mui-input-row" >
                  <label>当前人数：</label>
                  <input type="text" v-model="cla.classnumusers" readonly>
                </div>
              
                <div class="mui-input-row" style="height: 70px" >
                  <label>班级备注：</label>
                  <textarea type="text" rows="2" v-model="cla.classdetails" readonly />
                </div>

                <div class="mui-input-row" >
                  <label>教师：</label>
                  <input type="text" v-model="cla.teachername" readonly>
                </div>

                <div class="mui-input-row" >
                  <label>校区：</label>
                  <input type="text" v-model="cla.schoolname" readonly>
                </div>

                <div class="mui-button-row">
                  <router-link class="mui-btn mui-btn-warning " :to="{ name:'modclass', params: cla }" tag="button" >修改班级</router-link>
                </div>
              </form>
            </div>
        </li>
      </ul>
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
      classes: [],
      studentnum: 0,
    }
  },
  activated: function () {
    request.getclasses(this);
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
