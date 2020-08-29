/*
 * @Author: your name
 * @Date: 2020-08-29 10:58:28
 * @LastEditTime: 2020-08-29 15:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\green_gobin_bowman.js
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

    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        var original_pos = enemy.position;
        var seq = cc.sequence(
            effect_manager.step_a_bit_action(hero),
            cc.delayTime(0.7),
            effect_manager.shot_action(enemy,hero,values),
            cc.delayTime(0.3),
            effect_manager.step_a_bit_action(hero).reverse()
        );
        
        enemy.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },

    // update (dt) {},
});
