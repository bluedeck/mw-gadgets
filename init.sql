global.abs_path = path => __dirname + path;
pre_require();
const http = require("http");
const dispatch = require("./dependencies/dispatch.js");
const flood_records_10s_period = {};
const flood_records_100s_period = {};
const flood_records_1ks_period = {};
const flood_records_5ks_period = {};

http.createServer(function (request, response) {

    set_headers(response);

    const rA = String(request.headers["x-real-ip"] || request.connection.remoteAddress);
    flood_mitigation_logger(rA);

    if(flood_records_10s_period[rA] > 300 ||
        flood_records_100s_period[rA] > 2000 ||
        flood_records_1ks_period[rA] > 10000 ||
        flood_records_5ks_period[rA] > 30000) {
        // if flood mitigation triggered, drop the connection.
        flood_drop(response);
        return;
    }

    dispatch(request, response);

}).listen(9098);

function flood_mitigation_logger(rA) {

    flood_records_10s_period[rA] = flood_records_10s_period[rA] ? flood_records_10s_period[rA]+1 : 1;
    flood_records_100s_period[rA] = flood_records_100s_period[rA] ? flood_records_100s_period[rA]+1 : 1;
    flood_records_1ks_period[rA] = flood_records_1ks_period[rA] ? flood_records_1ks_period[rA]+1 : 1;
    flood_records_5ks_period[rA] = flood_records_5ks_period[rA] ? flood_records_5ks_period[rA]+1 : 1;
    console.log(rA + " = " + flood_records_10s_period[rA] + "/" + flood_records_100s_period[rA] +  "/" + flood_records_1ks_period[rA] + "/" + flood_records_5ks_period[rA]);
    setTimeout(()=>{if(--flood_records_10s_period[rA] === 0) delete flood_records_10s_period[rA]}, 10e3);
    setTimeout(()=>{if(--flood_records_100s_period[rA] === 0) delete flood_records_100s_period[rA]}, 100e3);
    setTimeout(()=>{if(--flood_records_1ks_period[rA] === 0) delete flood_records_1ks_period[rA]}, 1000e3);
    setTimeout(()=>{if(--flood_records_5ks_period[rA] === 0) delete flood_records_5ks_period[rA]}, 5000e3);
}

function flood_drop(response) {

    response.setHeader("Content-Type", "text/html");
    response.writeHead(429);
    response.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="5" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Loading</title></head><body style="font-family: sans-serif; color: #7f888f; width:85%; max-width:1000px; margin:auto; line-height: 2em; padding: 3em 0;"><h1>Loading ...</h1><p>The server cannot process your request at this time. You will be reconnected momentarily. While this problem usually solves itself, there are a few possible causes to it: </p><ul><li>You or someone using the same network as you have a malfunctioning software</li><li>You or someone using the same network as you have too many instances of a software left open</li><li>We detected flooding behaviours</li><li>The network between you and the server has a malfunctioning relay</li></ul><p>You do not need to do anything while being automatically reconnected. If you are not reconnected within 15 seconds, there is a potential attack on your network. Please try switching network and reconnect.</p></body></html>`);
    response.destroy();
}

function set_headers(response) {

    // set headers to enforce security policies

    response.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "SAMEORIGIN");
    response.setHeader("X-XSS-Protection", "1");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("Server", "Easy RP v 2018.1.1 / s20");
    response.setHeader("Content-Security-Policy",
        "default-src 'self'; " +
        "frame-src 'self'; " +
        "script-src 'self'; " +
        "connect-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' https: data:; " +
        "object-src 'none'; " +
        "block-all-mixed-content; " +
        "report-uri https://www.bluedeck.org/api-dnp/eyJhY3Rpb24iOiJsb2ctZGItZHVtcCIsInRhcmdldCI6ImNzcC1kYi1kdW1wIn0"
    );
    response.setHeader("X-Bluedeck-Clever", "really-clever");
}

function pre_require() {

    console.log("main.js: pre-requiring local...");

    try {
        require("http");
        require("fs");
        require("./dependencies/dispatch.js");
        require("./dependencies/context.js");
        require("./dependencies/database.js");
        require("./functions/internationalization.js");
        require("./dependencies/wrappers/org.unblock-zh.js");
        require("./dependencies/wrappers/org.bluedeck.js");
        require("./functions/sha256.js");
        require("./functions/sha1.js");
        require("./functions/sha_image.js");
        require("./functions/accepted_languages.js");
        require("./dependencies/sequelize_wrap.js");
    }
    catch(e) {
        console.log("main.js: pre-require local package error:", e);
    }

    console.log("main.js: pre-requiring external...");

    try {
        require("mysql2");
        require("sequelize");
    }
    catch(e) {
        console.log("main.js: pre-require external package error:", e);
    }

    console.log("main.js: pre-requiring done.");
}
