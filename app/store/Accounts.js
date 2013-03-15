
Ext.define('AB.store.Accounts', {
  extend: 'Ext.data.Store',
  requires: ['Ext.data.proxy.LocalStorage'],
  config: {
    model: 'AB.model.Account',
    proxy: {
      type: 'localstorage',
      id: 'accounts-store'
    },
    autoLoad: true
  }
});
