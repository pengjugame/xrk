var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var WechatApi = require('wechat-api');
var session = require('express-session');
var file_session = require('session-file-store')(session);

var config = require('config');
var menu = config.menu;
var wxconfig = config.wx;
var sessionconfig = config.session;

var api = new WechatApi(wxconfig.appid, wxconfig.secret);
global.wxapi = api;

var app = express();

api.getGroups(function(err, result) {
    if(!err){
        for(var group in result.groups){

            console.log(result.groups[group]);

            if(result.groups[group].id == 0 ||
               result.groups[group].id == 1 ||
               result.groups[group].id == 2)
               continue;

            if(result.groups[group].id == config.tags["学校管理员"] ||
               result.groups[group].id == config.tags["意向家长"] ||
               result.groups[group].id == config.tags["家长"] ||
               result.groups[group].id == config.tags["教师"])
               continue;

            api.removeGroup(result.groups[group].id,function(err, result) {
                console.log("removeGroup err:" + err);
                console.log("removeGroup result:" + JSON.stringify(result));
            })
        }
    }
})

/*api.createGroup("学校管理员",function(err, result){
    console.log("createGroup result:" + result);
})
api.createGroup("教师",function(err, result){
    console.log("createGroup result:" + result);
})
api.createGroup("家长",function(err, result){
    console.log("createGroup result:" + result);
})
api.createGroup("意向家长",function(err, result){
    console.log("createGroup result:" + result);
})*/

var {encode_menu, encrypt, decrypt} = require('./common/database/tool')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//构建session
app.use(session({
    store: new file_session({path: sessionconfig.path}),
    secret: 'koman here',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

process.on('unhandledRejection', function(err) {
    console.error(err.stack);
});

process.on(`uncaughtException`, console.error);

app.use('/static',express.static(path.join(__dirname, 'dist')));

/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    });*/

//if (process.env.NODE_ENV == "production") {
//    console.log("产品环境，屏蔽日志输出.....");
//    console.log = function() {};
//}

var get_router = function(url) {
    return [
        '/htapi' + url,
        url
    ];
};

var route_list = [
    {
        url: '/userinfo',
        handler: require('./routes/userinfo')
    },{
        url: '/school',
        handler: require('./routes/school')
    }, {
        url: '/classcard',
        handler: require('./routes/classcard')
    }, {
        url: '/purchase',
        handler: require('./routes/purchase')
    }
];

for (let o in route_list) {
    app.use(get_router(route_list[o].url), route_list[o].handler);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    console.log("err:" + err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (process.env.NODE_ENV == "production" || process.env.MENU == "yes") {
    api.removeMenu(function(err, res) {
        if (err) {
            console.log("删除所有老菜单失败");
            return;
        }
        api.createMenu(encode_menu(menu.user, wxconfig.appid), function(err, res) {
            if (err) {
                console.log("创建通用菜单错误:" + err);
                return;
            }
            api.createCustomMenu(encode_menu(menu.parent, wxconfig.appid), function(err, res) {
                if (err) {
                    console.log("创建家长菜单错误:" + err);
                    return;
                }
                console.log("创建家长菜单 OK");
            });
            api.createCustomMenu(encode_menu(menu.teacher, wxconfig.appid), function(err, res) {
                if (err) {
                    console.log("创建教师菜单错误:" + err);
                    return;
                }
                console.log("创建教师菜单 OK");
            });
            api.createCustomMenu(encode_menu(menu.admin, wxconfig.appid), function(err, res) {
                if (err) {
                    console.log("创建管理员菜单错误:" + err);
                    return;
                }
                console.log("创建管理员菜单 OK");
            });
        });
    });
}

//var bc = require('./common/blockchains')
//bc.start_task();
module.exports = app;
