var express = require('express');

var server = express();

server.get('/', function(req,res) {
    res.end('Hello world!');
})
server.listen(8080, function(){
    console.log('server is running');
});