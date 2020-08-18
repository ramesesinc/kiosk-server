const io = require("socket.io-client");
const connections = require("../lib/connections");
const serviceMgr = require("../lib/service-manager");

const CHANNEL = "/gdx";

const isRemote = (serviceName) => {
  return serviceName.indexOf(":") > 0;
};

const int2String = (array) => {
  let result = "";
  array.forEach((x) => {
    x.forEach((y) => {
      result += String.fromCharCode(y);
    });
  });
  return result;
};

const readAllChunks = async (readableStream) => {
  const reader = readableStream.getReader();
  const chunks = [];

  const chunkReader = async () => {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return int2String(chunks);
      }
      chunks.push(value);
      return chunkReader();
    });
  };

  return chunkReader();
};

const toFunc = (strFunc) => {
  return eval("(" + strFunc + ")");
};

const findRemoteService = async (name) => {
  const idx = name.indexOf(":");
  const channel = name.substring(0, idx);
  const serviceName = name.substring(idx + 1);
  const gdx = connections.getConnection("gdx");
  
  let url = "http://" + (gdx["app.host"] || "localhost:3000");
  url += `/service/${serviceName}`;

  const res = await fetch(url);
  if (res.status !== 200) {
    throw res.statusText;
  }

  const jsonStr = await readAllChunks(res.body);
  const serviceInfo = JSON.parse(jsonStr);

  const service = {
    name: serviceName,
    proxy: RemoteProxy(serviceName, channel)
  };

  serviceInfo.methods.forEach((method) => {
    service[method.name] = async function (arg, handler) {
      return await service.proxy.invoke(method.name, arg, handler);
    };
  });

  return service;
};

const findLocalService = async ({ serviceName, connection, module, debug }) => {
  const funcStr = await serviceMgr.getServiceMeta(serviceName, connection);
  const Func = toFunc(funcStr);
  return new Func(LocalProxy(serviceName, connection, module));
};

const RemoteProxy = (name, channel) => {
  const socket = io(CHANNEL);
  socket.connect();

  const invoke = async (method, args, handler) => {
    const promise = new Promise((resolve, reject) => {
      const params = {
        service: name,
        method: method,
        channel: channel,
        args: args
      };
      socket.emit("invoke", params, (res) => {
        console.log(
          `RemoteProxy [status] invoking ${params.service}.${params.method} channel: ${params.channel}`
        );
        if (res.status === "OK") {
          resolve(res.data);
        } else {
          reject(res.msg);
        }
      });
    });
    return await promise;
  };
  return { invoke };
};

const LocalProxy = (name, connection, module) => {
  const invoke = async (action, args) => {
    try {
      const svc = await serviceMgr.getService(name, action, connection);
      return await svc.invoke(args);
    } catch (err) {
      throw err.toString();
    }
  };
  return { invoke };
};

const serviceCache = {};

const getService = (options = { debug: false }) => {
  const lookup = async (serviceName, connection = "default", module) => {
    if (serviceCache[serviceName] == null) {
      let svc;
      if (isRemote(serviceName)) {
        svc = await findRemoteService(serviceName);
      } else {
        svc = await findLocalService({
          serviceName,
          connection,
          module,
          ...options
        });
      }
      serviceCache[serviceName] = svc;
    }
    return serviceCache[serviceName];
  };

  return {
    lookup
  };
};

module.exports = {
  getService,
}
