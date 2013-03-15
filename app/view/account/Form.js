
Ext.define('AB.view.account.Form', {
  extend: 'Ext.form.Panel',
  xtype: 'accountform',
  requires: ['Ext.form.FieldSet', 'Ext.field.Number', 'Ext.field.Select', 'Ext.field.DatePicker'],
  config: {
    items: [
      {
        xtype: 'fieldset',
        items: [
          {
            xtype: 'accountfieldset'
          }
        ]
      }, {
        layout: {
          type: 'vbox',
          pack: 'center',
          align: 'center'
        },
        items: {
          xtype: 'button',
          ui: 'action',
          text: '記録する',
          width: '80%',
          minWidth: '200px',
          handler: function() {
            var form;
            form = this.up('accountform');
            return form.fireEvent('saverecord', form.getRecord(), form.getValues());
          }
        }
      }
    ]
  },
  setup: function() {
    var now, record;
    if (!this.editMode) {
      now = new Date();
      record = Ext.create('AB.model.Account', {
        account: '0',
        category: '10',
        recorded: now,
        memo: ''
      });
      this.setRecord(record);
    }
    return this.editMode = false;
  }
});
