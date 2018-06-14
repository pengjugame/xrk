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

exports.exist_school = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schools.exist_school, [schoolid]);
    });
}

exports.select_school = function() {
    return co(function*() {
        return operate_db(sql.schools.select_school, null);
    });
}

exports.select_school_active = function() {
    return co(function*() {
        return operate_db(sql.schools.select_school_active, null);
    });
}

exports.add_school = function(school) {
    return co(function*() {
        if (is_empty(school)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schools.add_school, school);
    });
}

exports.delete_school = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schools.delete_school, [schoolid]);
    });
}

exports.update_school_base = function(school) {
    return co(function*() {
        if (is_empty(school) || is_empty(school.schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schools.update_school_base, [school.schoolname, school.schooladdress, school.schoolleader, school.schoolmobile, school.schoolid]);
    });
}

exports.active_school = function(state, schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.schools.active_school:sql.schools.deactive_school, [schoolid]);
    });
}


