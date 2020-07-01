// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const ActorPrefabManager = cc.Class({
    extends: cc.Component,

    properties: {
        fighter:cc.Prefab,
        robber:cc.Prefab,
        ranger:cc.Prefab,
        red_demon:cc.Prefab,
        black_bat:cc.Prefab,
        red_bat:cc.Prefab,
        green_slime:cc.Prefab,
        purple_slime:cc.Prefab

    },
});
module.exports = ActorPrefabManager;