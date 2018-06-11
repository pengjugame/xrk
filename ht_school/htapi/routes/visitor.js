const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_purchases = require('../common/database/interface/i_purchases');
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

router.get('/purchases', function(req, res, next) {
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
        const purchase_res = yield i_purchases.add_purchase(param);
        if (!res_have_result(purchase_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["purchaseid"] = param.purchaseid;
        res.send(response);

        return Promise.resolve(true);
    });
});

module.exports = router;
