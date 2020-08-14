// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const ActorPrefabManager = cc.Class({
    extends: cc.Component,

    properties: {
        level1:{
            default:[],
            type:cc.Prefab
        },
        level2:{
            default:[],
            type:cc.Prefab
        },
        level3:{
            default:[],
            type:cc.Prefab
        },
        special:{
            default:[],
            type:cc.Prefab
        }
    },
    random_foe:function(level){
        var rand = Math.floor(Math.random() * this.level1.length);
        var label = "level" + String(level);
        var foe = cc.instantiate(this[label][rand]);
        foe.anchorX = 0.5;
        foe.anchorY = 0;
        return foe;
    }
});
module.exports = ActorPrefabManager;