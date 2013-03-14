Ext.define "AB.view.phone.Main",
  extend: "Ext.tab.Panel"
  xtype: 'phonemain'
  requires: [
    'AB.view.phone.Home'
    'AB.view.phone.Form'
    'AB.view.phone.Accounts'
    'AB.view.phone.Setting'
  ]

  config:
    tabBarPosition: 'bottom'

    layout:
      animation: ''


    items:[
      xtype: 'phonehome'
    ,
      xtype: 'phoneform'
    ,
      xtype: 'phoneaccounts'
    ,
      xtype: 'phonesetting'
    ]
