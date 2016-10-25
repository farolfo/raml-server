#!/usr/bin/env node
//     RAML Server 0.1.1

//     (c) 2015 Franco Arolfo
//     RAML Server may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/farolfo/raml-server

var ramlMocker = require('raml-mocker'),
    _ = require('underscore'),
    jsonServer = require('json-server'),
    argv = require('yargs').argv;;

var options = {
        path: argv.path || '.'
    },
    mocksAmount = 10,
    port = process.env.PORT || 3000,
    server,
    router;

function reqToDBEntry(request) {
    var resource = request.uri.substr(1),
        obj = {};

    var response = {};
    if ( request.example != undefined && request.example() != undefined ) {
      response = JSON.parse( request.example() );
    } else if ( request.mock != undefined ) {
      response = request.mock();
    } else {
      response = {};
    }

    obj[resource] = response;
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

process.on('SIGTERM', function() {
    process.exit();
});
