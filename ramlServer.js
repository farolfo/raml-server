var ramlMocker = require('raml-mocker'),
    _ = require('underscore'),
    jsonServer = require('json-server');

var options = {
        path: process.argv[2]
    },
    server,
    router;

function reqToDBEntry(request) {
    console.log(JSON.stringify(request));
    return {a: [{asd: 1}]};
}

function generateServer(db) {
    server = jsonServer.create();
    router = jsonServer.router(db);

    server.use(jsonServer.defaults);
    server.use(router);

    server.listen(3000);
}

ramlMocker.generate(options, function (requestsToMock) {
    _.compose(generateServer, _.extend, _.map)(requestsToMock, reqToDBEntry);
});
