/** @module 学校管理员表数据接口 */
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
const schools = require('./i_schools')
const users = require('./i_users')

exports.exist_schooladmin = function(openid) {
    return co(function * () {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schooladmins.exist_schooladmin, [openid]);
    });
}

exports.select_schooladmin_in_school = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schooladmins.select_schooladmin_in_school, [schoolid]);
    });
}

exports.select_schooladmin_in_school_active = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.schooladmins.select_schooladmin_in_school_active, [schoolid]);
    });
}

exports.add_schooladmin = function(schooladmin) {
    return co(function * () {
        if (is_empty(schooladmin)) {
            return Promise.resolve(null);
        }
        
        return operate_db(sql.schooladmins.add_schooladmin, schooladmin);
    });
}

exports.update_schooladmin_base = function(schooladmin) {
    return co(function * () {
        if (is_empty(schooladmin) || 
            is_empty(schooladmin.schooladminid)) {
            return Promise.resolve(null);
        }

        return operate_db(sql.schooladmins.update_schooladmin_base, [schooladmin.schooladminname,schooladmin.schooladminmobile,schooladmin.schooladminusex,schooladmin.schoolid,schooladmin.schooladminactive,schooladmin.schooladminid]);
    });
}

exports.active_schooladmin = function(state,schooladminid) {
    return co(function * () {
        if (is_empty(state) ||
            is_empty(schooladminid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.schooladmins.active_schooladmin:sql.schooladmins.deactive_schooladmin, [schooladminid]);
    });
}