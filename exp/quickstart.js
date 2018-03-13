let restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

let server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(4001, () => {
  console.log('%s listening at %s', server.name, server.url);
});
