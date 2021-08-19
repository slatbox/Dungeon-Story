/*
 * @Author: your name
 * @Date: 2020-08-29 10:47:31
 * @LastEditTime: 2020-08-29 10:48:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\purple_slime.js
 */
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

    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        var original_pos = enemy.position;
        var seq = cc.sequence(
            effect_manager.walk_to_enemy_action(hero),
            cc.delayTime(0.2),
            effect_manager.do_harm_to_action(hero,effect_manager.small_bump_action(hero),values),
            effect_manager.walk_back_action(original_pos)
        );
        enemy.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },

    // update (dt) {},
});
