/*
微信文字沟通回复
*/
'use strict';
const {get_article, is_empty} = require('../database/tool');
var {wx_ht_form, qr_type, get_school_check_qrcode} = require('./wx_qrcode_reply');
const co = require('co');

var wx_text_reply = function(msg) {
    return co(function * () {
        //检查语句中有无关键字，通过关键字回送内容
        if (/教师申请/.test(msg.Content)) {
            return (yield wx_ht_form('' + qr_type.teacher_register, msg));
        }else if (/6429804/.test(msg.Content)) {
            return (yield wx_ht_form('' + qr_type.admin_register, msg));
        } else {
            return get_article(msg.Content);
        }
    });
};

module.exports = {
    wx_text_reply
};
