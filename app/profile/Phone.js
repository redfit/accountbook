
Ext.define("AB.profile.Phone", {
  extend: "Ext.app.Profile",
  config: {
    views: ['Main'],
    models: [],
    stores: [],
    controllers: []
  },
  isActive: function(app) {
    return Ext.os.is.Phone;
  },
  launch: function() {
    Ext.fly('appLoadingIndicator').destroy();
    return Ext.Viewport.add(Ext.create('AB.view.phone.Main'));
  }
});
