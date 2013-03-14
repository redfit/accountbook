Ext.define 'AB.view.phone.Form',
  extend: 'Ext.Container'
  xtype: 'phoneform'

  requires: ['Ext.TitleBar']

  config:
    title: '入力する'
    iconCls: 'compose1'
    layout: 'fit'

    items:[
      {
        docked: 'top'
        xtype: 'titlebar'
        title: '入力する'
      }
    ]

