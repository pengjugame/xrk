/** @module 教学点码表数据接口 */
'use strict';

const co = require('co');
const sql = require('../sql')
const {
    is_empty,
	verify_openid,
} = require('../tool')
const {
    operate_db
} = require('../db_handle')

exports.exist_student = function(openid) {
    return co(function*() {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.exist_student, [openid]);
    });
}

exports.select_student_by_class_openid = function(classid,studentopenid) {
    return co(function*() {
        if (!verify_openid(studentopenid) || is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_by_class_openid, [classid,studentopenid]);
    });
}

exports.select_student = function(studentid) {
    return co(function*() {
        if (!verify_openid(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student, [studentid]);
    });
}

exports.select_student_in_class = function(classid) {
    return co(function*() {
        if (!verify_openid(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_in_class, [classid]);
    });
}

exports.select_student_in_school = function(schoolid) {
    return co(function*() {
        if (!verify_openid(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_in_school, [schoolid]);
    });
}

exports.add_student = function(student) {
    return co(function*() {
        if (is_empty(student) || 
            !verify_openid(student.studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.add_student, student);
    });
}

exports.update_student_base = function(student) {
    return co(function*() {
        if (is_empty(student) || 
            !verify_openid(student.studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_base, [student.studentname,student.studentmobile,student.studentusex,student.studentdetails,student.classcardid,student.classid,student.schoolid,student.studenttimes,student.studentmaxtimes,student.studentid]);
    });
}

exports.update_student_times = function(studenttimes,studentid) {
    return co(function*() {
        if (is_empty(studenttimes) || 
            !verify_openid(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_times,[studenttimes,studentid]);
    });
}

exports.update_student_class = function(classid,studentid) {
    return co(function*() {
        if (is_empty(classid) || 
            !verify_openid(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_class,[classid,studentid]);
    });
}

exports.active_student = function(state,studentid) {
    return co(function*() {
        if (is_empty(state) ||
            verify_openid(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.students.active_student:sql.students.deactive_student, [studentid]);
    });
}


