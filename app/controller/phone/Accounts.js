
Ext.define("AB.controller.phone.Accounts", {
  extend: "AB.controller.Accounts",
  config: {
    refs: {
      'page': 'phonemain #accountPage',
      'main': 'phonemain',
      'viewPanel': 'phoneaccounts',
      'editPanel': 'phoneform'
    },
    control: {
      'phonemain #accountDetail': {
        'backtolist': 'showList'
      }
    }
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
  showDetail: function(id) {
    var me;
    console.log('show detail', id);
    me = this;
    me.getPage().getLayout().setAnimation({
      type: 'slide',
      direction: 'left'
    });
    return me.doWithRecord(id, function(record) {
      me.getDetail().setRecord(record);
      me.getMain().changeTab(me.getViewPanel());
      return me.getPage().setActiveItem(1);
    });
  },
  showEditForm: function(id) {
    var me;
    console.log('show edit form');
    me = this;
    return me.doWithRecord(id, function(record) {
      me.getForm().setRecord(record);
      me.getForm().editMode = true;
      return me.showForm(false);
    });
  },
  showCreateForm: function() {
    var me;
    console.log('show create form');
    me = this;
    me.getForm().setup();
    return me.showForm(true);
  },
  showForm: function(updateUrl) {
    var me;
    me = this;
    return me.getMain().changeTab(me.getEditPanel());
  }
});
