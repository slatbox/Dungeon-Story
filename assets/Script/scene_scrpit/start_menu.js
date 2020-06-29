// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rolling_gbs:{
            default:[],
            type:[cc.SpriteFrame]
        },
        roll_speed :0,
        start_point: cc.Vec2
    },
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    onLoad: function () {
      },

    start:function() {
        
    },
    
    update:function(dt)
    {
        
    },
    // update (dt) {},
});
