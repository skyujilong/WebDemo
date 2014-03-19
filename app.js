/**
 * Created with JetBrains WebStorm.
 * User: yujilong
 * Date: 14-3-19
 * Time: 下午6:30
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals({
    appLocal: __dirname
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.methodOverride());
app.use(app.router);

app.get('/',function(req,res){
    res.render("backbone/hello");
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});