/*
 * @Author: your name
 * @Date: 2020-08-22 16:59:38
 * @LastEditTime: 2020-08-29 10:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\items\tools\Normal Iron Sword.js
 */



cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        var original_pos = hero.position;
        var seq = cc.sequence(
            effect_manager.walk_to_enemy_action(enemy),
            cc.delayTime(0.2),
            effect_manager.do_harm_to_action(enemy,effect_manager.big_chop_action(enemy),values),
            effect_manager.walk_back_action(original_pos)
        );
        hero.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },
    
    

    // update (dt) {},
});
