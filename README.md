# RAML Server [![](https://badge.fury.io/js/raml-server.svg)](http://badge.fury.io/js/raml-server)
Get a full fake REST API with **zero coding** by writing a [RAML](http://raml.org/) spec.

**Why building a new RAML based server?** Cause this one works with [JSON-Server](https://github.com/typicode/json-server), so no much code to do (maintain).

###Install

```
$ npm install -g raml-server
```

###Usage

Start a server based on a RAML spec

```
$ raml-server exampleApi.raml
```

And hit ```localhost:3000```.

###How it works?
This is done by generating responses' data reading the JSON schemas with the [RAML Mocker](https://github.com/RePoChO/raml-mocker), and run with [JSON-Server](https://github.com/typicode/json-server).
