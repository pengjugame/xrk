const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_students = require('../common/database/interface/i_students');
var i_teachers = require('../common/database/interface/i_teachers');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_classes = require('../common/database/interface/i_classes');
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

router.get('/studentbyclass', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.select_student_by_class_openid(req.query.classid,userinfo.openid);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(student_res.result);
        return Promise.resolve(true);
    });
});

router.put('/studentbyclass', function(req, res, next) {
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

        const res = yield i_students.update_student_class(req.body.classid,req.body.studentid);
        if (!res_is_success(res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.post('/student', function(req, res, next) {
    return co(function*() {

        var param = {
            "studentname": req.body.studentname,
            "studentmobile": req.body.studentmobile,
            "studentusex": req.body.studentusex,
            "studentdetails": req.body.studentdetails,
			"classid": req.body.classid,
            "schoolid": req.body.schoolid,
            "studenttimes": 0,
			"studentmaxtimes": 0,
            "studentactive": 0,
        }
		
		const exit_res = yield i_students.select_student_by_studentdetails_studentmobile(param.studentdetails,param.studentmobile);
        if (res_have_result(exit_res)) {
            var response = ""
			response = htapi_code(true);
			response["studentid"] = -1;
			res.send(response);
            return Promise.resolve(true);
        }
		
        const student_res = yield i_students.add_student(param);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
		
        const class_res = yield i_classes.select_class(param.classid);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
		
		const class_update_res = yield i_classes.update_class_numusers(class_res.result[0].classnumusers+1,param.classid);
        if (!res_is_success(class_update_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
		
        var response = ""
        response = htapi_code(true);
        response["studentid"] = student_res.result.insertId;
        res.send(response);

        return Promise.resolve(true);
    });
});

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
