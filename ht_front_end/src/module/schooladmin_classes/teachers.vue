<template>

  <div>

  <div class="mui-card" v-if="teachers == false">
    <router-link class="mui-icon mui-icon-left-nav mui-pull-left" :to="{ name:fromname }" tag="a" ></router-link>
  </div>

  <div class="mui-card" v-for="teacher in teachers" >
    <div class="mui-card-header">
      <label>{{teacher.teachername}}</label>
      <a class="active mui-pull-right" v-if="teacher.teacheractive==1" ><span class="mui-icon mui-icon-checkmarkempty"></span></a>
      <a class="mui-pull-right" v-else ><span class="mui-icon mui-icon-checkmarkempty"></span></a>
    </div>

    <div class="mui-card-content mui-input-group ">

      <div class="mui-input-row">
      <label>教师手机：</label>
      <input type="text"  v-model="teacher.teachermobile" readonly>
      </div>

      <div class="mui-input-row">
      <label>教师性别：</label> 
      <input type="text" v-if="teacher.teacherusex==0" value="男" readonly>
      <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row" >
      <label>教师备注：</label>
      <input type="text" v-model="teacher.teacherdetails" readonly>
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:fromname, params: teacher }" tag="button" >选择</router-link>
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
      teachers: [],
      fromname: '',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromname = from.name;
    });
  },
  created() {
    request.getteachers(this);
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
