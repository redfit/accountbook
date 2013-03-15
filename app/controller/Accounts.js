
Ext.define("AB.controller.Accounts", {
  extend: "Ext.app.Controller",
  config: {
    refs: {
      'detail': 'accountdetail',
      'form': 'accountform',
      'list': 'accountlist',
      'page': 'phonemain #accountPage',
      'main': 'phonemain',
      'viewPanel': 'phoneaccounts'
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
      }
    }
  },
  showDetail: function(record) {
    var me;
    console.log('show detail', record);
    me = this;
    me.getPage().getLayout().setAnimation({
      type: 'slide',
      direction: 'left'
    });
    me.getDetail().setRecord(record);
    me.getDetail().up('#accountPage').setActiveItem(1);
    return me.getMain().setActiveItem(me.getViewPanel());
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
    var store;
    console.log('save record in controller', record, values);
    record.setValues(values);
    store = Ext.getStore('Accounts');
    store.add(record);
    store.sync();
    return this.showDetail(record);
  },
  launch: function(app) {}
});
