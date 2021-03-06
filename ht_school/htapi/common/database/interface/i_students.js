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

exports.select_student_by_studentdetails_studentmobile = function(studentdetails,studentmobile) {
    return co(function*() {
        if (is_empty(studentdetails) || is_empty(studentmobile)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_by_studentdetails_studentmobile, [studentdetails,studentmobile]);
    });
}

exports.select_student_by_studentname_studentmobile_class = function(studentname,studentmobile,classid) {
    return co(function*() {
        if (is_empty(studentname) || is_empty(studentmobile) || is_empty(classid) ) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_by_studentname_studentmobile_class, [studentname,studentmobile,classid]);
    });
}

exports.select_student = function(studentid) {
    return co(function*() {
        if (is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student, [studentid]);
    });
}

exports.select_student_in_class = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_in_class, [classid]);
    });
}

exports.select_student_in_class_active = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_in_class_active, [classid]);
    });
}

exports.select_student_in_school = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.select_student_in_school, [schoolid]);
    });
}

exports.add_student = function(student) {
    return co(function*() {
        if (is_empty(student)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.add_student, student);
    });
}

exports.update_student_base = function(student) {
    return co(function*() {
        if (is_empty(student) || 
            is_empty(student.studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_base, [student.studentname,student.studentmobile,student.studentusex,student.studentage,student.studentdetails,student.classcardid,student.classid,student.schoolid,student.studenttimes,student.studentmaxtimes,student.studentactive,student.studentid]);
    });
}

exports.update_student_times = function(studenttimes,studentid) {
    return co(function*() {
        if (studenttimes < 0 || 
            is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_times,[studenttimes,studentid]);
    });
}

exports.update_student_class = function(classid,studentid) {
    return co(function*() {
        if (is_empty(classid) || 
            is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.update_student_class,[classid,studentid]);
    });
}

exports.delete_student = function(studentid) {
    return co(function*() {
        if (is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.students.delete_student, [studentid]);
    });
}

exports.active_student = function(state,studentid) {
    return co(function*() {
        if (is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.students.active_student:sql.students.deactive_student, [studentid]);
    });
}


