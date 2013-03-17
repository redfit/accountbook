Ext.define 'AB.view.account.Form',
  extend: 'Ext.form.Panel'
  xtype: 'accountform'

  requires:[
    'Ext.form.FieldSet'
  ]

  config:
    items: [
      xtype: 'accountfieldset'
    ,
      layout:
        type: 'vbox'
        pack: 'center'
        align: 'center'

      items:
        xtype: 'button'
        ui: 'action'
        text: '記録する'
        width: '80%'
        minWidth: '200px'
        handler: ->
          form = @up('accountform')
          form.fireEvent('saverecord', form.getRecord(), form.getValues())
    ]

  setup: ->
    if not @editMode
      now = new Date()
      record = Ext.create 'AB.model.Account',
        account: '0'
        category: '10'
        recorded: now
        memo: ''
      @setRecord(record)
    @editMode = false
