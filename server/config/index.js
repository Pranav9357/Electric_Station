const envFile = `.env.${process.env.ENVIRONMENT_NAME}`;
require('dotenv').config({
    path: envFile
});

module.exports = () => ({
    port: process.env.PORT,
    memory: true
});
