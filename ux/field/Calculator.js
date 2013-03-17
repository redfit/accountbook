
Ext.define('Ext.ux.field.Calculator', {
  extend: 'Ext.field.Text',
  xtype: 'calculatorfield',
  requires: ['Ext.ux.calc.Calculator'],
  config: {
    calculator: true,
    component: {
      useMask: true
    }
  },
  initialize: function() {
    var component, me;
    me = this;
    component = me.getComponent();
    return component.on({
      scope: me,
      masktap: 'onMaskTap'
    });
  },
  onMaskTap: function() {
    var me;
    me = this;
    if (me.getDisabled()) {
      return false;
    }
    me.onFocus();
    return false;
  },
  onFocus: function(e) {
    var component, me;
    me = this;
    component = me.getComponent();
    me.fireEvent('forcus', me, e);
    component.input.dom.blur();
    if (me.getReadOnly()) {
      return false;
    }
    me.isFocused = true;
    console.log("show calculator");
    return me.getCalculator().show();
  },
  getCalculator: function() {
    var calculator, me, value;
    me = this;
    calculator = me._calculator;
    value = me.getValue();
    if (calculator && !calculator.isPicker) {
      calculator = Ext.create('Ext.ux.calc.Calculator');
    }
    calculator.on({
      scope: me,
      change: 'onCalcChange'
    });
    Ext.Viewport.add(calculator);
    me._calculator = calculator;
    return calculator;
  },
  onCalcChange: function(calc, newVal, oldVal) {
    return this.setValue(newVal);
  }
});
