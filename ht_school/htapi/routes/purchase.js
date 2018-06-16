const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_classcards = require('../common/database/interface/i_classcards');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_purchases = require('../common/database/interface/i_purchases');
var i_students = require('../common/database/interface/i_students');
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

        const purchase_res = yield i_purchases.select_purchase_in_school_deactive(admin_res.result[0].schoolid);
        if (!res_have_result(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        res.send(purchase_res.result);
        return Promise.resolve(true);
    });
});

router.get('/studentpurchases', function(req, res, next) {
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

        const purchase_res = yield i_purchases.select_purchase(userinfo.openid);
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
			"purchase": req.body.purchase,
            "purchasedetails": req.body.purchasedetails,
            "classcardid": req.body.classcardid,
            "purchaseaddress": req.body.purchaseaddress,
            "purchasedatatime": req.body.purchasedatatime,
            "schoolid": req.body.schoolid,
            "purchaseopenid": userinfo.openid,
            "paydetails": req.body.paydetails,
            "purchaseactive": 0,
        }
        const purchase_res = yield i_purchases.add_purchase(param);
        if (!res_is_success(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        
        var response = ""
        response = htapi_code(true);
        response["purchaseid"] = purchase_res.result.insertId;
        res.send(response);

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
            "studentage": req.body.purchaseage,
            "studentdetails": req.body.purchasedetails,
            "classcardid": req.body.classcardid,
            "schoolid": req.body.schoolid,
            "studentopenid": req.body.purchaseopenid,
            "studentmaxtimes": req.body.classcardtimes,
            "studenttimes": req.body.classcardtimes,
            "studentactive": 1,
        }
        const student_res = yield i_students.add_student(param);
        if (!res_is_success(student_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const purchase_res = yield i_purchases.active_purchase(new Date(), student_res.result.insertId , req.body.purchaseid);
        if (!res_is_success(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        wxapi.moveUserToGroup(param.studentopenid, tags["学生"], function(err, data, res) {
            console.log("student moveUserToGroup: " + param.studentopenid + " err:" + err);
        });
        
        var response = ""
        response = htapi_code(true);
        response["purchaseactive"] = 1;
        res.send(response);

        return Promise.resolve(true);
    });
});

module.exports = router;
