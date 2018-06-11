var express = require('express');
const co = require('co');
var htapi_code = require('../common/htapi_code');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_teachers = require('../common/database/interface/i_teachers');
var i_courses = require('../common/database/interface/i_courses');
var i_classes = require('../common/database/interface/i_classes');
var i_classcards = require('../common/database/interface/i_classcards');
var i_purchases = require('../common/database/interface/i_purchases');
var i_students = require('../common/database/interface/i_students');
var {
    res_is_success,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();
const config = require('config');
const tags = config.tags;


router.get('/', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid)
        if (!res_is_success(admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null)
        }
        res.send(admin_res.result);
        return Promise.resolve(true)
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
            "schooladminname": req.body.name,
            "schooladminmobile": req.body.mobile,
            "schooladminusex": req.body.sex,
            "schoolid": req.body.schoolid,
            "schooladminopenid": userinfo.openid,
            "schooladminactive": 1
        }
        param['schooladminid'] = getHash(JSON.stringify(param));

        const register_res = yield i_school_admins.add_schooladmin(param);
        if (!res_is_success(register_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["schooladminid"] = param.schooladminid;
        res.send(response);

        wxapi.moveUserToGroup(param.schooladminopenid, tags["学校管理员"], function(err, data, res) {
            console.log("admin moveUserToGroup: " + param.schooladminopenid + " err:" + err);
        });

        return Promise.resolve(true);
    });
});

router.delete('/', function(req, res, next) {

    res.send(htapi_code(true));
});

router.put('/', function(req, res, next) {

    res.send(htapi_code(true));
});

router.get('/teachers', function(req, res, next) {
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

        const teacher_res = yield i_teachers.select_teacher_in_school(admin_res.result[0].schoolid);
        if (!res_have_result(teacher_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        res.send(teacher_res.result);
        return Promise.resolve(true);
    });
});

router.delete('/teacher', function(req, res, next) {
    return co(function*() {
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.put('/teacheractive', function(req, res, next) {
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

        if (req.body.active == 1) {
            yield i_teachers.active_teacher(req.body.active, req.body.teacherid);
            wxapi.moveUserToGroup(req.body.openid, tags["教师"], function(err, data, res) {
                console.log("teacher moveUserToGroup: " + req.body.openid + " err:" + err);
            });
        } else {
            yield i_teachers.active_teacher(req.body.active, req.body.teacherid)
            wxapi.moveUserToGroup(req.body.openid, 0, function(err, data, res) {
                console.log("delete moveUserToGroup: " + req.body.openid + " err:" + err);
            });
        }

        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

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
            "coursetimes": req.body.coursetimes,
            "coursetime": req.body.coursetime,
            "coursemaxnumusers": req.body.coursemaxnumusers,
            "coursedetails": req.body.coursedetails,
            "courseactive": 1
        }
        param['courseid'] = getHash(JSON.stringify(param));

        const course_res = yield i_courses.add_course(param);
        if (!res_have_result(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["courseid"] = param.courseid;
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

        const course_res = yield i_courses.update_course_base(req.body);
        if (!res_have_result(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
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
        if (!res_have_result(course_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.get('/classes', function(req, res, next) {
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

        const class_res = yield i_classes.select_school_classes(admin_res.result[0].schoolid);
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
            "classaddress": req.body.classaddress,
            "classdatatime": req.body.classdatatime,
            "courseid": req.body.courseid,
            "teacherid": req.body.teacherid,
            "schoolid": req.body.schoolid,
            "classactive": 1,
        }
        param['classid'] = getHash(JSON.stringify(param));

        const class_res = yield i_classes.add_course(param);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classid"] = param.classid;
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

        const class_res = yield i_classes.update_class_base(req.body);
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
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
        if (!res_have_result(class_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
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
        if (!res_have_result(student_res)) {
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
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

module.exports = router;
