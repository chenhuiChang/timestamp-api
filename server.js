var express = require('express');
var urlencode = require('urlencode');
var moment = require('moment');

var server = express();
var port = process.env.port || 8080;

server.get('/:str', function(req,res) {
    var infoDecoded = urlencode.decode(req.params.str);
    var time, natural;
    res.setHeader('Content-Type', 'application/json');
    if (/^[0-9]+$/.test(infoDecoded)) {
        time = new Date(infoDecoded * 1000);
        natural = moment(time).format('MMMM D, YYYY');
        res.send(JSON.stringify({unix: Number(infoDecoded), natural: natural}));
    } else {
        time = new Date(infoDecoded).valueOf()/1000;
        res.send(JSON.stringify({unix: time, natural: infoDecoded}));
    }
})
server.listen(port, function(){
    console.log('server is running on', port);
});