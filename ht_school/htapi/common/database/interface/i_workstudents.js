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

exports.select_workstudents = function(workclassid) {
    return co(function*() {
        if (is_empty(workclassid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.select_workstudents, [workclassid]);
    });
}

exports.select_workstudent = function(studentid) {
    return co(function*() {
        if (is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.select_workstudent, [studentid]);
    });
}

exports.select_workstudent_by_workclass = function(workclassid,studentid) {
    return co(function*() {
        if (is_empty(workclassid) || is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.select_workstudent_by_workclass, [workclassid,studentid]);
    });
}

exports.add_workstudent = function(workstudent) {
    return co(function*() {
        if (is_empty(workstudent)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.add_workstudent, workstudent);
    });
}

exports.delete_workstudent = function(workstudentid) {
    return co(function*() {
        if (is_empty(workstudentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.delete_workstudent, [workstudentid]);
    });
}

exports.delete_workstudent_by_workclass = function(workclassid) {
    return co(function*() {
        if (is_empty(workclassid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.delete_workstudent_by_workclass, [workclassid]);
    });
}

exports.update_workstudent = function(workstudent) {
    return co(function*() {
        if (is_empty(workstudent) || is_empty(workstudent.workstudentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudents.update_workstudent, [workstudent.workstudentstatus,workstudent.workstudentdetails,workstudent.workclassid,workstudent.studentid,workstudent.workstudentid]);
    });
}


