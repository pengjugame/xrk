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
  schools: get_url('/school/schools'),
  classcards: get_url('/classcard/classcards'),
  purchase: get_url('/purchases/purchase'),
}
