
Ext.define("AB.controller.Accounts", {
  extend: "Ext.app.Controller",
  config: {
    refs: {
      'detail': 'accountdetail',
      'form': 'accountform',
      'list': 'accountlist',
      'page': 'phonemain #accountPage',
      'main': 'phonemain',
      'viewPanel': 'phoneaccounts',
      'editPanel': 'phoneform'
    },
    control: {
      'phonemain #accountDetail': {
        'backtolist': 'showList'
      },
      'accountlist': {
        'recordtap': 'showDetail'
      },
      'form': {
        'saverecord': 'saveRecord'
      },
      'detail': {
        'showeditform': 'showEditForm',
        'showaction': 'showAction'
      }
    }
  },
  showEditForm: function(record) {
    var me;
    console.log('show edit form');
    me = this;
    me.getForm().setRecord(record);
    me.getForm().editMode = true;
    return me.getMain().setActiveItem(me.getEditPanel());
  },
  showAction: function() {
    console.log('show action');
    return this.getDetail().showActionSheet();
  },
  showDetail: function(record) {
    var me;
    console.log('show detail');
    me = this;
    me.getPage().getLayout().setAnimation({
      type: 'slide',
      direction: 'left'
    });
    me.getDetail().setRecord(record);
    return me.getDetail().up('#accountPage').setActiveItem(1);
  },
  showList: function() {
    var me;
    console.log('show list');
    me = this;
    me.getMain().setActiveItem(me.getViewPanel());
    me.getPage().getLayout().setAnimation({
      type: 'slide',
      direction: 'right'
    });
    return me.getPage().setActiveItem(0);
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
  launch: function(app) {}
});
