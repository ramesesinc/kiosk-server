const path = require("path")
const fs = require("fs");
const confBuilder = require("./conf-builder");

const connections = {};

const loadConnection = connName => {
  const rootDir = global.gConfig.rootDir;
  const jsonFile = fs.readFileSync(path.join(rootDir, "connections", connName));
  return JSON.parse(jsonFile.toString());
}

const getConnection = (connName) => {
  let connection = connections[connName];
  if (!connection) {
    connection = loadConnection(connName);
    confBuilder.resolveSetting(connection);
    connections[connName] = connection;
  }
  return connection;
}

module.exports = {
  getConnection
}