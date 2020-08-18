const path = require('path');
const fs = require('fs');
const ini = require('ini');

const loadConf = rootDir => {
  const confFiles = ['res.conf', 'custom.conf', 'env.conf'];
  try {
    let conf = {};
    confFiles.forEach( confFile => {
      const confFileName = path.join(rootDir, '_resources', confFile);
      if (fs.existsSync(confFileName)) {
        const newConf = ini.parse(fs.readFileSync(confFileName, 'utf-8'));
        conf = {...conf, ...newConf}
      }
    })
    resolveConfValues(conf);
    return conf;

  } catch(err) {
    console.log('loadConf [ERROR] ', err);
  }
  return null;
}

const resolveConfValues = (conf) => {
  const values = {};
  for (key in conf) {
    if (conf.hasOwnProperty(key) && conf[key]) {
      const val = conf[key];
      if (typeof val !== 'string' || !val.trim().startsWith("${")) {
        values[key] = val;
      }
    }
  }
  let pass = false;
  for (key in conf) {
    if (conf.hasOwnProperty(key) && conf[key]) {
      const keyValue = conf[key];
      if (typeof keyValue === "string" && keyValue.trim().startsWith("${")) {
        const vars = keyValue.match(/\${(.*)}/);
        if (vars && values[vars[1]]) {
          conf[key] = values[vars[1]];
          pass = true;
        }
      }
    }
  }
  if (pass) {
    resolveConfValues(conf);
  }
}

const resolveSetting = (connection) => {
  const conf = loadConf(path.join(__dirname, ".."));
  Object.keys(connection).forEach(key => {
    const value = connection[key];
    Object.keys(conf).forEach(ckey => {
      connection[key] = value.toString().replace("${"+ckey+"}", conf[ckey]);
    })
  })
}

module.exports = {
  resolveSetting
}



