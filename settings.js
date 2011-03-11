var express = require('express');

var app = express.createServer();
exports.app = app;

exports.appPort = process.env.IG_APP_PORT || 3000;
exports.CLIENT_ID = process.env.IG_CLIENT_ID || '081f0a38d31b4d5483c37eb9377365df';
exports.CLIENT_SECRET = process.env.IG_CLIENT_SECRET || '9f784a27dd0b410f84da85e266d4fd43';
exports.httpClient = (process.env.IG_USE_INSECURE ? require('http') : require('https'));
exports.apiHost = process.env.IG_API_HOST || 'api.instagram.com';
exports.apiPort = process.env.IG_API_PORT || null;
exports.basePath = process.env.IG_BASE_PATH || '';
exports.REDIS_PORT = 9127;
exports.REDIS_HOST = 'rmetzler:3679b6508bb1aa02468b5b27110d4729@filefish.redistogo.com';
// redis://rmetzler:3679b6508bb1aa02468b5b27110d4729@filefish.redistogo.com:9127/



app.set('view engine', 'jade');

app.configure(function(){
    app.use(express.methodOverride());
	app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public/'));
});
app.configure('development', function(){
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});