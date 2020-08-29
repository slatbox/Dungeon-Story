/*
 * @Author: your name
 * @Date: 2020-08-28 23:32:30
 * @LastEditTime: 2020-08-28 23:34:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\items\tools\Normal Shield.js
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
        // var effect_manager = window.Global.effect_manager;
        // var original_pos = hero.position;
        // var seq = cc.sequence(
        //     effect_manager.walk_to_enemy_action(enemy),
        //     cc.delayTime(0.2),
        //     effect_manager.do_harm_to_action(enemy,effect_manager.big_chop_action(enemy),values),
        //     effect_manager.walk_back_action(original_pos)
        // );
        // hero.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },

    // update (dt) {},
});
