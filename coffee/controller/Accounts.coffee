Ext.define "AB.controller.Accounts",
  extend: "Ext.app.Controller"
  config:
    refs:
      'detail': 'accountdetail'
      'form': 'accountform'
      'list': 'accountlist'
      'page': 'phonemain #accountPage'
      'main': 'phonemain'
      'viewPanel': 'phoneaccounts'
      'editPanel': 'phoneform'
    control:
      'phonemain #accountDetail':
        'backtolist': 'showList'

      'accountlist':
        'recordtap': 'showDetail'

      'form':
        'saverecord': 'saveRecord'

      'detail':
        'showeditform': 'showEditForm'
        'showaction': 'showAction'

  showEditForm: (record)->
    # <debug>
    console.log('show edit form')
    # </debug>
    me = @
    me.getForm().setRecord(record)
    me.getForm().editMode = true
    me.getMain().setActiveItem(me.getEditPanel())

  showAction: ->
    # <debug>
    console.log('show action')
    # </debug>
    @getDetail().showActionSheet()


  showDetail: (record)->
    # <debug>
    console.log('show detail')
    # </debug>
    me = @
    # もっと良い書き方は無いものか
    me.getPage().getLayout().setAnimation(
        type: 'slide'
        direction: 'left'
    )
    me.getDetail().setRecord(record)
    me.getDetail().up('#accountPage').setActiveItem(1)

  showList: ()->
    # <debug>
    console.log('show list')
    # </debug>
    me = @
    me.getMain().setActiveItem(me.getViewPanel())
    me.getPage().getLayout().setAnimation(
        type: 'slide'
        direction: 'right'
    )
    me.getPage().setActiveItem(0)

  saveRecord: (record, values)->
    # <debug>
    console.log('save record in controller', record, values)
    # </debug>
    record.setValues(values)
    store = Ext.getStore('Accounts')
    id = record.get('id')
    store.add(record) if Ext.isEmpty(store.findRecord('id', id))
    store.sync()
    @showDetail(record)




  #called when the Application is launched, remove if not needed
  launch: (app) ->
