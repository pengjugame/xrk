const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_courses = require('../common/database/interface/i_courses');
var i_school_admins = require('../common/database/interface/i_school_admins');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();

router.get('/courses', function(req, res, next) {
    return co(function*() {
        const course_res = yield i_courses.select_courses();
        if (!res_have_result(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(course_res.result);
        return Promise.resolve(true);
    });
});

router.post('/course', function(req, res, next) {
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
            "coursename": req.body.coursename,
            "coursedetails": req.body.coursedetails,
            "courseactive": 1
        }

        const course_res = yield i_courses.add_course(param);
        if (!res_is_success(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["courseid"] = course_res.result.insertId;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.put('/course', function(req, res, next) {
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
            "courseid": req.body.courseid,
            "coursename": req.body.coursename,
            "coursedetails": req.body.coursedetails,
            "courseactive": req.body.courseactive,
        }

        const course_res = yield i_courses.update_course_base(param);
        if (!res_is_success(course_res)) {
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

router.delete('/course', function(req, res, next) {
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

        const course_res = yield i_courses.delete_course(req.body.courseid);
        if (!res_is_success(course_res)) {
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

router.put('/courseactive', function(req, res, next) {
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

        const course_res = yield i_courses.active_course(req.body.courseactive, req.body.courseid);
        if (!res_is_success(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["courseactive"] = req.body.courseactive;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
