/*
 * @Author: your name
 * @Date: 2020-08-28 23:09:12
 * @LastEditTime: 2020-08-30 19:28:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\green_goblin_fighter.js
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
            effect_manager.do_harm_to_action(hero,effect_manager.big_chop_action(hero),values),
            effect_manager.walk_back_action(original_pos)
        );
        enemy.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },

    // update (dt) {},
});
