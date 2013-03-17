Ext.define "AB.controller.Accounts",
  extend: "Ext.app.Controller"
  config:
    routes:
      'accounts': 'showList'
      'accounts/new': 'showCreateForm'
      'accounts/:id': 'showDetail'
      'accounts/:id/edit': 'showEditForm'
    refs:
      'detail': 'accountdetail'
      'form': 'accountform'
      'list': 'accountlist'
    control:
      'accountlist':
        'recordtap': 'goDetail'

      'form':
        'saverecord': 'saveRecord'

      'detail':
        'showeditform': 'goEditForm'
        'showaction': 'showAction'
        'showdeleteconfirm': 'showDeleteConfirm'

  showDetail: Ext.emptyFn

  showList: Ext.emptyFn

  showEditForm: Ext.emptyFn

  goList: ()->
    @redirectTo('accounts')

  goEditForm: (record)->
    @redirectTo('accounts/' + record.get('id') + '/edit')

  goDetail: (record)->
    @redirectTo('accounts/' + record.get('id'))

  showDeleteConfirm: (record)->
    Ext.Msg.confirm('確認','削除してもいいですか？', (btn)->
      @deleteRecord(record) if btn is 'yes'
    , @)

  deleteRecord: (record)->
    # <debug>
    console.log('delete record', record)
    # </debug>
    store = Ext.getStore('Accounts')
    store.remove(record)
    store.sync()
    @showList()

  showAction: ->
    # <debug>
    console.log('show action')
    # </debug>
    @getDetail().showActionSheet()

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

  doWithRecord: (id, fn)->
    me = @
    store = Ext.getStore('Accounts')
    record = store.findRecord('id', id)
    if (Ext.isEmpty(record))
       return me.goList()

    fn.call(me, record)




