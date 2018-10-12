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

export const getclasscards = (vm) => {
  vm.classcards = [];
  http.get(route.classcards).then((res) => {
    vm.classcards = res.data
  }, (err) => {
    console.log(err);
  })
}

export const getclasscardsbycourse = (vm,courseid) => {
  let params = {}
  params.courseid = courseid
  vm.classcards = [];
  http.get(route.classcardsbycourse,params).then((res) => {
      if (res_is_success(res)) {
        vm.classcards = res.data
      }
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

export const putclasscard = (vm) => {
  userInfo().then((res) => {
    http.put(route.classcard, vm.classcard).then((res) => {
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

export const delclasscard = (vm) => {
  let params = {}
  params.classcardid = vm.classcard.classcardid
  userInfo().then((res) => {
    http.del(route.classcard, params).then((res) => {
      if (res_is_success(res)) {
        vm.delstatus = res.data.delstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

/***********************************************************/

export const getclasses = (vm) => {
  vm.classes = [];
  userInfo().then((res) => {
    http.get(route.classes).then((res) => {
      if (res_is_success(res)) {
        vm.classes = res.data;
        vm.studentnum = 0;
        for (var i in vm.classes)
          vm.studentnum += vm.classes[i].classnumusers;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getteacherclasses = (vm) => {
  vm.classes = [];
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

export const getstudentclasses = (vm) => {
  vm.classes = [];
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

export const getclassesbycourse = (vm,courseid) => {
  let params = {}
  params.courseid = courseid
  vm.classes = [];
  http.get(route.classesbycourse,params).then((res) => {
    if (res_is_success(res)) {
      vm.classes = res.data
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

export const putclass = (vm) => {
  userInfo().then((res) => {
    http.put(route.class, vm.cla).then((res) => {
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

export const delclass = (vm) => {
  let params = {}
  params.classid = vm.cla.classid
  userInfo().then((res) => {
    http.del(route.class, params).then((res) => {
      if (res_is_success(res)) {
        vm.delstatus = res.data.delstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

/*****************************************************/

export const getcourses = (vm) => {
  vm.courses = [];
  http.get(route.courses).then((res) => {
    vm.courses = res.data
  }, (err) => {
    console.log(err);
  })
}

export const getallcourses = (vm) => {
  vm.courses = [];
  http.get(route.allcourses).then((res) => {
    vm.courses = res.data
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

export const putcourse = (vm) => {
  userInfo().then((res) => {
    http.put(route.course, vm.course).then((res) => {
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

export const delcourse = (vm) => {
  let params = {}
  params.courseid = vm.course.courseid
  userInfo().then((res) => {
    http.del(route.course, params).then((res) => {
      if (res_is_success(res)) {
        vm.delstatus = res.data.delstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

/******************************************************/

export const getschools = (vm) => {
  vm.schools = [];
  http.get(route.schools).then((res) => {
    vm.schools = res.data;
  }, (err) => {
    console.log(err);
  })
}

/******************************************************/

function userInfo() {
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

/******************************************************/

export const getvisitorpurchases = (vm) => {
  vm.purchases = [];
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
    http.put(route.purchase, vm.purchase).then((res) => {
      if (res_is_success(res)) {
        vm.updatestatus = res.data.updatestatus;
        vm.activestatus = vm.purchase.purchaseactive;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getpurchases = (vm) => {
  vm.purchases = [];
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

export const putpurchaseactive = (vm) => {
  userInfo().then((res) => {
    http.put(route.purchaseactive, vm.purchase).then((res) => {
      if (res_is_success(res)) {
        vm.purchaseactive = res.data.purchaseactive;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const delpurchase = (vm) => {
  let params = {}
  params.purchaseid = vm.purchase.purchaseid
  userInfo().then((res) => {
    http.del(route.purchase, params).then((res) => {
      if (res_is_success(res)) {
        vm.delstatus = res.data.delstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

/******************************************************/

export const getschooladmin = (vm) => {
  userInfo().then((res) => {
    http.get(route.schooladmin).then((res) => {
      if (res_is_success(res)) {
        vm.form = res.data;
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
        vm.form.schooladminid = res.data.schooladminid;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putschooladmin = (vm) => {
  userInfo().then((res) => {
    http.put(route.schooladmin, vm.form).then((res) => {
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

/*******************************************************/

export const getteacher = (vm) => {
  userInfo().then((res) => {
    http.get(route.teacher).then((res) => {
      if (res_is_success(res)) {
        vm.form = res.data
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

export const putteacheractive = (teacher) => {
  userInfo().then((res) => {
    http.put(route.teacheractive, teacher).then((res) => {
      if (res_is_success(res)) {
        teacher.teacheractive = res.data.teacheractive;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putteacher = (vm) => {
  userInfo().then((res) => {
    http.put(route.teacher, vm.teacher).then((res) => {
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

export const putselfteacher = (vm) => {
  userInfo().then((res) => {
    http.put(route.teacher, vm.form).then((res) => {
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

export const getteachers = (vm) => {
  vm.teachers = [];
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

/******************************************************/

export const getstudents = (vm) => {
  vm.students = [];
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

export const putstudent = (vm) => {
  userInfo().then((res) => {
    http.put(route.student, vm.student).then((res) => {
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

export const getclassstudents = (vm,classid) => {
  vm.students = [];
  let params = {}
  params.classid = classid
  userInfo().then((res) => {
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

export const putstudenttimes = (vm,student) => {
  userInfo().then((res) => {
    http.put(route.studenttimes, student).then((res) => {
      if (res_is_success(res)) {
        vm.updatestudenttimesstatus = res.data.updatestudenttimesstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getstudentbyclass = (vm,classid) => {
  vm.student = {};
  let params = {}
  params.classid = classid
  userInfo().then((res) => {
    http.get(route.studentbyclass,params).then((res) => {
      if (res_is_success(res)) {
        vm.student = res.data;
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

export const delstudent = (vm) => {
  let params = {}
  params.studentid = vm.student.studentid;
  userInfo().then((res) => {
    http.del(route.student, params).then((res) => {
      if (res_is_success(res)) {
        vm.delstatus = res.data.delstatus;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getworkstudenttimes = (vm) => {
  vm.workstudenttimes = [];
  let params = {}
  params.studentid = vm.student.studentid;
  userInfo().then((res) => {
    http.get(route.workstudenttimes,params).then((res) => {
      if (res_is_success(res)) {
        vm.workstudenttimes = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getworkclasses = (vm) => {
  vm.workclasses = [];
  let params = {}
  params.classid = vm.classid;
  userInfo().then((res) => {
    http.get(route.workclasses,params).then((res) => {
      if (res_is_success(res)) {
        vm.workclasses = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const postworkclass = (vm,workclass) => {
    http.post(route.workclass, workclass).then((res) => {
      if (res_is_success(res)) {
        getworkclasses(vm)
      }
    }, (err) => {
      console.log(err);
    })
}

export const delworkclass = (vm,workclass) => {
  let params = {}
  params.workclassid = workclass.workclassid;
  userInfo().then((res) => {
    http.del(route.workclass, params).then((res) => {
      if (res_is_success(res)) {
        getworkclasses(vm)
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putworkclass = (vm,workclass) => {
  userInfo().then((res) => {
    http.put(route.workclass, workclass).then((res) => {
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

export const getworkstudents = (vm) => {
  vm.workstudents = [];
  let params = {}
  params.workclassid = vm.workclass.workclassid;
  userInfo().then((res) => {
    http.get(route.workstudents,params).then((res) => {
      if (res_is_success(res)) {
        vm.workstudents = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const getworkstudent = (vm) => {
  vm.workstudentclasses = [];
  let params = {}
  params.studentid = vm.student.studentid;
  userInfo().then((res) => {
    http.get(route.workstudent,params).then((res) => {
      if (res_is_success(res)) {
        vm.workstudentclasses = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}

export const putworkstudent = (workstudent) => {
    http.put(route.workstudent, workstudent).then((res) => {
      if (res_is_success(res)) {
      }
    }, (err) => {
      console.log(err);
    })
}

export const putworkclassactive = (vm) => {
    let params = {}
    params.workclassid = vm.workclass.workclassid;
    http.put(route.workclassactive, params).then((res) => {
      if (res_is_success(res)) {
        vm.workclass.workclassactive = res.data.workclassactive;
      }
    }, (err) => {
      console.log(err);
    })
}

export const getworkstudentbyworkclass = (vm) => {
  vm.workstudents = [];
  let params = {}
  params.workclassid = vm.workclass.workclassid;
  params.studentid = vm.student.studentid;
  userInfo().then((res) => {
    http.get(route.workstudentbyworkclass,params).then((res) => {
      if (res_is_success(res)) {
        vm.workstudents = res.data;
      }
    }, (err) => {
      console.log(err);
    })
  }, (err) => {
    console.log(err);
  })
}