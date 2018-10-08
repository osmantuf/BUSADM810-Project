var http = require('http');
var express = require('express');
var app = express();

app.use(function(req, res, next){
    console.log('Request from ' + req.ip);
    next();
});

app.get('/',function(req,res){
    res.send('Hello World!');
});

app.get('/about',function(req,res){
    res.send('About Us!!');
});
app.get('/about/directions',function(req,res){
    res.send('How to find Us!');
});

app.use(function(req, res){       //THESE TWO SHOUL BE AT THE END.. 404 and 500 errors
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
});
http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port ' + 3000);
})