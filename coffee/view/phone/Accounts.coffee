Ext.define 'AB.view.phone.Accounts',
  extend: 'Ext.Container'
  xtype: 'phoneaccounts'

  requires: ['Ext.TitleBar']

  config:
    title: '履歴'
    iconCls: 'list'
    layout: 'fit'

    items:[
      {
        docked: 'top'
        xtype: 'titlebar'
        title: '履歴'
      }
    ]
