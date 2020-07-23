// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const TileManager = cc.Class({
    extends: cc.Component,

    properties: {
       single: cc.SpriteFrame,
       single_break1:cc.SpriteFrame,
       single_break2:cc.SpriteFrame,

       left:cc.SpriteFrame,
       middle_x:cc.SpriteFrame,
       middle_x_break:cc.SpriteFrame,
       right:cc.SpriteFrame,

       up:cc.SpriteFrame,
       middle_y:cc.SpriteFrame,
       middle_y_break:cc.SpriteFrame,
       down:cc.SpriteFrame,

       left_up:cc.SpriteFrame,
       right_up:cc.SpriteFrame,
       left_down:cc.SpriteFrame,
       right_down:cc.SpriteFrame,

       cross:cc.SpriteFrame,
       up_cross:cc.SpriteFrame,
       down_cross:cc.SpriteFrame,
       left_cross:cc.SpriteFrame,
       right_cross:cc.SpriteFrame,

       ground1:cc.SpriteFrame,
       ground2:cc.SpriteFrame,
       ground3:cc.SpriteFrame,
       ground4:cc.SpriteFrame,

       small_room_gnd:
       {
           default:[],
           type:cc.SpriteFrame
       },

       big_room_gnd:{
           default:[],
           type:cc.SpriteFrame
       },
       up_stair:cc.Prefab,
       down_stair:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    
    // update (dt) {},
});


module.exports = TileManager;