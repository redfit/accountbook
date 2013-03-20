
Ext.define('AB.view.chart.Daily', {
  extend: 'Ext.chart.CartesianChart',
  xtype: 'chartdaily',
  requires: ['Ext.data.JsonStore', 'Ext.chart.axis.Numeric', 'Ext.chart.series.Bar'],
  config: {
    layout: 'fit',
    animate: true,
    insetPadding: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    },
    innerPadding: {
      top: 0,
      left: 0,
      right: 5,
      bottom: 0
    },
    axes: [
      {
        type: 'numeric',
        position: 'left',
        fields: ['account'],
        title: {
          text: '金額',
          fontSize: 14
        },
        label: {
          rotate: {
            degrees: -30
          }
        },
        grid: true,
        minimum: 0
      }, {
        type: 'numeric',
        position: 'bottom',
        fields: ['day'],
        title: {
          text: '日付',
          fontSize: 14
        },
        minimum: 0
      }
    ]
  },
  constructor: function() {
    var store;
    this.callParent(arguments);
    store = Ext.create('Ext.data.JsonStore', {
      fields: ['day', 'account'],
      data: [
        {
          'day': 1,
          'account': 1000
        }, {
          'day': 2,
          'account': 2000
        }, {
          'day': 3,
          'account': 3000
        }, {
          'day': 4,
          'account': 4000
        }, {
          'day': 5,
          'account': 5000
        }
      ]
    });
    this.setStore(store);
    return this.setSeries([
      {
        type: 'bar',
        style: {
          fill: '#e0440e'
        },
        xField: 'day',
        yField: 'account'
      }
    ]);
  }
});
