/** @module 教学点码表数据接口 */
'use strict';

const co = require('co');
const sql = require('../sql')
const {
    is_empty
} = require('../tool')
const {
    operate_db
} = require('../db_handle')

exports.select_course = function(courseid) {
    return co(function*() {
        if (is_empty(courseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.courses.select_course, [courseid]);
    });
}

exports.select_courses = function() {
    return co(function*() {
        return operate_db(sql.courses.select_courses, null);
    });
}

exports.select_active_courses = function() {
    return co(function*() {
        return operate_db(sql.courses.select_active_courses, null);
    });
}

exports.add_course = function(course) {
    return co(function*() {
        if (is_empty(course)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.courses.add_course, course);
    });
}

exports.delete_course = function(courseid) {
    return co(function*() {
        if (is_empty(courseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.courses.delete_course, [courseid]);
    });
}

exports.update_course_base = function(course) {
    return co(function*() {
        if (is_empty(course) || is_empty(course.courseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.courses.update_course_base, [course.coursename,course.coursedetails,course.courseid]);
    });
}

exports.active_course = function(state, courseid) {
    return co(function*() {
        if (is_empty(courseid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.courses.active_course:sql.courses.deactive_course, [courseid]);
    });
}


