var express = require('express');
var router = express.Router();
const co = require('co');
var wechat = require('wechat');
var {wx_text_reply} = require('../common/wx/wx_text_reply');
var {wx_ht_form} = require('../common/wx/wx_qrcode_reply');
var i_users = require('../common/database/interface/i_users');
var {res_have_result} = require('../common/database/tool');

var config = require('config');
var wxconfig = config.wx;

var wx_event_subscribe = function(message, api) {
    let openid = message.FromUserName;

    api.getUser(openid, function(err, user_info) {
        return co(function * () {
            if (err) {
                console.error("出错啦:" + err);
                return;
            }

            api.getWhichGroup(openid,function(err, result) {
                if(!err){
                    console.log("subscribe getWhichGroup openid " + openid + " result:" + JSON.stringify(result));
                }
            });

            let users_res = yield i_users.exist_user(user_info.openid);
            if (!res_have_result(users_res)) {
                yield i_users.add_user(user_info);
            } else {
                yield i_users.update_user_subscribe(1, user_info.openid);
            }
        });
    });
};

var wx_event_unsubscribe = function(message, res) {
    var openid = message.FromUserName;

    //此处应该将openid对应的用户信息订阅置为0
    i_users.update_user_subscribe(0, openid);

    wxapi.moveUserToGroup(openid, 0, function(err, data, res) {
        console.log("unsubscribe moveUserToGroup openid " + openid + " err:" + err);
    });

    res.reply('谢谢曾经同行一程，祝你一切顺利!');
};

router.all('/', wechat(wxconfig).text(function(message, req, res, next) {
    wx_text_reply(message).then(function(data) {
        res.reply(data);
    });
}).image(function(message, req, res, next) {
    res.reply('图已收到,我们会定时回复.');
}).voice(function(message, req, res, next) {
    res.reply('语音已收到,我们会定时回复.');
}).video(function(message, req, res, next) {
    res.reply('视频已收到,我们会定时回复.');
}).location(function(message, req, res, next) {
    res.reply('你的位置已收到,我们会定时回复.');
}).link(function(message, req, res, next) {
    res.reply('链接已收到,我们会定时回复.');
}).event(function(message, req, res, next) {
    switch (message.Event) {
        case 'subscribe':
            wx_event_subscribe(message, global.wxapi);
            res.reply(config.xrk.welcome);
            break;
        case 'unsubscribe':
            wx_event_unsubscribe(message, res);
            break;
        case 'SCAN':
            console.log("收到扫码事件:" + JSON.stringify(message));
            wx_ht_form(message.EventKey, message).then(function(data) {
                res.reply(data);
            });
            break;
        default:
            res.send('');
    }
}).device_text(function(message, req, res, next) {
    res.reply('设备消息已收到,我们会定时回复.');
}).device_event(function(message, req, res, next) {
    res.reply('设备事件已收到,我们会定时回复.');
}).middlewarify());

module.exports = router;
