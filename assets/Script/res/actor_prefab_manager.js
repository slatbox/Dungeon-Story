/*
 * @Author: your name
 * @Date: 2020-07-03 13:00:01
 * @LastEditTime: 2020-08-21 10:06:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\res\actor_prefab_manager.js
 */
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
        level4:{
            default:[],
            type:cc.Prefab
        }
    },
    random_foe:function(level){
        var rand = Math.floor(Math.random() * this["level"+level].length);
        var foe = cc.instantiate(this["level" + level][rand]);
        foe.anchorX = 0.5;
        foe.anchorY = 0;
        return foe;
    }
});
module.exports = ActorPrefabManager;