const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_workclasses = require('../common/database/interface/i_workclasses');
var i_workstudents = require('../common/database/interface/i_workstudents');
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

router.get('/workstudents', function(req, res, next) {
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

        const workstudent_res = yield i_workstudents.select_workstudents(req.query.workclassid);
        if (!res_have_result(workstudent_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(workstudent_res.result);
        return Promise.resolve(true);
    });
});

router.get('/workstudent', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.exist_student(userinfo.openid)
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const workstudent_res = yield i_workstudents.select_workstudent(req.query.studentid);
        if (!res_have_result(workstudent_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(workstudent_res.result);
        return Promise.resolve(true);
    });
});

router.get('/workstudentbyworkclass', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.exist_student(userinfo.openid)
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const workstudent_res = yield i_workstudents.select_workstudent_by_workclass(req.query.workclassid,req.query.studentid);
        if (!res_have_result(workstudent_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(workstudent_res.result);
        return Promise.resolve(true);
    });
});

router.put('/workstudent', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var param = {
            "workstudentid": req.body.workstudentid,
            "workclassid": req.body.workclassid,
            "studentid": req.body.studentid,
            "workstudentstatus": req.body.workstudentstatus,
            "workstudentdetails": req.body.workstudentdetails,
        }

        const workstudent_res = yield i_workstudents.update_workstudent(param);
        if (!res_is_success(workstudent_res)) {
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

router.delete('/workstudent', function(req, res, next) {
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

        const workstudent_res = yield i_workstudents.delete_workstudent(req.query.workstudentid);
        if (!res_is_success(workstudent_res)) {
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
