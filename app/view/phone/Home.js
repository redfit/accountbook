
Ext.define('AB.view.phone.Home', {
  extend: 'Ext.Container',
  xtype: 'phonehome',
  requires: ['Ext.TitleBar'],
  config: {
    title: 'ホーム',
    iconCls: 'home',
    layout: 'fit',
    items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        title: 'ホーム'
      }
    ]
  }
});
