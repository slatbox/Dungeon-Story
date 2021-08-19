/*
 * @Author: your name
 * @Date: 2020-08-30 10:33:35
 * @LastEditTime: 2020-08-30 10:51:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: \Dungeon-Story\assets\Script\loading_scene.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const DataManager = require("DataManager");

cc.Class({
    extends: cc.Component,

    properties: {
       actor_set:cc.Node,
       back_ground:cc.Node,
       title:cc.Node
    },

    onLoad:function()
    {
        
        this.title.runAction(cc.repeatForever(
            cc.sequence(cc.moveBy(1.0,0,30).easing(cc.easeSineInOut()),cc.moveBy(1.0,0,-30).easing(cc.easeSineInOut()))
        ));

        // var actor_set = this.actor_set.getComponent("actor_prefab_manager").level1;
        // var actor = cc.instantiate(actor_set[Math.floor(Math.random() * actor_set.length)]);
        // actor.position = new cc.Vec2(this.back_ground.x - actor.width,this.back_ground.y - actor.height);
        // actor.runAction(cc.flipX(true));
        // this.node.addChild(actor);

        // actor.runAction(cc.repeatForever(cc.moveBy(0.1,20,0)));
        var load_secne = DataManager.read_obj("to_load");
        cc.director.loadScene(load_secne.scene);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    

    // update (dt) {},
});
