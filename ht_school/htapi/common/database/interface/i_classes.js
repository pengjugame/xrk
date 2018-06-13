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

exports.select_class = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_class, [classid]);
    });
}

exports.select_class_active = function() {
    return co(function*() {
        return operate_db(sql.classes.select_class_active, null);
    });
}

exports.select_student_classes = function(openid) {
    return co(function*() {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_student_classes, [openid]);
    });
}

exports.select_teacher_classes = function(teacherid) {
    return co(function*() {
        if (!verify_openid(teacherid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_teacher_classes, [teacherid]);
    });
}

exports.select_school_classes = function(schoolid) {
    return co(function*() {
        if (!verify_openid(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_school_classes, [schoolid]);
    });
}

exports.select_class_students = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_class_students, [classid]);
    });
}

exports.select_school_students = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.select_school_students, [schoolid]);
    });
}

exports.add_class = function(cla) {
    return co(function*() {
        if (is_empty(cla) || is_empty(cla.classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.add_class, cla);
    });
}

exports.delete_class = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.delete_class, [classid]);
    });
}

exports.update_class_base = function(cla) {
    return co(function*() {
        if (is_empty(cla) || is_empty(cla.classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.update_class_base, [cla.classname , cla.classaddress , cla.classtime , cla.courseid , cla.classmaxnumusers , cla.classnumusers , cla.teacherid , cla.schoolid , cla.classid]);
    });
}

exports.update_class_numusers = function(classnumusers,classid) {
    return co(function*() {
        if (is_empty(cla) || is_empty(cla.classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classes.update_class_numusers, [classnumusers,classid]);
    });
}

exports.active_class = function(state, classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.classes.active_class:sql.classes.deactive_class, [classid]);
    });
}


