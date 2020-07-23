// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const MainHeroStage = cc.Class({
    extends: cc.Component,

    properties: {
        fighter:cc.Prefab,
        robber:cc.Prefab,
        ranger:cc.Prefab,
        virtual_hero:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    set_stage:function(hero)
    {

    },
    onLoad:function()
    {
        
    },

    // update (dt) {},
});
module.exports = MainHeroStage;