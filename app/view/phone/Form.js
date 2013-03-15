
Ext.define('AB.view.phone.Form', {
  extend: 'Ext.Container',
  xtype: 'phoneform',
  requires: ['Ext.TitleBar', 'AB.view.account.Form'],
  config: {
    title: '入力する',
    iconCls: 'compose1',
    url: 'accounts/new',
    layout: 'fit',
    items: [
      {
        docked: 'top',
        xtype: 'titlebar',
        title: '入力する'
      }, {
        xtype: 'accountform'
      }
    ],
    listeners: [
      {
        event: 'activate',
        fn: function() {
          return this.down('accountform').setup();
        }
      }
    ]
  }
});
