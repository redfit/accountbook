
Ext.define("AB.model.Account", {
  extend: "Ext.data.Model",
  config: {
    fields: [
      {
        name: "id",
        type: "auto"
      }, {
        name: "account",
        type: "int"
      }, {
        name: "category",
        type: "string"
      }, {
        name: "recorded",
        type: "date"
      }, {
        name: "memo",
        type: "string"
      }
    ],
    identifier: {
      type: 'uuid'
    }
  },
  setValues: function(values) {
    var me;
    console.log('values', values);
    me = this;
    return me.getFields().each(function(field) {
      var fid;
      fid = field.getName();
      if (!Ext.isEmpty(values[fid])) {
        return me.set(fid, values[fid]);
      }
    });
  }
});
