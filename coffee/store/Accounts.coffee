Ext.define 'AB.store.Accounts',
  extend: 'Ext.data.Store'
  config:
    model: 'AB.model.Account'
    data: [
      id: '1'
      account: 1000
      category: '10'
      recorded: '2013-03-10 12:00:00'
      memo: 'エナジードリンク x 5'
    ,
      id: '2'
      account: 2000
      category: '10'
      recorded: '2013-03-20 12:00:00'
      memo: 'エナジードリンク x 10'
    ]
    autoLoad: true
