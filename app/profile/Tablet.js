
Ext.define("AB.profile.Tablet", {
  extend: "Ext.app.Profile",
  config: {
    views: [],
    models: [],
    stores: [],
    controllers: []
  },
  isActive: function(app) {
    return Ext.os.is.Tablet;
  }
});
