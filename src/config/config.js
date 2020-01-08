const config = {};

config.nodeApi = process.env.NODEAPI || "https://localhost:3001/api";
config.env = process.env.ENV || "dev"; // dev or prod

module.exports = config;
