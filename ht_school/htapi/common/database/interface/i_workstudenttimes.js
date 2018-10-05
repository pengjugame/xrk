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

exports.select_workstudenttimes = function(studentid) {
    return co(function*() {
        if (is_empty(studentid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudenttimes.select_workstudenttimes, [studentid]);
    });
}

exports.add_workstudenttime = function(workstudenttime) {
    return co(function*() {
        if (is_empty(workstudenttime)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudenttimes.add_workstudenttime, workstudenttime);
    });
}

exports.delete_workstudenttime = function(workstudenttimeid) {
    return co(function*() {
        if (is_empty(workstudenttimeid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudenttimes.delete_workstudenttime, [workstudenttimeid]);
    });
}

exports.update_workstudenttime = function(workstudenttime) {
    return co(function*() {
        if (is_empty(workstudenttime) || is_empty(workstudenttime.workstudenttimeid)) {
            return Promise.resolve(null);
        }
        return operate_db(sql.workstudenttimes.update_workstudenttime, [workstudenttime.studentpretimes,workstudenttime.studentcurtimes,workstudenttime.workstudenttime,workstudenttime.workstudenttimedetails,workstudenttime.studentid,workstudenttime.teacherid,workstudenttime.workstudenttimeid]);
    });
}


