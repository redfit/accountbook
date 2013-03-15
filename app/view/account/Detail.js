
Ext.define('AB.view.account.Detail', {
  extend: 'Ext.form.Panel',
  xtype: 'accountdetail',
  requires: ['Ext.ActionSheet', 'AB.view.account.FieldSet'],
  config: {
    items: [
      {
        xtype: 'accountfieldset',
        defaults: {
          disabled: true,
          disabledCls: null,
          component: {
            disabled: true,
            disabledCls: null
          }
        }
      }
    ]
  },
  constructor: function(config) {
    var me;
    me = this;
    me.callParent(arguments);
    me.actionSheet = Ext.create("Ext.ActionSheet", {
      hidden: true,
      itemId: "actionSheet",
      items: [
        {
          text: "編集",
          handler: function() {
            me.hideActionSheet();
            return me.fireEvent("showeditform", me.getRecord());
          }
        }, {
          text: "削除",
          ui: "decline",
          handler: function() {
            me.hideActionSheet();
            return me.fireEvent("showdeleteconfirm", me.getRecord());
          }
        }, {
          text: "キャンセル",
          ui: "confirm",
          handler: function() {
            return me.hideActionSheet();
          }
        }
      ]
    });
    Ext.Viewport.add(me.actionSheet);
    return null;
  },
  showActionSheet: function() {
    return this.actionSheet.show();
  },
  hideActionSheet: function() {
    return this.actionSheet.hide();
  }
});
