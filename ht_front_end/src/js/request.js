'use strict'

import * as http from './http'

import {
  route
} from './config'
import {
  have_result,
  getParams,
  getBirthday,
  years_of_age,
  res_is_success,
  is_empty
} from './util'

//获取用户信息
function userInfo() {
  //:如果用户第一次进入系统 必须先通过userinfo 查询到相关数据 存入到session中
  let code = getParams('?code')
  let openid = getParams('?openid') || 0
  let params = {}
  params.code = code
  if (openid) {
    params.openid = openid
  }
  return new Promise((resolve, reject) => {
    http.get(route.userinfo, params).then((res) => {
      resolve(res)
    }, (err) => {
      reject(err)
    })
  })
}

export const getschools = (vm) => {
  http.get(route.schools).then((res) => {
    vm.schools = res.data
  }, (err) => {
    console.log(err);
  })
}

export const getclasscards = (vm) => {
  http.get(route.classcards).then((res) => {
    vm.classcards = res.data
  }, (err) => {
    console.log(err);
  })
}

export const getvisitorpurchases = (vm) => {
  userInfo().then((res) => {
    http.get(route.studentpurchases).then((res) => {
      if (res_is_success(res)) {
        vm.purchases = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const postpurchase = (vm) => {
  userInfo().then((res) => {
    http.post(route.purchase, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.purchaseid = res.data.purchaseid
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putpurchase = (vm) => {
  userInfo().then((res) => {
    http.put(route.purchase, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.updatestatus = res.data.updatestatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getpurchases = (vm) => {
  userInfo().then((res) => {
    http.get(route.purchases).then((res) => {
      if (res_is_success(res)) {
        vm.purchases = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putpurchaseactive = (purchase) => {
  userInfo().then((res) => {
    http.put(route.purchaseactive, purchase).then((res) => {
      if (res_is_success(res)) {
        purchase.purchaseactive = res.data.purchaseactive
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getschooladmin = (schooladmin) => {
  userInfo().then((res) => {
    http.get(route.schooladmin).then((res) => {
      if (res_is_success(res)) {
        schooladmin = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const postschooladmin = (vm) => {
  userInfo().then((res) => {
    http.post(route.schooladmin, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.schooladminid = res.data.schooladminid
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getteacher = (teacher) => {
  userInfo().then((res) => {
    http.get(route.teacher).then((res) => {
      if (res_is_success(res)) {
        teacher = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const postteacher = (vm) => {
  userInfo().then((res) => {
    http.post(route.teacher, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.teacherid = res.data.teacherid
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getstudents = (vm) => {
  userInfo().then((res) => {
    http.get(route.students).then((res) => {
      if (res_is_success(res)) {
        vm.students = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putstudent = (student) => {
  userInfo().then((res) => {
    http.put(route.student, student).then((res) => {
      if (res_is_success(res)) {
        ;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getclasses = (vm) => {
    http.get(route.classes).then((res) => {
      if (res_is_success(res)) {
        vm.classes = res.data
      }
    }, (err) => {
      console.log(err);
    })
}

export const getcourses = (vm) => {
  http.get(route.courses).then((res) => {
    vm.courses = res.data
  }, (err) => {
    console.log(err);
  })
}

export const postclasscard = (vm) => {
  userInfo().then((res) => {
    http.post(route.classcard, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.classcardid = res.data.classcardid;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const postcourse = (vm) => {
  userInfo().then((res) => {
    http.post(route.course, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.courseid = res.data.courseid;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putteacheractive = (teacher) => {
  userInfo().then((res) => {
    http.put(route.teacheractive, teacher).then((res) => {
      if (res_is_success(res)) {
        teacher.teacheractive = res.data.teacheractive
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getteachers = (vm) => {
  userInfo().then((res) => {
    http.get(route.teachers).then((res) => {
      if (res_is_success(res)) {
        vm.teachers = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getteacherclasses = (vm) => {
  userInfo().then((res) => {
    http.get(route.teacherclasses).then((res) => {
      if (res_is_success(res)) {
        vm.classes = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getclassstudents = (vm,classid) => {
  userInfo().then((res) => {
	let params = {}
	params.classid = classid
    http.get(route.classstudents,params).then((res) => {
      if (res_is_success(res)) {
        vm.students = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putstudenttimes = (student) => {
  userInfo().then((res) => {
    http.put(route.studenttimes, student).then((res) => {
      if (res_is_success(res)) {
        ;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getstudentclasses = (vm) => {
  userInfo().then((res) => {
    http.get(route.studentclasses).then((res) => {
      if (res_is_success(res)) {
        vm.classes = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getstudentbyclass = (vm,classid) => {
  userInfo().then((res) => {
	let params = {}
	params.classid = classid
    http.get(route.studentbyclass,params).then((res) => {
      if (res_is_success(res)) {
        vm.student = res.data
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putstudentclass = (student) => {
  userInfo().then((res) => {
    http.put(route.studentbyclass, student).then((res) => {
      if (res_is_success(res)) {
        ;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const poststudent = (vm) => {
    http.post(route.student, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.studentid = res.data.studentid
      }
    }, (err) => {
      console.log(err);
    })
}

export const postclass = (vm) => {
  userInfo().then((res) => {
    http.post(route.class, vm.form).then((res) => {
      if (res_is_success(res)) {
        vm.form.classid = res.data.classid;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getclassesbycourse = (vm,courseid) => {
	let params = {}
	params.courseid = courseid
    http.get(route.classesbycourse,params).then((res) => {
      if (res_is_success(res)) {
        vm.classes = res.data
      }
    }, (err) => {
      console.log(err);
    })
}

export const getclasscardsbycourse = (vm,courseid) => {
	let params = {}
	params.courseid = courseid
    http.get(route.classcardsbycourse,params).then((res) => {
      if (res_is_success(res)) {
        vm.classcards = res.data
      }
    }, (err) => {
      console.log(err);
    })
}