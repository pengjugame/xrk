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

exports.select_classcard_active = function() {
    return co(function*() {
        return operate_db(sql.classcards.select_classcard_active, null);
    });
}

exports.select_student_classcards = function(studentid) {
    return co(function*() {
        if (!verify_openid(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.select_student_classcards, [studentid]);
    });
}

exports.select_class_students_classcards = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.select_class_students_classcards, [classid]);
    });
}

exports.select_school_students_classcards = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.select_school_students_classcards, [schoolid]);
    });
}

exports.add_classcard = function(classcard) {
    return co(function*() {
        if (is_empty(classcard)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.add_classcard, classcard);
    });
}

exports.delete_classcard = function(classcardid) {
    return co(function*() {
        if (is_empty(classcardid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.delete_classcard, [classcardid]);
    });
}

exports.update_classcard_base = function(classcard) {
    return co(function*() {
        if (is_empty(classcard) || is_empty(classcard.classcardid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.classcards.update_classcard_base, [classcard.classcardname , classcard.classcardprice , classcard.classcardtimes , classcard.classcardtime , classcard.courseid , classcard.classcardid]);
    });
}

exports.active_classcard = function(state, classcardid) {
    return co(function*() {
        if (is_empty(classcardid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.classcards.active_classcard:sql.classcards.deactive_classcard, [classcardid]);
    });
}


