Ext.define 'AB.view.account.List',
  extend: 'Ext.dataview.List'
  xtype: 'accountlist'

  config:
    store: 'Accounts'
    itemTpl: [
      '<div>{recorded}</div>',
      '<div>{category}</div>',
      '<div>{account}</div>',
      '<div>{memo}</div>'
    ]
    listeners: [
      event: 'itemtap'
      fn: 'onRecordTap'
    ]

  onRecordTap: (self, index, target, record, e, eOpts)->
    # <debug>
    console.log('record tapped')
    # </debug>
    this.fireEvent('recordtap', record)
