const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_teachers = require('../common/database/interface/i_teachers');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_classes = require('../common/database/interface/i_classes');
var i_students = require('../common/database/interface/i_students');
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


router.get('/classes', function(req, res, next) {
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

        const class_res = yield i_classes.select_teacher_classes(teacher_res.result[0].teacherid);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(class_res.result);
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
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.post('/', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var param = {
            "teachername": req.body.teachername,
            "teachermobile": req.body.teachermobile,
            "teacherusex": req.body.teacherusex,
            "teacherdetails": req.body.teacherdetails,
            "schoolid": req.body.schoolid,
            "teacheropenid": userinfo.openid,
            "teacheractive": 0
        }
        param['teacherid'] = getHash(JSON.stringify(param));

        const register_res = yield i_teachers.add_teacher(param);
        if (!res_is_success(register_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["teacherid"] = param.teacherid;
        res.send(response);

        return Promise.resolve(true);
    });
});

module.exports = router;
