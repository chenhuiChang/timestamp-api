var express = require('express');
var urlencode = require('urlencode');
var moment = require('moment');

var server = express();

server.get('/:str', function(req,res) {
    var infoDecoded = urlencode.decode(req.params.str);
    var time, natural;
    if (/^[0-9]+$/.test(infoDecoded)) {
        time = new Date(infoDecoded * 1000);
        natural = moment(time).format('MMMM D, YYYY');
        res.send({unix: Number(infoDecoded), natural: natural});
    } else {
        time = new Date(infoDecoded).valueOf()/1000;
        res.send({unix: time, natural: infoDecoded});
    }
})
server.listen(8080, function(){
    console.log('server is running');
});