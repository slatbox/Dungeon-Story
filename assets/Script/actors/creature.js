// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        HP:0,
        AT:0,
        DF:0,
        SP:0,
        LK:0,
        MG:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start :function()
    {
        var animation = this.getComponent(cc.Animation);
        animation.play();
    }

    // update (dt) {},
});
