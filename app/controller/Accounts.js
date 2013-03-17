
Ext.define("AB.controller.Accounts", {
  extend: "Ext.app.Controller",
  config: {
    routes: {
      'accounts': 'showList',
      'accounts/new': 'showCreateForm',
      'accounts/:id': 'showDetail',
      'accounts/:id/edit': 'showEditForm'
    },
    refs: {
      'detail': 'accountdetail',
      'form': 'accountform',
      'list': 'accountlist'
    },
    control: {
      'accountlist': {
        'recordtap': 'goDetail'
      },
      'form': {
        'saverecord': 'saveRecord'
      },
      'detail': {
        'showeditform': 'goEditForm',
        'showaction': 'showAction',
        'showdeleteconfirm': 'showDeleteConfirm'
      }
    }
  },
  showDetail: Ext.emptyFn,
  showList: Ext.emptyFn,
  showEditForm: Ext.emptyFn,
  goList: function() {
    return this.redirectTo('accounts');
  },
  goEditForm: function(record) {
    return this.redirectTo('accounts/' + record.get('id') + '/edit');
  },
  goDetail: function(record) {
    return this.redirectTo('accounts/' + record.get('id'));
  },
  showDeleteConfirm: function(record) {
    return Ext.Msg.confirm('確認', '削除してもいいですか？', function(btn) {
      if (btn === 'yes') {
        return this.deleteRecord(record);
      }
    }, this);
  },
  deleteRecord: function(record) {
    var store;
    console.log('delete record', record);
    store = Ext.getStore('Accounts');
    store.remove(record);
    store.sync();
    return this.showList();
  },
  showAction: function() {
    console.log('show action');
    return this.getDetail().showActionSheet();
  },
  saveRecord: function(record, values) {
    var id, store;
    console.log('save record in controller', record, values);
    record.setValues(values);
    store = Ext.getStore('Accounts');
    id = record.get('id');
    if (Ext.isEmpty(store.findRecord('id', id))) {
      store.add(record);
    }
    store.sync();
    return this.showDetail(record);
  },
  doWithRecord: function(id, fn) {
    var me, record, store;
    me = this;
    store = Ext.getStore('Accounts');
    record = store.findRecord('id', id);
    if (Ext.isEmpty(record)) {
      return me.goList();
    }
    return fn.call(me, record);
  }
});
