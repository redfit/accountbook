
Ext.define('AB.view.account.List', {
  extend: 'Ext.dataview.List',
  xtype: 'accountlist',
  config: {
    store: 'Accounts',
    itemTpl: ['<div>{recorded}</div>', '<div>{category}</div>', '<div>{account}</div>', '<div>{memo}</div>'],
    listeners: [
      {
        event: 'itemtap',
        fn: 'onRecordTap'
      }
    ]
  },
  onRecordTap: function(self, index, target, record, e, eOpts) {
    console.log('record tapped');
    return this.fireEvent('recordtap', record);
  }
});
