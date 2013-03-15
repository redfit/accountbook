Ext.define 'AB.view.account.Detail',
  extend: 'Ext.form.Panel'
  xtype: 'accountdetail'
  requires: [
    'Ext.ActionSheet'
    'AB.view.account.FieldSet'
  ]

  config:
    items: [
      xtype: 'accountfieldset'
      defaults:
        disabled: true
        disabledCls: null
        component:
          disabled: true
          disabledCls: null
    ]

  constructor: (config)->
    me = @
    me.callParent(arguments)
    me.actionSheet = Ext.create "Ext.ActionSheet",
      hidden: true
      itemId: "actionSheet"
      items: [
        text: "編集"
        handler: ->
          me.hideActionSheet()
          me.fireEvent "showeditform", me.getRecord()
      ,
        text: "削除"
        ui: "decline"
        handler: ->
          me.hideActionSheet()
          me.fireEvent "showdeleteconfirm", me.getRecord()
      ,
        text: "キャンセル"
        ui: "confirm"
        handler: ->
          me.hideActionSheet()
      ]
    Ext.Viewport.add me.actionSheet
    # this返さないと上手く動かない
    null

  showActionSheet: ->
    @actionSheet.show()

  hideActionSheet: ->
    @actionSheet.hide()

