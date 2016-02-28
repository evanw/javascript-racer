var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  if (/\/\?name=/.test(req.url)) {
    var name = req.url.slice('/?name='.length);
    var parts = [];
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    });
    req.on('data', function(data) {
      parts.push(data);
    });
    req.on('end', function() {
      fs.writeFileSync(__dirname + '/snapshots/' + name, Buffer.concat(parts));
      console.log('saved ' + name);
      res.end();
    });
  }

  else {
    res.end();
  }
}).listen(8127);
