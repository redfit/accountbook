var onInputNumber;

Ext.define('Ext.ux.calc.Calculator', {
  extend: 'Ext.Sheet',
  xtype: 'calculator',
  config: {
    lhs: 0,
    rhs: 0,
    value: '0',
    op: Ext.emptyFn,
    newInput: true,
    left: 0,
    right: 0,
    bottom: 0,
    centered: false,
    height: 'auto',
    style: 'padding: 1% 0 1% 0',
    modal: {
      transparent: true
    },
    hideOnMaskTap: true,
    items: {
      xtype: 'container',
      layout: 'hbox',
      defaults: {
        layout: 'vbox',
        width: '20%',
        margin: '2%',
        defaults: {
          xtype: 'button',
          height: '30pt',
          margin: '3pt 0 3pt 0',
          act: onInputNumber = function(calc, val) {
            if (val === '0') {
              calc.setValue(this.getText());
            } else {
              calc.setValue(val + this.getText());
            }
            return calc.setRhs(calc.getValueAsNum());
          }
        }
      },
      items: [
        {
          xtype: 'spacer',
          width: '2%',
          margin: '0'
        }, {
          items: [
            {
              text: 'AC',
              ui: 'decline',
              act: function(calc, val) {
                calc.setNewInput(true);
                calc.setLhs(0);
                calc.setRhs(0);
                calc.setValue('0');
                return calc.setOp(Ext.emptyFn);
              }
            }, {
              text: '7'
            }, {
              text: '4'
            }, {
              text: '1'
            }, {
              text: '0'
            }
          ]
        }, {
          items: [
            {
              text: '&plusmn;',
              ui: 'action',
              act: function(calc, val) {
                if (val.indexOf('-') === 0) {
                  calc.setValue(val.slice(1));
                } else {
                  calc.setValue('-' + val);
                }
                return calc.setRhs(calc.getValueAsNum());
              }
            }, {
              text: '8'
            }, {
              text: '5'
            }, {
              text: '2'
            }, {
              text: '00'
            }
          ]
        }, {
          items: [
            {
              text: '&divide;',
              ui: 'action',
              op: function(lhs, rhs) {
                console.log('divide');
                return lhs / rhs;
              }
            }, {
              text: '9'
            }, {
              text: '6'
            }, {
              text: '3'
            }, {
              text: '.'
            }
          ]
        }, {
          items: [
            {
              text: '&times;',
              ui: 'action',
              op: function(lhs, rhs) {
                console.log('times');
                return lhs * rhs;
              }
            }, {
              text: '&minus;',
              ui: 'action',
              op: function(lhs, rhs) {
                console.log('minus');
                return lhs - rhs;
              }
            }, {
              text: '&plus;',
              ui: 'action',
              op: function(lhs, rhs) {
                console.log('plus');
                return lhs + rhs;
              }
            }, {
              text: '=',
              height: '66pt',
              ui: 'confirm',
              act: function(calc, val, op) {
                var eq;
                console.log('equal');
                if (op.isEq) {
                  return calc.operate(op, op);
                }
                eq = function() {
                  return op.apply(this, arguments);
                };
                eq.isEq = true;
                return calc.operate(eq, eq);
              }
            }
          ]
        }
      ]
    }
  },
  constructor: function() {
    var me;
    console.log('calculator constructor');
    me = this;
    me.callParent();
    return me.on({
      delegate: 'button',
      scope: me,
      tap: function(btn) {
        var old, op;
        console.log('update calc value', btn);
        me = this;
        op = me.getOp();
        old = me.getValue();
        if (Ext.isFunction(btn.op)) {
          me.operate(op, btn.op);
          me.fireEvent('change', me, me.getValue(), old);
          return;
        }
        if (Ext.isFunction(btn.act)) {
          me.prepare();
          btn.act(me, me.getValue(), op);
          me.fireEvent('change', me, me.getValue(), old);
        }
      }
    });
  },
  operate: function(op, nextOp) {
    var lhs, me, newVal, rhs, val;
    console.log('operate');
    me = this;
    me.setNewInput(true);
    me.setOp(nextOp);
    if (op === Ext.emptyFn || (op.isEq && !nextOp.isEq)) {
      console.log('do notiong');
      val = me.getValueAsNum();
      me.setLhs(val);
      me.setRhs(val);
      return false;
    }
    lhs = parseFloat(me.getLhs());
    rhs = parseFloat(me.getRhs());
    newVal = op.call(me, lhs, rhs);
    me.setValue(newVal);
    me.setLhs(newVal);
    return true;
  },
  applyRhs: function(newVal, oldVal) {
    console.log('applyRhs', newVal, oldVal);
    if (this.getOp().isEq) {
      this.setLhs(newVal);
      return oldVal;
    }
    return newVal;
  },
  getValueAsNum: function() {
    return parseFloat(this.getValue());
  },
  prepare: function() {
    var me;
    me = this;
    if (me.getNewInput()) {
      me.setValue('0');
      return me.setNewInput(false);
    }
  }
});
