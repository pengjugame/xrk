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

exports.select_workclasses = function(classid) {
    return co(function*() {
        if (is_empty(classid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workclasses.select_workclasses, [classid]);
    });
}

exports.add_workclass = function(workclass) {
    return co(function*() {
        if (is_empty(workclass)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workclasses.add_workclass, workclass);
    });
}

exports.delete_workclass = function(workclassid) {
    return co(function*() {
        if (is_empty(workclassid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workclasses.delete_workclass, [workclassid]);
    });
}

exports.update_workclass = function(workclass) {
    return co(function*() {
        if (is_empty(workclass) || is_empty(workclass.workclassid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workclasses.update_workclass, [workclass.workclasstime,workclass.workclassdetails,workclass.classid,workclass.teacherid,workclass.workclassid]);
    });
}

exports.active_workclass = function(state,workclassid) {
    return co(function*() {
        if (is_empty(workclassid)) {
            return Promise.resolve(null);
        }
        return operate_db(state?sql.workclasses.active_workclass:sql.workclasses.deactive_workclass, [workclassid]);
    });
}


