Ext.define 'AB.view.phone.Setting',
  extend: 'Ext.Container'
  xtype: 'phonesetting'

  requires: ['Ext.TitleBar']

  config:
    title: '設定'
    iconCls: 'settings9'
    layout: 'fit'

    items:[
      {
        docked: 'top'
        xtype: 'titlebar'
        title: '設定'
      }
    ]
