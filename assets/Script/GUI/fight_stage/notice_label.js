// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad:function()
    {
        
        this.node.opacity = 0;
        
    },

    show:function(message,color)
    {
        this.node.getComponent(cc.Label).string = message;
        this.node.color = color;
        
        var seq = cc.sequence(
            cc.fadeIn(0),
            cc.scaleTo(0.25, 1.2, 1.2).easing(cc.easeCubicActionOut()),
            cc.scaleTo(0.3, 1.0, 1.0),
            cc.delayTime(0.5),
            cc.fadeOut(0.3)
        );

        this.node.runAction(seq);
    },
    
});
