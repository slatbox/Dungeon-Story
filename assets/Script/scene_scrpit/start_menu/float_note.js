// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bink_time : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start :function()
    {
        var out = cc.fadeOut(this.bink_time/2);
        var In = cc.fadeIn(this.bink_time/2);
        var seq = cc.sequence(out,In);

        this.node.runAction(cc.repeatForever(seq));
        this.node.runAction(cc.fadeIn(1));
    }
    

    // update (dt) {},
});
