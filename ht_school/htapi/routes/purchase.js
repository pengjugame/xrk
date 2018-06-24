const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_classcards = require('../common/database/interface/i_classcards');
var i_school_admins = require('../common/database/interface/i_school_admins');
var i_purchases = require('../common/database/interface/i_purchases');
var i_students = require('../common/database/interface/i_students');
var i_classes = require('../common/database/interface/i_classes');
var {
    res_is_success,
    res_have_result,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();
const config = require('config');
const tags = config.tags;

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
            "purchaseage": req.body.purchaseage,
            "purchasedetails": req.body.purchasedetails,
            "purchaseaddress": req.body.purchaseaddress,
            "purchasedatatime": req.body.purchasedatatime,
            "paydetails": req.body.paydetails,
            "purchaseopenid": userinfo.openid,
            "purchaseactive": 0,
        }

        if(req.body.classcardid != undefined && req.body.classcardid != '')
            param.classcardid = req.body.classcardid;

        if(req.body.schoolid != undefined && req.body.schoolid != '' )
            param.schoolid = req.body.schoolid;

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

router.put('/purchase', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var param = {
            "purchaseid": req.body.purchaseid,
            "purchasename": req.body.purchasename,
            "purchasemobile": req.body.purchasemobile,
            "purchaseusex": req.body.purchaseusex,
            "purchaseage": req.body.purchaseage,
            "purchasedetails": req.body.purchasedetails,
            "purchaseaddress": req.body.purchaseaddress,
            "purchasedatatime": req.body.purchasedatatime,
            "paydetails": req.body.paydetails,
            "purchaseactive": 0,
        }

        if(req.body.classcardid != undefined && req.body.classcardid != '' )
            param.classcardid = req.body.classcardid;

        if(req.body.schoolid != undefined && req.body.schoolid != '' )
            param.schoolid = req.body.schoolid;

        const purchase_res = yield i_purchases.update_purchase_base(param);
        if (!res_is_success(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        /*if(param.purchaseactive == 1){
            const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid);
            if (!res_have_result(admin_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            var subparam = {
                "studentname": req.body.purchasename,
                "studentmobile": req.body.purchasemobile,
                "studentusex": req.body.purchaseusex,
                "studentage": req.body.purchaseage,
                "studentdetails": req.body.purchasedetails,
                "classid": 1,
                "purchaseid": req.body.purchaseid,
                "studentmaxtimes": req.body.classcardtimes,
                "studenttimes": req.body.classcardtimes,
                "studentactive": 1,
            }

            if(req.body.classcardid != undefined && req.body.classcardid != '' )
                subparam.classcardid = req.body.classcardid;

            if(req.body.purchaseopenid != undefined && req.body.purchaseopenid != '' )
                subparam.studentopenid = req.body.purchaseopenid;

            if(req.body.schoolid != undefined && req.body.schoolid != '' )
                subparam.schoolid = req.body.schoolid;

            const student_res = yield i_students.add_student(subparam);
            if (!res_is_success(student_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const class_res = yield i_classes.select_class(subparam.classid);
            if (!res_have_result(class_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const class_update_res = yield i_classes.update_class_numusers(class_res.result[0].classnumusers+1,subparam.classid);
            if (!res_is_success(class_update_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            const purchase_active_res = yield i_purchases.active_purchase(new Date(), req.body.purchaseid);
            if (!res_is_success(purchase_active_res)) {
                res.send(htapi_code(false));
                return Promise.resolve(null);
            }

            wxapi.moveUserToGroup(subparam.studentopenid, tags["学生"], function(err, data, res) {
                console.log("student moveUserToGroup: " + subparam.studentopenid + " err:" + err);
                wxapi.getWhichGroup(subparam.studentopenid,function(err, result) {
                    if(!err){
                    console.log("getWhichGroup openid " + subparam.studentopenid + " result:" + JSON.stringify(result));
                    }
                });
            });
        }*/
        
        var response = ""
        response = htapi_code(true);
        response["updatestatus"] = 1;
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
            "classid": 1,
            "purchaseid": req.body.purchaseid,
            "studentmaxtimes": req.body.classcardtimes,
            "studenttimes": req.body.classcardtimes,
            "studentactive": 1,
        }

        if(req.body.classcardid != undefined && req.body.classcardid != '' )
            param.classcardid = req.body.classcardid;

        if(req.body.purchaseopenid != undefined && req.body.purchaseopenid != '' )
            param.studentopenid = req.body.purchaseopenid;

        if(req.body.schoolid != undefined && req.body.schoolid != '' )
            param.schoolid = req.body.schoolid;

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

        const purchase_res = yield i_purchases.active_purchase(new Date(), req.body.purchaseid);
        if (!res_is_success(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        wxapi.moveUserToGroup(param.studentopenid, tags["学生"], function(err, data, res) {
            console.log("student moveUserToGroup: " + param.studentopenid + " err:" + err);
            wxapi.getWhichGroup(param.studentopenid,function(err, result) {
                if(!err){
                  console.log("getWhichGroup openid " + param.studentopenid + " result:" + JSON.stringify(result));
                }
            });
        });
        
        var response = ""
        response = htapi_code(true);
        response["purchaseactive"] = 1;
        res.send(response);
        return Promise.resolve(true);
    });
});

module.exports = router;
