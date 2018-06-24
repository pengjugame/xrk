'use strict'

//var get_url = function(url) {
//  return (/localhost/.test(window.location.href))
//    ? 'http://localhost:80/' + url.replace('/htapi/', '')
//    : url;
//};
var get_url = function(url) {
  return 'http://119.29.90.92' + url
};
export const route = {
  userinfo: get_url('/userinfo'),
  schools: get_url('/school/schools'),
  classcards: get_url('/classcard/classcards'),
  purchases: get_url('/purchase/purchases'),
  purchase: get_url('/purchase/purchase'),
  purchaseactive: get_url('/purchase/purchaseactive'),
  schooladmin: get_url('/schooladmin'),
  teacher: get_url('/teacher'),
  students: get_url('/student/students'),
  student: get_url('/student/student'),
  classes: get_url('/class/classes'),
  class: get_url('/class/class'),
  courses: get_url('/course/courses'),
  classcard: get_url('/classcard/classcard'),
  course: get_url('/course/course'),
  teacheractive: get_url('/teacher/teacheractive'),
  teachers: get_url('/teacher/teachers'),
  classstudents: get_url('/student/classstudents'),
  studenttimes: get_url('/student/studenttimes'),
  teacherclasses: get_url('/class/teacherclasses'),
  studentclasses: get_url('/class/studentclasses'),
  studentbyclass: get_url('/student/studentbyclass'),
  classesbycourse: get_url('/class/classesbycourse'),
  classcardsbycourse: get_url('/classcard/classcardsbycourse'),
  studentpurchases: get_url('/purchase/studentpurchases'),
  allcourses: get_url('/course/allcourses'),
};
