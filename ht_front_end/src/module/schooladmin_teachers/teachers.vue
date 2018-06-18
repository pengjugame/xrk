<template>

  <div>
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
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:click="submit(teacher)" v-if="teacher.teacheractive==0" >确认</button>
      <router-link class="mui-btn mui-btn-warning mui-pull-right" :to="{ name:'teacher', params: teacher }" tag="button" >教师管理</router-link>
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
    }
  },
  created() {
    request.getteachers(this);
  },
  computed: {
  },
  methods: {
    submit(teacher) {
      request.putteacheractive(teacher);
    }
  },
  mounted() {
    mui.init();
  }
}
</script>
