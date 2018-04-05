"use strict";
const http = require("http");
const fs = require("fs");

const handler = (req, res, err) => {
    if (err) console.error(err);
    let mask = new RegExp(/\/.*\.(.*)/i);
    if (mask.test(req.url)) {
        let arr = mask.exec(req.url);
        res.writeHead(200, { "Content-Type" : "text/" + arr[1]});
        fs.readFile(__dirname + "/public/" + arr[0], (err, data) => {
            if (data) {
                res.end(data);
            } else {
                res.end("404 Not Found");
            }
        });
    } else {
        res.writeHead(200, { "Content-Type" : "text/html"});
        fs.readFile(__dirname + "/public/index.html", (err, data) => {
            if (data) {
                res.end(data);
            } else {
                res.end("404 Not Found");
            }
        });
    }
};

const server = http.createServer()
    .on("request", handler)
    .listen(5000);
