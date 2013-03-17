Ext.define 'AB.view.phone.Home',
  extend: 'AB.view.UrlBasedPanel'
  xtype: 'phonehome'

  requires: ['Ext.TitleBar']

  config:
    title: 'ホーム'
    iconCls: 'home'
    layout: 'fit'

    items:[
      docked: 'top'
      xtype: 'titlebar'
      title: 'ホーム'
    ]

