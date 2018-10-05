const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_workclasses = require('../common/database/interface/i_workclasses');
var i_workstudents = require('../common/database/interface/i_workstudents');
var i_workstudenttimes = require('../common/database/interface/i_workstudenttimes');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_teachers = require('../common/database/interface/i_teachers');
var i_students = require('../common/database/interface/i_students');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();

router.get('/workstudenttimes', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const workstudenttime_res = yield i_workstudenttimes.select_workstudenttimes(req.query.studentid);
        if (!res_have_result(workstudenttime_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(workstudenttime_res.result);
        return Promise.resolve(true);
    });
});

router.post('/workstudenttime', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const teacher_res = yield i_teachers.exist_teacher(userinfo.openid)
        if (!res_have_result(teacher_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_old_res = yield i_students.select_student(req.body.studentid);
        if (!res_have_result(student_old_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        if(student_old_res.result[0].studenttimes == req.body.studenttimes){
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var today = new Date();
        var time = today.getFullYear() +'年 '+ (today.getMonth()+1) +'月 '+ today.getDate() +'日 '+ today.getHours() +'时'+ today.getMinutes() +'分';

        var param = {
            "studentid": req.body.studentid,
            "teacherid": teacher_res.result[0].teacherid,
            "studentpretimes": student_old_res.result[0].studenttimes,
            "studentcurtimes": req.body.studenttimes,
            "workstudenttime": time,
        }

        if(req.body.studenttimes > student_old_res.result[0].studenttimes){
            param.workstudenttimedetails = "赠送 " + (req.body.studenttimes - student_old_res.result[0].studenttimes) + " 次课";
        }else{
            param.workstudenttimedetails = "用掉 " + (student_old_res.result[0].studenttimes - req.body.studenttimes) + " 次课";
        }

        const workstudenttime_res = yield i_workstudenttimes.add_workstudenttime(param);
        if (!res_is_success(workstudenttime_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["workstudenttimeid"] = workstudenttime_res.result.insertId;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.put('/workstudenttime', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid);
        if (!res_have_result(admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var param = {
            "workstudentid": req.body.workstudentid,
            "studentid": req.body.studentid,
            "teacherid": req.body.teacherid,
            "studentpretimes": req.body.studentpretimes,
            "studentcurtimes": req.body.studentcurtimes,
            "workstudenttime": req.body.workstudenttime,
            "workstudenttimedetails": req.body.workstudenttimedetails,
        }

        const workstudenttime_res = yield i_workstudenttimes.update_workstudenttime(param);
        if (!res_is_success(workstudenttime_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["updatestatus"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.delete('/workstudenttime', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid);
        if (!res_have_result(admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const workstudenttime_res = yield i_workstudenttimes.delete_workstudenttime(req.query.workstudenttimeid);
        if (!res_is_success(workstudenttime_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["delstatus"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
