var express = require('express');
var urlencode = require('urlencode');
var moment = require('moment');

var server = express();
var port = process.env.PORT || 8080;
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('Timestamp api');
})
server.get('/:str', function(req,res) {
    var infoDecoded = urlencode.decode(req.params.str);
    var time, natural;
    res.setHeader('Content-Type', 'application/json');
    if (/^[0-9]+$/.test(infoDecoded)) {
        time = new Date(infoDecoded * 1000);
        natural = moment(time).format('MMMM D, YYYY');
        res.send(JSON.stringify({unix: Number(infoDecoded), natural: natural}));
    } else if (/^[a-zA-Z]+\s*[0-9]{1,2},\s*[0-9]{1,4}$/.test(infoDecoded)){
        time = new Date(infoDecoded).valueOf()/1000;
        natural = moment(time).format('MMMM D, YYYY');
        res.send(JSON.stringify({unix: time, natural: natural}));
    } else {
        res.send(JSON.stringify({unix: null, natural: null}));
    }
})
server.listen(port, function(){
    console.log('server is running on', port);
});