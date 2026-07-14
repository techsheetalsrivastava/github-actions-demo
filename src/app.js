const express = require("express");
const os = require("os");
const path = require("path");
const config = require("./config/config");

const app = express();
const PORT = config.port;

const express = require("express");
const os = require("os");
const path = require("path");
const config = require("./config/config");
const { exec } = require("child_process");

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

    exec("docker ps -q | wc -l", (err, stdout) => {

        const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);

        const freeMemory = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);

        const usedMemory = (totalMemory - freeMemory).toFixed(2);

        const memoryUsage = (
            (usedMemory / totalMemory) * 100
        ).toFixed(1);

        const uptime = Math.floor(os.uptime() / 60);

        res.json({

            application: config.application,

            status: "UP",

            version: config.version,

            environment: config.environment,

            hostname: os.hostname(),

            serverTime: new Date(),

            metrics: {

                totalMemory: `${totalMemory} GB`,

                usedMemory: `${usedMemory} GB`,

                freeMemory: `${freeMemory} GB`,

                memoryUsage: `${memoryUsage}%`,

                uptime: `${uptime} mins`,

                runningContainers: stdout.trim()

            }

        });

    });

});