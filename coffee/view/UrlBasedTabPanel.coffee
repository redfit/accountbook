Ext.define 'AB.view.UrlBasedTabPanel',
  extend: 'Ext.tab.Panel'
  xtype: 'urlbasedtabpanel'

  config:
    listeners:
      'activeitemchange': (self, newTab, oldTab, eOpts)->
        me = @
        AB.app.redirectTo(newTab.getUrl()) if newTab.isXType('urlbasedpanel') and me.updateUrl_
        me.updateUrl_ = true

  initialize: ()->
    me = @
    me.callParent(arguments)
    me.updateUrl_ = true

  changeTab: (newTab)->
    me = @
    if @getActiveItem() isnt newTab
      me.updateUrl_ = false
      me.setActiveItem(newTab)
