const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_students = require('../common/database/interface/i_students');
var i_teachers = require('../common/database/interface/i_teachers');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_workstudenttimes = require('../common/database/interface/i_workstudenttimes');
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

        res.send(student_res.result[0]);
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
            "studentage": req.body.studentage,
            "studentdetails": req.body.studentdetails,
            "studenttimes": 0,
            "studentmaxtimes": 0,
            "studentactive": 0,
        }

        if(req.body.classid != undefined && req.body.classid != '' )
            param.classid = req.body.classid;

        if(req.body.schoolid != undefined && req.body.schoolid != '' )
            param.schoolid = req.body.schoolid;

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

        var param = {
            "studentid": req.body.studentid,
            "studentname": req.body.studentname,
            "studentmobile": req.body.studentmobile,
            "studentusex": req.body.studentusex,
            "studentage": req.body.studentage,
            "studentdetails": req.body.studentdetails,
            "studenttimes": req.body.studenttimes,
            "studentmaxtimes": req.body.studentmaxtimes,
            "studentopenid": req.body.studentopenid,
            "studentactive": req.body.studentactive,
        }

        if(req.body.classid != undefined && req.body.classid != '' )
            param.classid = req.body.classid;

        if(req.body.schoolid != undefined && req.body.schoolid != '' )
            param.schoolid = req.body.schoolid;

        if(req.body.classcardid != undefined && req.body.classcardid != '' )
            param.classcardid = req.body.classcardid;

        const student_old_res = yield i_students.select_student(req.body.studentid);
        if (!res_have_result(student_old_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.update_student_base(param);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        if(req.body.classid != student_old_res.result[0].classid){
            const class_old_res = yield i_classes.select_class(student_old_res.result[0].classid);
            if (!res_have_result(class_old_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const class_old_update_res = yield i_classes.update_class_numusers(class_old_res.result[0].classnumusers-1,student_old_res.result[0].classid);
            if (!res_is_success(class_old_update_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const class_new_res = yield i_classes.select_class(req.body.classid);
            if (!res_have_result(class_new_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const class_new_update_res = yield i_classes.update_class_numusers(class_new_res.result[0].classnumusers+1,req.body.classid);
            if (!res_is_success(class_new_update_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }
        }

        if (req.body.studentactive == 1) {
            wxapi.moveUserToGroup(req.body.studentopenid, tags["学生"], function(err, data, res) {
                console.log("student moveUserToGroup: " + req.body.studentopenid + " err:" + err);
                wxapi.getWhichGroup(req.body.studentopenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.studentopenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        } else {
            wxapi.moveUserToGroup(req.body.studentopenid, 0, function(err, data, res) {
                console.log("delete moveUserToGroup: " + req.body.studentopenid + " err:" + err);
                wxapi.getWhichGroup(req.body.studentopenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.studentopenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        }

        var response = ""
        response = htapi_code(true);
        response["updatestatus"] = 1;
        res.send(response);
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
                wxapi.getWhichGroup(req.body.studentopenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.studentopenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        } else {
            wxapi.moveUserToGroup(req.body.studentopenid, 0, function(err, data, res) {
                console.log("delete moveUserToGroup: " + req.body.studentopenid + " err:" + err);
                wxapi.getWhichGroup(req.body.studentopenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.studentopenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        }
        
        var response = ""
        response = htapi_code(true);
        response["studentactive"] = req.body.studentactive;
        res.send(response);
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

        /*const teacher_res = yield i_teachers.exist_teacher(userinfo.openid)
        if (!res_have_result(teacher_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }*/

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

        const student_res = yield i_students.update_student_times(req.body.studenttimes,req.body.studentid);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["updatestudenttimesstatus"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.delete('/student', function(req, res, next) {
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

        const student_old_res = yield i_students.select_student(req.query.studentid);
        if (!res_have_result(student_old_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const class_old_res = yield i_classes.select_class(student_old_res.result[0].classid);
        if (!res_have_result(class_old_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const class_old_update_res = yield i_classes.update_class_numusers(class_old_res.result[0].classnumusers-1,student_old_res.result[0].classid);
        if (!res_is_success(class_old_update_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.delete_student(req.query.studentid);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        wxapi.moveUserToGroup(req.query.studentopenid, 0, function(err, data, res) {
            console.log("delete moveUserToGroup: " + req.query.studentopenid + " err:" + err);
            wxapi.getWhichGroup(req.query.studentopenid,function(err, result) {
                if(!err){
                    console.log("getWhichGroup openid " + req.query.studentopenid + " result:" + JSON.stringify(result));
                }
            });
        });

        var response = ""
        response = htapi_code(true);
        response["delstatus"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
