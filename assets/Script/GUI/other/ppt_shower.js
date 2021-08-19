// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       to_show:{
           default:[],
           type:cc.Node
       }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function()
    {
        for(var i = 0 ; i < this.to_show.length;i++){
            var action = cc.sequence(
                cc.fadeIn(0.5),
                cc.delayTime(0.8),
                cc.fadeOut(0.5)
            );
            var delay_time = 2.0;
            this.to_show[i].active = true;
            this.to_show[i].opacity = 0;
            this.to_show[i].runAction(cc.sequence(cc.delayTime(delay_time * i),action));
        }
        this.node.runAction(cc.sequence(
            cc.delayTime(this.to_show.length * delay_time),
            cc.callFunc(function(){cc.director.loadScene("start_menu");},this)
        ));

    },

    // update (dt) {},
});
