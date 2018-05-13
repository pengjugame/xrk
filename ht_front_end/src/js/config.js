'use strict'

//var get_url = function(url) {
//  return (/localhost/.test(window.location.href))
//    ? 'http://localhost:80/' + url.replace('/htapi/', '')
//    : url;
//};
var get_url = function(url) {
  return 'http://119.29.90.92/' + url.replace('/htapi/', '')
};
export const route = {
  school: get_url('/htapi/school'),
  admin: get_url('/htapi/admin'),
  teacher: get_url('/htapi/teacher'),
  teacher_all: get_url('/htapi/teacher/all'),
  children_of_parent: get_url('/htapi/parent/children'),
  // teachers_with_schoolid:'/htapi/teacher/with_schoolid'),
  parent: get_url('/htapi/parent'),
  children: get_url('/htapi/children'),
  userinfo: get_url('/htapi/userinfo'),
  register: get_url('/htapi/register'),
  register_all: get_url('/htapi/register/all'),
  register_free: get_url('/htapi/register/free'),
  register_free_all: get_url('/htapi/register/free/all'),
  check: get_url('/htapi/check'),
  check_children: get_url('/htapi/check/children')
}
