<template>

  <div class="mui-card" v-for="student in students" >
    <div class="mui-card-header">
      <label>学生记录</label>
      <a class="active mui-pull-right">{{student.studentname}}</a>
    </div>

    <div class="mui-card-content mui-input-group ">
      <div class="mui-input-row">
        <label>手机：</label>
        <input type="text"  v-model="student.studentmobile" readonly>
      </div>

      <div class="mui-input-row">
        <label>性别：</label> 
        <input type="text" v-if="student.studentusex == '0'" value="男" readonly>
        <input type="text" v-else value="女" readonly>
      </div>

      <div class="mui-input-row" >
          <label>学生备注：</label>
					<input type="text" v-model="student.studentdetails" readonly>
			</div>

      <div class="mui-input-row">
        <label>课卡：</label>
        <input type="text" v-model="student.classcardid" readonly>
      </div>

      <div class="mui-input-row">
        <label>剩余课次：</label>
        <input type="text" v-model="student.studenttimes" readonly>
      </div>

      <div class="mui-input-row">
        <label>班级：</label>
        <input type="text"  class="mui-input-clear" placeholder="输入班级ID" v-model="student.classid" >
      </div>

    </div>

    <div class="mui-card-footer">
      <label>向日葵艺术</label>
      <button type="button" class="mui-btn mui-btn-warning mui-pull-right" v-on:submit.prevent="submit(student)" >确认</button>
    </div>
  </div>

</template>

<script>
import * as request from 'src/js/request'
import * as tool from 'src/js/util'

export default {
  data() {
    return {
      students: [],
    }
  },
  created() {
    request.getclassstudents(this);
  },
  computed: {
  },
  methods: {
    submit(student) {
      request.putstudent(student);
    }
  },
  mounted() {
    mui.init();
	}
}
</script>
