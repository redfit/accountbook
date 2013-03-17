Ext.define 'AB.view.phone.Setting',
  extend: 'AB.view.UrlBasedPanel'
  xtype: 'phonesetting'

  requires: ['Ext.TitleBar']

  config:
    title: '設定'
    iconCls: 'settings9'
    url: 'setting'
    layout: 'fit'

    items:[
      docked: 'top'
      xtype: 'titlebar'
      title: '設定'
    ]
