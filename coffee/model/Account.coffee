Ext.define "AB.model.Account",
  extend: "Ext.data.Model"
  config:
    fields: [
      name: "id"
      type: "auto"
    ,
      name: "account"
      type: "int"
    ,
      name: "category"
      type: "string"
    ,
      name: "recorded"
      type: "date"
    ,
      name: "memo"
      type: "string"
    ]
    identifier:
      type: 'uuid'

  setValues: (values)->
    # <debug>
    console.log('values', values)
    # </debug>
    me = @
    me.getFields().each((field)->
      fid = field.getName()
      me.set(fid, values[fid]) if not Ext.isEmpty(values[fid])
    )
