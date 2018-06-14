var express = require('express');
const co = require('co');
var htapi_code = require('../common/htapi_code');
var i_school_admins = require('../common/database/interface/i_school_admins');
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

router.get('/', function(req, res, next) {
    return co(function*() {
        const userinfo = get_userinfo(req.session);
        if (!check_userinfo(userinfo)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid)
        if (!res_have_result(admin_res)) {
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
            "schooladminname": req.body.schooladminname,
            "schooladminmobile": req.body.schooladminmobile,
            "schooladminusex": req.body.schooladminusex,
            "schoolid": req.body.schoolid,
            "schooladminopenid": userinfo.openid,
            "schooladminactive": 1
        }
		
		const admin_res = yield i_school_admins.exist_schooladmin(userinfo.openid)
        if (res_have_result(admin_res)) {
			if(admin_res.schooladminactive != 0){
				res.send(htapi_code(true));
				return Promise.resolve(true);
			}
			
			param.schooladminid= admin_res.schooladminid;
			const school_admin_res = yield i_school_admins.update_schooladmin_base(param);
			if (res_is_success(school_admin_res)) {
				res.send(htapi_code(true));
				return Promise.resolve(true);
			}else{
				res.send(htapi_code(false));
				return Promise.resolve(null);
			}
        }

        const school_admin_res = yield i_school_admins.add_schooladmin(param);
        if (!res_is_success(school_admin_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }

        var response = ""
        response = htapi_code(true);
        response["schooladminid"] = school_admin_res.result.insertId;
        res.send(response);

        wxapi.moveUserToGroup(param.schooladminopenid, tags["学校管理员"], function(err, data, res) {
            console.log("admin moveUserToGroup: " + param.schooladminopenid + " err:" + err);
        });

        return Promise.resolve(true);
    });
});

module.exports = router;
