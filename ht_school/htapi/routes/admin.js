var express = require('express');
const co = require('co');
var htapi_code = require('../common/htapi_code');
var i_admin = require('../common/database/interface/i_school_admin');
var {
    res_is_success,
    getHash,
    get_userinfo,
    check_userinfo,
} = require('../common/database/tool');
var router = express.Router();
const config = require('config');
const tags = config.tags;

/*
学校管理员接口
*/
router.get('/', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (userinfo.openid == '') {
            res.send(htapi_code(false));
            return;
        }
        const admin_res = yield i_admin.exist(userinfo.openid)
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
            "name": req.body.name,
            "mobile": req.body.mobile,
            "sex": req.body.sex,
            "schoolid": req.body.schoolid,
            "active": 1
        }
        Object.assign(param, userinfo);
        const register_res = yield i_admin.add(param);
        if (!res_is_success(register_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        var response = ""
        response = htapi_code(true);
        response["adminid"] = param.openid;
        response["active"] = param.active;
        res.send(response);

        wxapi.moveUserToGroup(param.openid, tags["学校管理员"], function(err, data, res) {
            console.log("admin moveUserToGroup: " + param.openid + " err:" + err);
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

module.exports = router;
