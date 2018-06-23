const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
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

router.get('/', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const teacher_res = yield i_teachers.exist_teacher(userinfo.openid)
        if (!res_have_result(teacher_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null)
        }
        res.send(teacher_res.result[0]);
        return Promise.resolve(true)
    });
});

router.put('/', function(req, res, next) {
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
            "teacherid": req.body.teacherid,
            "teachername": req.body.teachername,
            "teachermobile": req.body.teachermobile,
            "teacherusex": req.body.teacherusex,
            "teacherdetails": req.body.teacherdetails,
            "schoolid": req.body.schoolid,
            "teacheractive": req.body.teacheractive,
        }

        const teacher_update_res = yield i_teachers.update_teacher_base(param);
        if (!res_is_success(teacher_update_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        if (req.body.teacheractive == 1) {
            wxapi.moveUserToGroup(req.body.teacheropenid, tags["教师"], function(err, data, res) {
                console.log("teacher moveUserToGroup: " + req.body.teacheropenid + " err:" + err);
                wxapi.getWhichGroup(req.body.teacheropenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.teacheropenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        } else {
            wxapi.moveUserToGroup(req.body.teacheropenid, 0, function(err, data, res) {
                console.log("delete moveUserToGroup: " + req.body.teacheropenid + " err:" + err);
                wxapi.getWhichGroup(req.body.teacheropenid,function(err, result) {
                    if(!err){
                      console.log("getWhichGroup openid " + req.body.teacheropenid + " result:" + JSON.stringify(result));
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
            "teacheractive": 0,
        }

        const teacher_res = yield i_teachers.exist_teacher(userinfo.openid)
        if (res_have_result(teacher_res)) {
            if(teacher_res.result[0].teacheractive == 1){
                res.send(htapi_code(true));
                return Promise.resolve(true);
            }
                
            param.teacherid = teacher_res.result[0].teacherid;
            const teacher_update_res = yield i_teachers.update_teacher_base(param);
            if (!res_is_success(teacher_update_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }
            
            res.send(htapi_code(true));
            return Promise.resolve(true);
        }

        const teacher_add_res = yield i_teachers.add_teacher(param);
        if (!res_is_success(teacher_add_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["teacherid"] = teacher_add_res.result.insertId;
        res.send(response);

        return Promise.resolve(true);
    });
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

        const teacher_res = yield i_teachers.active_teacher(1, req.body.teacherid);
        if (!res_is_success(teacher_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        wxapi.moveUserToGroup(req.body.teacheropenid, tags["教师"], function(err, data, res) {
            console.log("teacher moveUserToGroup: " + req.body.teacheropenid + " err:" + err);
            wxapi.getWhichGroup(req.body.teacheropenid,function(err, result) {
                if(!err){
                    console.log("getWhichGroup openid " + req.body.teacheropenid + " result:" + JSON.stringify(result));
                }
            });
        });

        var response = ""
        response = htapi_code(true);
        response["teacheractive"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
