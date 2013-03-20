Ext.define "Ext.ux.data.proxy.Dropbox",

  #global Dropbox
  extend: "Ext.data.proxy.Client"
  alias: "proxy.dropbox"
  config:
    key: ''
    rememberUser: false
    enablePagingParams: false
    filePath: "sample.dat"

  constructor: (config) ->
    me = this
    me.callParent arguments

    #<debug>
    Ext.Logger.error "The Ext.ux.data.proxy.Dropbox needs the encoded API key to access Dropbox."  if Ext.isEmpty(config.key)

    #</debug>
    me.client_ = new Dropbox.Client(
      key: config.key
      sandbox: true
    )

    #TODO Change timing to auth
    me.auth()
    @

  create: (operation, callback, scope) ->
    console.log "create"
    me = this
    records = operation.getRecords()
    path = me.selectFilePath(records)
    me.updateCache path, records
    me.writeFile path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope

  read: (operation, callback, scope) ->
    onDataRead = (success, data) ->
      reader = me.getReader()
      model = me.getModel()
      sorters = operation.getSorters()
      filters = operation.getFilters()
      start = operation.getStart()
      limit = operation.getLimit()
      resultSet = undefined
      records = undefined
      collection = undefined
      console.log 'success', success
      console.log 'data', data
      console.log 'reader', reader
      try
        resultSet = reader.read(data)
      catch e
        operation.setException e.message
        me.fireEvent "exception", me, data, operation
        return
      records = resultSet.getRecords()
      me.updateCache path, records
      collection = Ext.create("Ext.util.Collection")

      # First we comply to filters
      collection.setFilters filters  if filters and filters.length

      # Then we comply to sorters
      collection.setSorters sorters  if sorters and sorters.length
      collection.addAll records
      if me.getEnablePagingParams() and start isnt `undefined` and limit isnt `undefined`
        records = collection.items.slice(start, start + limit)
      else
        records = collection.items.slice()
      operation.setSuccessful()
      operation.setCompleted()
      resultSet.setRecords records
      operation.setRecords records
      callback.call scope or me, operation  if typeof callback is "function"

    console.log "read"
    me = this
    path = me.selectFilePath()
    me.cache_ = me.cache_ or {}
    me.cache_[path] = me.cache_[path] or {}
    me.readFile path, onDataRead

  update: (operation, callback, scope) ->
    console.log "update"
    me = this
    records = operation.getRecords()
    path = me.selectFilePath(records)
    me.updateCache path, records
    me.writeFile path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope

  destroy: (operation, callback, scope) ->
    console.log "destroy"
    me = this
    records = operation.getRecords()
    path = me.selectFilePath(records)
    me.removeCache path, records
    me.writeFile path, JSON.stringify(me.getCacheAsData(path)), operation, callback, scope

  auth: ->
    me = this
    client = me.client_
    client.authDriver new Dropbox.Drivers.Redirect(rememberUser: me.getRememberUser()) # if true, save auth info in local storage
    client.authenticate (error, client) ->
      return me.showError(error)  if error
      console.log "ok"

      # Update clinet_ with authenticated client.
      me.clinet_ = client


  readFile: (path, callback) ->
    me = this
    client = me.client_
    client.readFile path, (error, data) ->
      console.log path, error, data
      return me.showError(error)  if error
      callback.call me, true, data


  writeFile: (path, data, operation, callback, scope) ->
    me = this
    client = me.client_
    client.writeFile path, data, (error, stat) ->
      return me.showError(error)  if error
      callback.call scope or me, operation  if typeof callback is "function"


  showError: (error) ->

    #TODO implements
    console.log error.status

  selectFilePath: (data) ->
    me = this
    path = me.getFilePath()
    path = path.call(me, data)  if typeof path is "function"

    #TODO Throw exception?
    path = "sample.dat"  if not path or path.length is 0
    path

  updateCache: (key, records) ->
    me = this
    cache = me.getCache(key)
    records.forEach (rec) ->
      cache[rec.getId()] = rec.getData()


  removeCache: (key, records) ->
    me = this
    cache = me.getCache(key)
    records.forEach (rec) ->
      delete cache[rec.getId()]


  getCache: (key) ->
    me = this
    me.cache_ = me.cache_ or {}
    me.cache_[key] = me.cache_[key] or {}
    me.cache_[key]

  getCacheAsData: (key) ->
    me = this
    cache = me.getCache(key)
    Object.keys(cache).map (id) ->
      cache[id]

