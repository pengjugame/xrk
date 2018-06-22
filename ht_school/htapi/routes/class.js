const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_students = require('../common/database/interface/i_students');
var i_teachers = require('../common/database/interface/i_teachers');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_classes = require('../common/database/interface/i_classes');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();

router.get('/studentclasses', function(req, res, next) {
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

        const student_classes_res = yield i_classes.select_student_classes(userinfo.openid);
        if (!res_have_result(student_classes_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(student_classes_res.result);
        return Promise.resolve(true);
    });
});

router.get('/teacherclasses', function(req, res, next) {
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

router.get('/classes', function(req, res, next) {
    return co(function*() {
        /*const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }*/

        /*const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid);
        if (!res_have_result(admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }*/
    
        const class_res = yield i_classes.select_school_classes(1);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(class_res.result);
        return Promise.resolve(true);
    });
});

router.get('/classesbycourse', function(req, res, next) {
    return co(function*() {
        /*const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }*/

        /*const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid);
        if (!res_have_result(admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }*/
    
        const class_res = yield i_classes.select_school_classes_by_course(req.query.courseid,1);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(class_res.result);
        return Promise.resolve(true);
    });
});

router.post('/class', function(req, res, next) {
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
            "classname": req.body.classname,
            "classdate": req.body.classdate,
            "classtime": req.body.classtime,
            "courseid": req.body.courseid,
            "teacherid": req.body.teacherid,
            "schoolid": req.body.schoolid,
            "classmaxnumusers": req.body.classmaxnumusers,
            "classnumusers": 0,
            "classdetails": req.body.classdetails,
            "classactive": 1,
        }

        const class_res = yield i_classes.add_course(param);
        if (!res_is_success(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classid"] = class_res.result.insertId;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.put('/class', function(req, res, next) {
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
            "classid": req.body.classid,
            "classname": req.body.classname,
            "classdate": req.body.classdate,
            "classtime": req.body.classtime,
            "courseid": req.body.courseid,
            "teacherid": req.body.teacherid,
            "schoolid": req.body.schoolid,
            "classmaxnumusers": req.body.classmaxnumusers,
            "classnumusers": req.body.classnumusers,
            "classdetails": req.body.classdetails,
            "classactive": req.body.classactive,
        }

        const class_res = yield i_classes.update_class_base(param);
        if (!res_is_success(class_res)) {
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

router.delete('/class', function(req, res, next) {
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

        const class_res = yield i_classes.delete_class(req.query.classid);
        if (!res_is_success(class_res)) {
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

router.put('/classactive', function(req, res, next) {
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

        const class_res = yield i_classes.active_class(req.body.classactive, req.body.classid);
        if (!res_is_success(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classactive"] = req.body.classactive;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
