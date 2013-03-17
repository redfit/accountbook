
Ext.define('AB.view.phone.Accounts', {
  extend: 'AB.view.UrlBasedPanel',
  xtype: 'phoneaccounts',
  requires: ['Ext.TitleBar', 'AB.view.account.List', 'AB.view.account.Detail'],
  config: {
    title: '履歴',
    iconCls: 'list',
    url: 'accounts',
    layout: 'fit',
    items: [
      {
        xtype: 'container',
        itemId: 'accountPage',
        layout: 'card',
        items: [
          {
            itemId: 'accountList',
            layout: 'fit',
            items: [
              {
                docked: 'top',
                xtype: 'titlebar',
                title: '一覧'
              }, {
                xtype: 'accountlist'
              }
            ]
          }, {
            itemId: 'accountDetail',
            layout: 'fit',
            items: [
              {
                docked: 'top',
                xtype: 'titlebar',
                title: '履歴',
                items: [
                  {
                    xtype: 'button',
                    ui: 'back',
                    text: '戻る',
                    itemId: 'backToListButton'
                  }, {
                    xtype: 'button',
                    align: 'right',
                    ui: 'flat',
                    itemId: 'actionButton',
                    iconCls: 'action',
                    iconMask: true
                  }
                ]
              }, {
                xtype: 'accountdetail'
              }
            ],
            listeners: [
              {
                delegate: '#backToListButton',
                event: 'tap',
                fn: function() {
                  console.log('back to list button');
                  return this.fireEvent('backtolist');
                }
              }, {
                delegate: '#actionButton',
                event: 'tap',
                fn: function() {
                  console.log('action button');
                  return this.down('accountdetail').fireEvent('showaction');
                }
              }
            ]
          }
        ]
      }
    ]
  }
});
