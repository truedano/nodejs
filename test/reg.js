var app = require('express')(),
    port = 1337;

app.listen(port);

app.get(/^\/ip?(?:\/(\d{2,3})(?:\.(\d{2,3}))(?:\.(\d{2,3}))(?:\.(\d{2,3})))?/, function(req, res){                                                                                            
  res.send(req.params);
});