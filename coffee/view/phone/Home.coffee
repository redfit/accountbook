Ext.define 'AB.view.phone.Home',
  extend: 'AB.view.UrlBasedPanel'
  xtype: 'phonehome'

  requires: [
    'Ext.TitleBar'
    'Ext.carousel.Carousel'
    'AB.view.chart.Ratio'
    'AB.view.chart.Daily'
  ]

  config:
    title: 'ホーム'
    url: 'home'
    iconCls: 'home'
    layout: 'fit'

    items:[
      docked: 'top'
      xtype: 'titlebar'
      title: 'ホーム'
    ,
      xtype: 'carousel'
      items: [
        xtype: 'chartratio'
      ,
        xtype: 'chartdaily'
      ]
    ]

