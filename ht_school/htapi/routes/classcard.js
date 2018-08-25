const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_classcards = require('../common/database/interface/i_classcards');
var i_school_admins = require('../common/database/interface/i_school_admins');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();

router.get('/classcards', function(req, res, next) {
    return co(function*() {
        const classcard_res = yield i_classcards.select_classcard();
        if (!res_have_result(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(classcard_res.result);
        return Promise.resolve(true);
    });
});

router.get('/classcardsbycourse', function(req, res, next) {
    return co(function*() {
        const classcard_res = yield i_classcards.select_classcard_by_course(1);
        if (!res_have_result(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(classcard_res.result);
        return Promise.resolve(true);
    });
});

router.post('/classcard', function(req, res, next) {
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
            "classcardname": req.body.classcardname,
            "classcardprice": req.body.classcardprice,
            "classcardtimes": req.body.classcardtimes,
            "classcardtime": req.body.classcardtime,
            "classcarddetails": req.body.classcarddetails,
            "classcardactive": 1
        }

        if(req.body.courseid != undefined && req.body.courseid != '' )
            param.courseid = req.body.courseid;

        const classcard_res = yield i_classcards.add_classcard(param);
        if (!res_is_success(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classcardid"] = classcard_res.result.insertId;
        res.send(response);
        return Promise.resolve(true);
    });
});

router.put('/classcard', function(req, res, next) {
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
            "classcardid": req.body.classcardid,
            "classcardname": req.body.classcardname,
            "classcardprice": req.body.classcardprice,
            "classcardtimes": req.body.classcardtimes,
            "classcardtime": req.body.classcardtime,
            "classcarddetails": req.body.classcarddetails,
            "classcardactive": req.body.classcardactive,
        }

        if(req.body.courseid != undefined && req.body.courseid != '' )
            param.courseid = req.body.courseid;

        const classcard_res = yield i_classcards.update_classcard_base(param);
        if (!res_is_success(classcard_res)) {
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

router.delete('/classcard', function(req, res, next) {
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

        const classcard_res = yield i_classcards.delete_classcard(req.query.classcardid);
        if (!res_is_success(classcard_res)) {
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

router.put('/classcardactive', function(req, res, next) {
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

        const classcard_res = yield i_classcards.active_classcard(req.body.classcardactive, req.body.classid);
        if (!res_is_success(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classcardactive"] = req.body.classcardactive;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
