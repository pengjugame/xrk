/** @module 用户表数据接口 */
'use strict';

const sql = require('../sql')
const {
    verify_openid
} = require('../tool')
const co = require('co');
const {
    operate_db
} = require('../db_handle')

exports.exist_user = function(openid) {
    return co(function*() {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.users.exist_user, [openid]);
    });
}

exports.select_user_subscribe = function() {
    return operate_db(sql.users.select_user_subscribe,null);
}

exports.add_user = function(user) {
    return operate_db(sql.users.add_user, user);
}

exports.update_user_subscribe = function(state, openid) {
    return co(function*() {
        if (!verify_openid(openid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.users.update_user_subscribe:sql.users.update_user_unsubscribe, [openid]);
    });
}