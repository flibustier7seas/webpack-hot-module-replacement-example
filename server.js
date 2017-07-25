/* eslint-env node */

var express = require("express");
var path = require("path");

var app = new express();
var port = 9000;

// serve static assets normally
app.use(express.static(__dirname + "/dist"));

app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});