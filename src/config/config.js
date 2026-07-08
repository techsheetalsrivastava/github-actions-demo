const packageInfo = require("../../package.json");

const config = {

    application: process.env.APP_NAME || "OpsPulse",

    version: packageInfo.version,

    environment: process.env.ENVIRONMENT || "Development",

    port: process.env.PORT || 3000

};

module.exports = config;