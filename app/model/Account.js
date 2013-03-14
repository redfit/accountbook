Ext.define('AB.model.Account', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'auto'},
            {name: 'account', type: 'int'},
            {name: 'category', type: 'string'},
            {name: 'recorded', type: 'date'},
            {name: 'memo', type: 'string'}
        ]
    }
});