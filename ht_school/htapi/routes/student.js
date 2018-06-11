const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_students = require('../common/database/interface/i_students');
var i_teachers = require('../common/database/interface/i_teachers');
var i_school_admins = require('../common/database/interface/i_school_admins');

var {
    res_have_result,
    res_is_success,
    getHash,
    get_userinfo,
    is_empty,
    check_userinfo
} = require('../common/database/tool');
const config = require('config');
const tags = config.tags;

var router = express.Router();

router.get('/students', function(req, res, next) {
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

        const student_res = yield i_students.select_student_in_school(admin_res.result[0].schoolid);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(student_res.result);
        return Promise.resolve(true);
    });
});

router.put('/student', function(req, res, next) {
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

        const student_res = yield i_students.update_student_base(req.body);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.put('/studentactive', function(req, res, next) {
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

        const student_res = yield i_students.active_student(req.body.studentactive, req.body.studentid);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        if (req.body.studentactive == 1) {
            wxapi.moveUserToGroup(req.body.studentopenid, tags["学生"], function(err, data, res) {
                console.log("student moveUserToGroup: " + req.body.studentopenid + " err:" + err);
            });
        } else {
            wxapi.moveUserToGroup(req.body.studentopenid, 0, function(err, data, res) {
                console.log("delete moveUserToGroup: " + req.body.studentopenid + " err:" + err);
            });
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.get('/classstudents', function(req, res, next) {
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

        const student_res = yield i_students.select_student_in_class(req.query.classid);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(student_res.result);
        return Promise.resolve(true);
    });
});

router.put('/studenttimes', function(req, res, next) {
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

        const student_res = yield i_students.update_student_times(req.body.studenttimes,req.body.studentid);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

module.exports = router;