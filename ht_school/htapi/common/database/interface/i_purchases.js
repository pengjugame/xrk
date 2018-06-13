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

exports.exist_purchase = function() {
    return co(function*() {
        return operate_db(sql.purchases.exist_purchase, null);
    });
}

exports.select_purchase = function(purchaseopenid) {
    return co(function*() {
        if (!verify_openid(purchaseopenid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.select_purchase, [purchaseopenid]);
    });
}

exports.select_purchase_in_school = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.select_purchase_in_school, [schoolid]);
    });
}

exports.select_purchase_in_school_active = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.select_purchase_in_school_active, [schoolid]);
    });
}

exports.select_purchase_in_school_deactive = function(schoolid) {
    return co(function*() {
        if (is_empty(schoolid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.select_purchase_in_school_deactive, [schoolid]);
    });
}

exports.add_purchase = function(purchase) {
    return co(function*() {
        if (is_empty(purchase) || !verify_openid(purchase.purchaseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.add_purchase, purchase);
    });
}

exports.delete_purchase = function(purchaseid) {
    return co(function*() {
        if (!verify_openid(purchaseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.delete_purchase, [purchaseid]);
    });
}

exports.update_purchase_base = function(purchase) {
    return co(function*() {
        if (is_empty(purchase) || !verify_openid(purchase.purchaseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.update_purchase_base, 
        [purchase.purchasename , purchase.purchasemobile , purchase.purchaseusex , purchase.purchasedetails , purchase.purchaseaddress , 
        purchase.purchasedatatime , purchase.schoolid , purchase.classcardid , purchase.paydetails , purchase.purchaseid]);
    });
}

exports.active_purchase = function(paytime,studentid,purchaseid) {
    return co(function*() {
        if (is_empty(paytime) || !verify_openid(studentid) || !verify_openid(purchaseid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.purchases.active_purchase, [paytime,studentid,purchaseid]);
    });
}
