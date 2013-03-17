Ext.define 'Ext.ux.calc.Calculator',
  extend: 'Ext.Sheet'
  xtype: 'calculator'

  config:
    lhs: 0
    rhs: 0
    value: '0'
    op: Ext.emptyFn
    newInput: true

    left: 0
    right: 0
    bottom: 0
    centered: false
    height: 'auto'
    style: 'padding: 1% 0 1% 0'

    modal:
      # モーダル透明
      transparent: true
    hideOnMaskTap: true # Sheet以外をタップするとSheetが消える

    items:
      xtype: 'container'
      layout: 'hbox'
      defaults:
        layout: 'vbox'
        width: '20%'
        margin: '2%'
        defaults:
          xtype: 'button'
          height: '30pt'
          margin: '3pt 0 3pt 0'
          # ここだけ匿名でない理由は？
          act: onInputNumber = (calc, val) ->
            if val is '0'
              calc.setValue(@getText())
            else
              calc.setValue(val + @getText())
            calc.setRhs(calc.getValueAsNum())

      items:[
        xtype: 'spacer'
        width: '2%'
        margin: '0'
      ,
        items:[
          text: 'AC'
          ui: 'decline'
          act: (calc, val)->
              calc.setNewInput(true)
              calc.setLhs(0)
              calc.setRhs(0)
              calc.setValue('0')
              calc.setOp(Ext.emptyFn)
        ,
          text: '7'
        ,
          text: '4'
        ,
          text: '1'
        ,
          text: '0'
        ]
      ,
        items:[
          text: '&plusmn;'
          ui: 'action'
          act: (calc, val)->
            if val.indexOf('-') is 0
              calc.setValue(val.slice(1))
            else
              calc.setValue('-' + val)
            calc.setRhs(calc.getValueAsNum())
        ,
          text: '8'
        ,
          text: '5'
        ,
          text: '2'
        ,
          text: '00'
        ]
      ,
        items:[
          text: '&divide;'
          ui: 'action'
          op: (lhs, rhs)->
            # <debug>
            console.log('divide')
            # </debug>
            lhs / rhs
        ,
          text: '9'
        ,
          text: '6'
        ,
          text: '3'
        ,
          text: '.'
        ]
      ,
        items:[
          text: '&times;'
          ui: 'action'
          op: (lhs, rhs)->
            # <debug>
            console.log('times')
            # </debug>
            lhs * rhs
        ,
          text: '&minus;'
          ui: 'action'
          op: (lhs, rhs)->
            # <debug>
            console.log('minus')
            # </debug>
            lhs - rhs
        ,
          text: '&plus;'
          ui: 'action'
          op: (lhs, rhs)->
            # <debug>
            console.log('plus')
            # </debug>
            lhs + rhs
        ,
          text: '='
          height: '66pt'
          ui: 'confirm'
          act: (calc, val, op)->
            # <debug>
            console.log('equal')
            # </debug>
            return calc.operate(op, op) if op.isEq
            eq = ->
              return op.apply(@, arguments)
            eq.isEq = true
            calc.operate(eq, eq)
        ]
      ]
  constructor: ->
    # <debug>
    console.log('calculator constructor')
    # </debug>
    me = @
    me.callParent()

    me.on(
      delegate: 'button'
      scope: me
      tap: (btn)->
        # <debug>
        console.log('update calc value', btn)
        # </debug>
        me = @
        op = me.getOp()
        old = me.getValue()

        # 四則演算の場合、opが実行
        if(Ext.isFunction(btn.op))
          me.operate(op, btn.op)
          me.fireEvent('change', me, me.getValue(), old)
          return

        if(Ext.isFunction(btn.act))
          me.prepare()
          btn.act(me, me.getValue(), op)
          me.fireEvent('change', me, me.getValue(), old)
          return

    )

  operate: (op, nextOp)->
    # <debug>
    console.log('operate')
    # </debug>
    me = @

    me.setNewInput(true)
    me.setOp(nextOp)

    if op is Ext.emptyFn or (op.isEq and not nextOp.isEq)
      console.log('do notiong')
      val = me.getValueAsNum()
      me.setLhs(val)
      me.setRhs(val)
      return false

    lhs = parseFloat(me.getLhs())
    rhs = parseFloat(me.getRhs())
    newVal = op.call(me, lhs, rhs)

    me.setValue(newVal)
    me.setLhs(newVal)
    return true

  # 説明ほしいなー
  applyRhs: (newVal, oldVal)->
    console.log('applyRhs', newVal, oldVal)
    if this.getOp().isEq
      this.setLhs(newVal)
      return oldVal
    newVal

  getValueAsNum: ->
    parseFloat(@getValue())

  prepare: ->
    me = @
    if me.getNewInput()
      me.setValue('0')
      me.setNewInput(false)
