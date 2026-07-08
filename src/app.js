const express = require("express");
const os = require("os");
const path = require("path");
const config = require("./config/config");

const app = express();
const PORT = config.port;


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        timestamp: new Date()
    });
});

app.get("/version", (req, res) => {
    res.json({
        version: config.version
    });
});

app.get("/hostname", (req, res) => {
    res.json({
        hostname: os.hostname()
    });
});

app.get("/environment", (req, res) => {
    res.json({
        environment: config.environment
    });
});

app.get("/time", (req, res) => {
    res.json({
        serverTime: new Date()
    });
});

app.get("/ping", (req, res) => {
    res.json({
        message: "pong"
    });
});


app.get("/status", (req, res) => {

    res.json({

        application: config.application,

        status: "UP",

        version: config.version,

        environment: config.environment,

        hostname: os.hostname(),

        serverTime: new Date()

    });

});

app.listen(PORT, () => {
    console.log(`OpsPulse running on port ${PORT}`);
});