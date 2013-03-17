Ext.define "AB.controller.phone.Accounts",
  extend: "AB.controller.Accounts"

  config:
    refs:
      'page': 'phonemain #accountPage'
      'main': 'phonemain'
      'viewPanel': 'phoneaccounts'
      'editPanel': 'phoneform'
    control:
      'phonemain #accountDetail':
        'backtolist': 'showList'

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

  showDetail: (id)->
    # <debug>
    console.log('show detail', id)
    # </debug>
    me = @
    # もっと良い書き方は無いものか
    me.getPage().getLayout().setAnimation(
        type: 'slide'
        direction: 'left'
    )

    me.doWithRecord id, (record)->
      me.getDetail().setRecord(record)
      me.getMain().changeTab(me.getViewPanel())
      me.getPage().setActiveItem(1)

  showEditForm: (id)->
    # <debug>
    console.log('show edit form')
    # </debug>
    me = @

    me.doWithRecord id, (record)->
      me.getForm().setRecord(record)
      me.getForm().editMode = true
      me.showForm(false)

  showCreateForm: ->
    # <debug>
    console.log('show create form')
    # </debug>
    me = @
    me.getForm().setup()
    me.showForm(true)

  showForm: (updateUrl)->
    me = @
    me.getMain().changeTab(me.getEditPanel())

