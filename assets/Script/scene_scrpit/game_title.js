// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed : 0,
        range : 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function()
    {
        var mov_up = cc.moveBy(this.range/this.speed,0,this.range).easing(cc.easeSineInOut());
        var mov_down = cc.moveBy(this.range/this.speed,0,-this.range).easing(cc.easeSineInOut());
        var seq = cc.sequence(mov_up,mov_down);
        var repeat = cc.repeatForever(seq);
        this.node.runAction(repeat);
    }

    // update (dt) {},
});
