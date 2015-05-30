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

And hit ```localhost:3000/songs```. Also, later POSTs to /songs on the server will be saved!

###How it works?

This is done by generating responses' data reading the JSON schemas with the [RAML Mocker](https://github.com/RePoChO/raml-mocker), and run with [JSON-Server](https://github.com/typicode/json-server).

###Known limitations

* Support for only 1 RAML file as command line argument.
* It maps resources at top level of the defined API, no nested resources mapped (uses the JSON schema of the top level resource of each resource).
