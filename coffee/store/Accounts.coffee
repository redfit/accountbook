Ext.define 'AB.store.Accounts',
  extend: 'Ext.data.Store'
  # requires: ['Ext.data.proxy.LocalStorage']
  requires: ['Ext.ux.data.proxy.Dropbox']

  config:
    model: 'AB.model.Account'
    proxy:
      # type: 'localstorage'
      # id: 'accounts-store'
      type: 'dropbox'
      key: 'RT9hVH5iMnA=|4j3MAAKk4sQeDCN1M8f2+kRTrO+HwZRUOhL4D+YXNw=='
      rememberUser: true

    autoLoad: true
