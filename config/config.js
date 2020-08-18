const path = require("path");
const _ = require("lodash");

const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
finalConfig.rootDir = path.join(__dirname, "..");

global.gConfig = finalConfig;
