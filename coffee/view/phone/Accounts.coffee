Ext.define 'AB.view.phone.Accounts',
  extend: 'Ext.Container'
  xtype: 'phoneaccounts'

  requires: [
    'Ext.TitleBar'
    'AB.view.account.List'
    'AB.view.account.Detail'
  ]

  config:
    title: '履歴'
    iconCls: 'list'
    layout: 'fit'

    items:[
      xtype: 'container'
      itemId: 'accountPage'
      layout: 'card'

      items:[
        itemId: 'accountList'
        layout: 'fit'
        items:[
          docked: 'top'
          xtype: 'titlebar'
          title: '一覧'
        ,
          xtype: 'accountlist'
        ]
      ,
        itemId: 'accountDetail'
        layout: 'fit'
        items: [
          docked: 'top'
          xtype: 'titlebar'
          title: '履歴'
          items: [
            xtype: 'button'
            ui: 'back'
            text: '戻る'
            itemId: 'backToListButton'
          ]
        ,
          xtype: 'accountdetail'
        ]
        listeners: [
          delegate: '#backToListButton'
          event: 'tap'
          fn: ->
            # <debug>
            console.log('back to list button')
            # </debug>
            this.fireEvent('backtolist')
        ]
      ]
    ]
