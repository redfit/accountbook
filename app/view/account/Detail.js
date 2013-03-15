
Ext.define('AB.view.account.Detail', {
  extend: 'Ext.Container',
  xtype: 'accountdetail',
  requires: ['Ext.ActionSheet'],
  constructor: function(config) {
    var me;
    me = this;
    me.callParent(arguments);
    me.actionSheet = Ext.create("Ext.ActionSheet", Ext.merge({
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
    }, config.actionSheetConfig));
    return Ext.Viewport.add(me.actionSheet);
  },
  showActionSheet: function() {
    return this.actionSheet.show();
  },
  hideActionSheet: function() {
    return this.actionSheet.hide();
  },
  config: {
    tpl: ['<div>{recorded}</div>', '<div>{category}</div>', '<div>{account}</div>', '<div>{memo}</div>']
  }
});
