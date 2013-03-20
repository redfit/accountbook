
Ext.define("Ext.ux.data.proxy.Dropbox", {
  extend: "Ext.data.proxy.Client",
  alias: "proxy.dropbox",
  config: {
    key: '',
    rememberUser: false,
    enablePagingParams: false,
    filePath: "sample.dat"
  },
  constructor: function(config) {
    var me;
    me = this;
    me.callParent(arguments);
    if (Ext.isEmpty(config.key)) {
      Ext.Logger.error("The Ext.ux.data.proxy.Dropbox needs the encoded API key to access Dropbox.");
    }
    me.client_ = new Dropbox.Client({
      key: config.key,
      sandbox: true
    });
    me.auth();
    return this;
  },
  create: function(operation, callback, scope) {
    var me, path, records;
    console.log("create");
    me = this;
    records = operation.getRecords();
    path = me.selectFilePath(records);
    me.updateCache(path, records);
    return me.writeFile(path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope);
  },
  read: function(operation, callback, scope) {
    var me, onDataRead, path;
    onDataRead = function(success, data) {
      var collection, filters, limit, model, reader, records, resultSet, sorters, start;
      reader = me.getReader();
      model = me.getModel();
      sorters = operation.getSorters();
      filters = operation.getFilters();
      start = operation.getStart();
      limit = operation.getLimit();
      resultSet = void 0;
      records = void 0;
      collection = void 0;
      console.log('success', success);
      console.log('data', data);
      console.log('reader', reader);
      try {
        resultSet = reader.read(data);
      } catch (e) {
        operation.setException(e.message);
        me.fireEvent("exception", me, data, operation);
        return;
      }
      records = resultSet.getRecords();
      me.updateCache(path, records);
      collection = Ext.create("Ext.util.Collection");
      if (filters && filters.length) {
        collection.setFilters(filters);
      }
      if (sorters && sorters.length) {
        collection.setSorters(sorters);
      }
      collection.addAll(records);
      if (me.getEnablePagingParams() && start !== undefined && limit !== undefined) {
        records = collection.items.slice(start, start + limit);
      } else {
        records = collection.items.slice();
      }
      operation.setSuccessful();
      operation.setCompleted();
      resultSet.setRecords(records);
      operation.setRecords(records);
      if (typeof callback === "function") {
        return callback.call(scope || me, operation);
      }
    };
    console.log("read");
    me = this;
    path = me.selectFilePath();
    me.cache_ = me.cache_ || {};
    me.cache_[path] = me.cache_[path] || {};
    return me.readFile(path, onDataRead);
  },
  update: function(operation, callback, scope) {
    var me, path, records;
    console.log("update");
    me = this;
    records = operation.getRecords();
    path = me.selectFilePath(records);
    me.updateCache(path, records);
    return me.writeFile(path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope);
  },
  destroy: function(operation, callback, scope) {
    var me, path, records;
    console.log("destroy");
    me = this;
    records = operation.getRecords();
    path = me.selectFilePath(records);
    me.removeCache(path, records);
    return me.writeFile(path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope);
  },
  auth: function() {
    var client, me;
    me = this;
    client = me.client_;
    client.authDriver(new Dropbox.Drivers.Redirect({
      rememberUser: me.getRememberUser()
    }));
    return client.authenticate(function(error, client) {
      if (error) {
        return me.showError(error);
      }
      console.log("ok");
      return me.clinet_ = client;
    });
  },
  readFile: function(path, callback) {
    var client, me;
    me = this;
    client = me.client_;
    return client.readFile(path, function(error, data) {
      console.log(path, error, data);
      if (error) {
        return me.showError(error);
      }
      return callback.call(me, true, data);
    });
  },
  writeFile: function(path, data, operation, callback, scope) {
    var client, me;
    me = this;
    client = me.client_;
    return client.writeFile(path, data, function(error, stat) {
      if (error) {
        return me.showError(error);
      }
      if (typeof callback === "function") {
        return callback.call(scope || me, operation);
      }
    });
  },
  showError: function(error) {
    return console.log(error.status);
  },
  selectFilePath: function(data) {
    var me, path;
    me = this;
    path = me.getFilePath();
    if (typeof path === "function") {
      path = path.call(me, data);
    }
    if (!path || path.length === 0) {
      path = "sample.dat";
    }
    return path;
  },
  updateCache: function(key, records) {
    var cache, me;
    me = this;
    cache = me.getCache(key);
    return records.forEach(function(rec) {
      return cache[rec.getId()] = rec.getData();
    });
  },
  removeCache: function(key, records) {
    var cache, me;
    me = this;
    cache = me.getCache(key);
    return records.forEach(function(rec) {
      return delete cache[rec.getId()];
    });
  },
  getCache: function(key) {
    var me;
    me = this;
    me.cache_ = me.cache_ || {};
    me.cache_[key] = me.cache_[key] || {};
    return me.cache_[key];
  },
  getCacheAsData: function(key) {
    var cache, me;
    me = this;
    cache = me.getCache(key);
    return Object.keys(cache).map(function(id) {
      return cache[id];
    });
  }
});
