/**
学校接口
*/
const co = require('co');
var express = require('express');
var htapi_code = require('../common/htapi_code');
var i_schools = require('../common/database/interface/i_schools');
var {
    res_is_success,
    res_have_result,
} = require('../common/database/tool');
const {
    operate_db
} = require('../common/database/db_handle')
var router = express.Router();

/*
学校管理接口
*/
router.get('/schools', function(req, res, next) {
    return co(function*() {
        const school_res = yield i_schools.select_school_active();
        if (!res_have_result(school_res)) {
            res.send(htapi_code(false));
            return Promise.resolve(null);
        }
        res.send(school_res.result);
        return Promise.resolve(true);
    });
});

router.post('/', function(req, res, next) {
    res.send(htapi_code(true));
});

router.delete('/', function(req, res, next) {
    res.send(htapi_code(true));
});

router.put('/', function(req, res, next) {
    res.send(htapi_code(true));
});

module.exports = router;
