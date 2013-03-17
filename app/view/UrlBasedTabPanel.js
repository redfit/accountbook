
Ext.define('AB.view.UrlBasedTabPanel', {
  extend: 'Ext.tab.Panel',
  xtype: 'urlbasedtabpanel',
  config: {
    listeners: {
      'activeitemchange': function(self, newTab, oldTab, eOpts) {
        var me;
        me = this;
        if (newTab.isXType('urlbasedpanel') && me.updateUrl_) {
          AB.app.redirectTo(newTab.getUrl());
        }
        return me.updateUrl_ = true;
      }
    }
  },
  initialize: function() {
    var me;
    me = this;
    me.callParent(arguments);
    return me.updateUrl_ = true;
  },
  changeTab: function(newTab) {
    var me;
    me = this;
    if (this.getActiveItem() !== newTab) {
      me.updateUrl_ = false;
      return me.setActiveItem(newTab);
    }
  }
});
