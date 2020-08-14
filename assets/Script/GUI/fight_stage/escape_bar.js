// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EscapBarState = cc.Enum({
    MOVING:0,
    STOP:1
});



cc.Class({
    extends: cc.Component,

    properties: {
        pin:cc.Node,
        moving_time:1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function()
    {
        this.state = EscapBarState.STOP;
    },

    start_slide:function()
    {
        var width = this.node.width;
        
        var seq = cc.sequence(
            cc.moveBy(this.moving_time,width,0),
            cc.moveBy(this.moving_time, - width,0),
        );
        this.pin.current_action = seq;
        this.pin.runAction(cc.repeatForever(seq));
    },

    update:function(dt)
    {

    }
});
