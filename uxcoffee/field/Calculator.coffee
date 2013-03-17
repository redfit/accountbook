Ext.define 'Ext.ux.field.Calculator',
  extend: 'Ext.field.Text'
  xtype: 'calculatorfield'

  requires: ['Ext.ux.calc.Calculator']

  config:
    calculator: true
    component:
      useMask: true

  initialize: ()->
    me = @
    component = me.getComponent()

    component.on(
      scope: me
      masktap: 'onMaskTap'
    )

  onMaskTap: ()->
    me = @
    return false if me.getDisabled()
    me.onFocus()
    return false

  onFocus: (e)->
    me = @
    component = me.getComponent()

    me.fireEvent('forcus', me, e)
    component.input.dom.blur() # これなにしてんだろ
    return false if me.getReadOnly()

    me.isFocused = true
    console.log("show calculator")
    me.getCalculator().show()

  getCalculator: ()->
    me = @
    calculator = me._calculator
    value = me.getValue()

    if calculator and not calculator.isPicker
      calculator = Ext.create('Ext.ux.calc.Calculator')
      # calculator.setValue(value) if value isnt null

    calculator.on(
      scope: me
      change: 'onCalcChange'
    )
    Ext.Viewport.add calculator
    me._calculator = calculator

    calculator

  onCalcChange: (calc, newVal, oldVal)->
    @setValue(newVal)
