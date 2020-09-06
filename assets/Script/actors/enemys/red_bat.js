/*
 * @Author: your name
 * @Date: 2020-08-30 16:37:22
 * @LastEditTime: 2020-09-06 11:05:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\red_bat.js
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
            effect_manager.fly_to_action(hero),
            cc.delayTime(0.2),
            effect_manager.charge_do_harm_to(hero,effect_manager.small_scratch_action(hero),values),
            effect_manager.fly_back_action(original_pos)
        );
        enemy.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },

    listen:function(event,data,emitter){
        if(event == "hero_get_harm"){
            var value = data.value;
            var effect_manager = window.Global.effect_manager;
            effect_manager.add_hp_to(this.node,-0.5 * value);
        }
    }

    // update (dt) {},
});
