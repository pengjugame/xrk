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

router.get('/workclasses', function(req, res, next) {
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

        const workclass_res = yield i_workclasses.select_workclasses(req.query.classid);
        if (!res_have_result(workclass_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(workclass_res.result);
        return Promise.resolve(true);
    });
});

router.post('/workclass', function(req, res, next) {
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

        var today = new Date();
        var time = today.getFullYear() +'年 '+ (today.getMonth()+1) +'月 '+ today.getDate() +'日 '+ today.getHours() +'时'+ today.getMinutes() +'分';

        var param = {
            "classid": req.body.classid,
            "teacherid": teacher_res.result[0].teacherid,
            "workclasstime": time,
            "workclassdetails": req.body.workclassdetails,
            "workclassactive": 1,
        }

        const workclass_res = yield i_workclasses.add_workclass(param);
        if (!res_is_success(workclass_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const student_res = yield i_students.select_student_in_class_active(req.body.classid);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        for(i=0; i < student_res.result.length; i++){
            var studentparam = {
                "workclassid": workclass_res.result.insertId,
                "studentid": student_res.result[i].studentid,
                "workstudentstatus": 0,
                "workstudentdetails": "学生正常上课",
            }

            const workstudent_res = yield i_workstudents.add_workstudent(studentparam);
            if (!res_is_success(workstudent_res)) {
                console.log("add_workstudent " + JSON.stringify(studentparam) + " err!");
            }
        }

        var response = ""
        response = htapi_code(true);
        response["workclassid"] = workclass_res.result.insertId;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.put('/workclass', function(req, res, next) {
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

        var param = {
            "workclassid": req.body.workclassid,
            "classid": req.body.classid,
            "teacherid": req.body.teacherid,
            "workclasstime": req.body.workclasstime,
            "workclassdetails": req.body.workclassdetails,
            "workclassactive": req.body.workclassactive,
        }

        const workclass_res = yield i_workclasses.update_workclass(param);
        if (!res_is_success(workclass_res)) {
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

router.delete('/workclass', function(req, res, next) {
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

        const workstudent_res = yield i_workstudents.delete_workstudent_by_workclass(req.query.workclassid);
        if (!res_is_success(workstudent_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const workclass_res = yield i_workclasses.delete_workclass(req.query.workclassid);
        if (!res_is_success(workclass_res)) {
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

router.put('/workclassactive', function(req, res, next) {
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

        {
            const workstudent_res = yield i_workstudents.select_workstudents(req.body.workclassid);
            if (!res_have_result(workstudent_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            var today = new Date();
            var time = today.getFullYear() +'年 '+ (today.getMonth()+1) +'月 '+ today.getDate() +'日 '+ today.getHours() +'时 '+ today.getMinutes() +'分';

            for(i = 0; i < workstudent_res.result.length; i++)
            {
                var param = {
                    "studentid": workstudent_res.result[i].studentid,
                    "teacherid": teacher_res.result[0].teacherid,
                    "studentpretimes": workstudent_res.result[i].studenttimes,
                    "workstudenttime": time,
                }

                if(workstudent_res.result[i].workstudentstatus == 0){
                    param.workstudenttimedetails = "上课 用掉 " + 1 + " 次课";
                    param.studentcurtimes = workstudent_res.result[i].studenttimes - 1;
                } else if (workstudent_res.result[i].workstudentstatus == 1){
                    param.workstudenttimedetails = "请假 扣掉 " + 0 + " 次课";
                    param.studentcurtimes = workstudent_res.result[i].studenttimes;
                } else if (workstudent_res.result[i].workstudentstatus == 2){
                    param.workstudenttimedetails = "旷课 扣掉 " + 1 + " 次课";
                    param.studentcurtimes = workstudent_res.result[i].studenttimes - 1;
                }

                const workstudenttime_res = yield i_workstudenttimes.add_workstudenttime(param);
                if (!res_is_success(workstudenttime_res)) {
                    res.send(htapi_code(false));
                    return Promise.resolve(null);
                }

                const student_res = yield i_students.update_student_times(param.studentcurtimes,workstudent_res.result[i].studentid);
                if (!res_is_success(student_res)) {
                    res.send(htapi_code(false));
                    return Promise.resolve(null);
                }
            }
        }

        const workclass_res = yield i_workclasses.active_workclass(0, req.body.workclassid);
        if (!res_is_success(workclass_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["workclassactive"] = 0;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
