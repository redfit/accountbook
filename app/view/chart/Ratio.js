
Ext.define("AB.view.chart.Ratio", {
  extend: "Ext.chart.PolarChart",
  xtype: "chartratio",
  requires: ["Ext.data.JsonStore", "Ext.chart.series.Pie"],
  config: {
    layout: "fit",
    animate: true,
    insetPadding: {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50
    }
  },
  constructor: function() {
    var store;
    this.callParent(arguments);
    store = Ext.create("Ext.data.JsonStore", {
      fields: ["category", "account"],
      data: [
        {
          'category': 'テスト1',
          'account': 1000
        }, {
          'category': 'テスト2',
          'account': 2000
        }, {
          'category': 'テスト3',
          'account': 3000
        }, {
          'category': 'テスト4',
          'account': 4000
        }, {
          'category': 'テスト5',
          'account': 5000
        }
      ]
    });
    this.setStore(store);
    return this.setSeries([
      {
        type: "pie",
        rotation: -Math.PI / 2,
        labelField: "category",
        xField: "account",
        donut: 25,
        colors: ["#e0440e", "#e6693e", "#ec8f6e", "#f3b49f", "#f6c7b6"]
      }
    ]);
  },
  setData: function(data) {
    var me;
    me = this;
    me.getStore().setData(data);
    return me.getSeries()[0].setSubStyle({
      fill: data.map(function(rec) {
        return rec.color;
      })
    });
  }
});
