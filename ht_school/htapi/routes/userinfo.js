/*
获取用户授权
*/

var express = require('express');
var OAuth = require('wechat-oauth');
var htapi_code = require('../common/htapi_code');
var {res_is_success, get_userinfo, res_have_result} = require('../common/database/tool');
var i_users = require('../common/database/interface/i_users');
var config = require('config');
var wxconfig = config.wx;

var client = new OAuth(wxconfig.appid, wxconfig.secret);

var router = express.Router();

var send_exist_userinfo = function(req, exist_user, res) {
    req.session.userinfo = exist_user;
    console.log("exist = " + JSON.stringify(req.session));
    res.send(exist_user);
};

var add_userinfo_by_auth = function(req, userinfo, res) {
    i_users.add_user(userinfo).then(function(users_res) {
        if (res_is_success(users_res)) {
            req.session.userinfo = userinfo;
            console.log("add = " + JSON.stringify(req.session));
            res.send(userinfo);
        }
    });
};

var get_userinfo_by_auth = function(req, openid, res) {
    client.getUser(openid, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }

        result.subscribe = 1;
        result.subscribe_time = Date.now();
        result.privilege = result.privilege.toString();

        add_userinfo_by_auth(req, result, res);
    });
};

router.get('/', function(req, res, next) {
    var code = req.query.code || 0;
    req.query.openid = req.query.openid || 0;
    //没有跳转的code则返回失败
    if (!code) {
        res.send(htapi_code(false));
        return;
    }

    client.getAccessToken(code, function(err, result) {
        if (err) {
            res.send(err);
            return;
        }

        //如果session有则刷新处理 不请求服务器
        const userinfo = get_userinfo(req.session);
        console.log("获取到session userinfo:" + JSON.stringify(userinfo));
        if (userinfo != '' && result.data.openid == userinfo.openid) {
            res.send(userinfo);
            return;
        };

        console.log("去微信服务器获取token:" + JSON.stringify(result));
        var openid = result.data.openid;

        //通过openid查询自己有无这个用户，有则查询出来用，无则后续添加这个用户
        i_users.exist_user(openid).then(function(exist_res) {
            if (!res_have_result(exist_res)) {
                get_userinfo_by_auth(req, openid, res);
            } else {
                send_exist_userinfo(req, exist_res.result[0], res);
            }
        });
    });
});

module.exports = router;
