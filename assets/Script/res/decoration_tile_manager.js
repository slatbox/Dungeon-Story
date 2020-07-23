// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const DecorationTileManager = cc.Class({
    extends: cc.Component,

    properties: {
        bones:
        {
            default:[],
            type:cc.SpriteFrame,
        },
        spider_web:{
            default:[],
            type: cc.SpriteFrame
        },
        red_blood:{
            default:[],
            type: cc.SpriteFrame
        },
        green_blood:{
            default:[],
            type: cc.SpriteFrame
        },
        up_shadow:{
            default:[],
            type: cc.SpriteFrame
        },
        down_shadow:{
            default:[],
            type: cc.SpriteFrame
        },
        torch:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

module.exports = DecorationTileManager;