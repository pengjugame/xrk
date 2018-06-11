const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_classcards = require('../common/database/interface/i_classcards');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_purchases = require('../common/database/interface/i_purchases');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();

router.get('/purchases', function(req, res, next) {
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

        const purchase_res = yield i_purchases.select_purchase_in_school(admin_res.result[0].schoolid);
        if (!res_have_result(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(purchase_res.result);
        return Promise.resolve(true);
    });
});

router.post('/purchase', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var param = {
            "purchasename": req.body.purchasename,
            "purchasemobile": req.body.purchasemobile,
            "purchaseusex": req.body.purchaseusex,
            "purchasedetails": req.body.purchasedetails,
            "classcardid": req.body.classcardid,
            "purchaseaddress": req.body.purchaseaddress,
            "purchasedatatime": req.body.purchasedatatime,
            "schoolid": req.body.schoolid,
            "purchaseopenid": userinfo.openid,
            "paydetails": req.body.paydetails,
            "purchaseactive": 0,
        }
        param['purchaseid'] = getHash(JSON.stringify(param));
        const student_res = yield i_purchases.add_purchase(param);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

router.put('/purchaseactive', function(req, res, next) {
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
            "studentname": req.body.purchasename,
            "studentmobile": req.body.purchasemobile,
            "studentusex": req.body.purchaseusex,
            "studentdetails": req.body.purchasedetails,
            "classcardid": req.body.classcardid,
            "schoolid": req.body.schoolid,
            "studentopenid": req.body.purchaseopenid,
            "studenttimes": 0,
            "studentactive": 1,
        }
        param['studentid'] = getHash(JSON.stringify(param));
        const student_res = yield i_students.add_student(param);
        if (!res_have_result(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const purchase_res = yield i_purchases.active_purchase(new Date(), param.studentid , req.body.purchaseid);
        if (!res_have_result(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        res.send(htapi_code(true));
        return Promise.resolve(true);
    });
});

module.exports = router;
