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
        const classcard_res = yield i_classcards.select_classcard_active();
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
            "courseid": req.body.courseid,
            "classcardactive": 1
        }

        const classcard_res = yield i_classcards.add_classcard(param);
        if (!res_is_success(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["classcardid"] = classcard_res.classcardid;
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

        const classcard_res = yield i_classcards.update_classcard_base(req.body);
        if (!res_is_success(classcard_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
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
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

module.exports = router;
