/** @module 学校管理员表数据接口 */
'use strict';

const sql = require('../sql')
const co = require('co');
const {
    verify_openid,
    is_empty,
    res_have_result
} = require('../tool')
const {
    operate_db
} = require('../db_handle')
const schools = require('./i_schools')
const users = require('./i_users')

exports.exist_teacher = function(openid) {
    return co(function*() {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.teachers.exist_teacher, [openid]);
    });
}

exports.select_teacher_in_school = function(schoolid) {
    return co(function*() {
        if (verify_openid(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.teachers.select_teacher_in_school, [schoolid]);
    });
}

exports.select_teacher_in_school_active = function(schoolid) {
    return co(function*() {
        if (verify_openid(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.teachers.select_teacher_in_school_active, [schoolid]);
    });
}

exports.add_teacher = function(teacher) {
    return co(function*() {
        if (is_empty(teacher) || 
            !verify_openid(teacher.teacherid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.teachers.add_teacher, teacher);
    });
}

exports.update_teacher_base = function(teacher) {
    return co(function*() {
        if (is_empty(teacher) || 
            !verify_openid(teacher.teacherid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.teachers.update_teacher_base, [teacher.teachername,teacher.teachermobile,teacher.teacherusex,teacher.teacherdetails,teacher.schoolid,teacher.teacherid]);
    });
}

exports.active_teacher = function(state,teacherid) {
    return co(function*() {
        if (is_empty(state) ||
            !verify_openid(teacherid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.teachers.active_teacher:sql.teachers.deactive_teacher, [teacherid]);
    });
}