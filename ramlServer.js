#!/usr/bin/env node
//     RAML Server 0.1.1

//     (c) 2015 Franco Arolfo
//     RAML Server may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/farolfo/raml-server

var ramlMocker = require('raml-mocker'),
    _ = require('underscore'),
    jsonServer = require('json-server');

var options = {
        path: '.'
    },
    mocksAmount = 10,
    port = process.env.PORT || 3000,
    server,
    router;

function reqToDBEntry(request) {
    var resource = request.uri.split('/')[1],
        obj = {};

    obj[resource] = request.mock == undefined
      ? {}
      : request.mock();

    return obj;
}

function asList(func, n) {
  if (n <= 0) {
    return [];
  }

  var ans = [];
  ans.push(func());
  return ans.concat(asList(func, n-1));
}

function generateServer(db) {
    server = jsonServer.create();
    router = jsonServer.router(db);

    server.use(jsonServer.defaults);
    server.use(router);

    console.log('Running RAML server on localhost:' + port + '...');
    server.listen(port);
}

ramlMocker.generate(options, function (requestsToMock) {
    generateServer(_.reduce(_.map(requestsToMock, reqToDBEntry), _.extend, {}));
});
