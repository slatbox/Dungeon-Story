/*
 * @Author: your name
 * @Date: 2020-08-29 16:51:21
 * @LastEditTime: 2020-08-29 17:37:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\green_goblin_wizard.js
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        

        var create_book = function()
        {
            var book = effect_manager.create_gray_book();
            book.position = new cc.Vec2(enemy.x - enemy.width * 1.5,enemy.y + enemy.height/2 + 70);
            enemy.parent.addChild(book);
        };

        var create_air_ball = function()
        {
            var air_vall = effect_manager.create_air_ball();
        };

        
        // var seq = cc.sequence(
        //     effect_manager.step_a_bit_action(hero),
        //     cc.delayTime(0.7),
        //     effect_manager.shot_action(enemy,hero,values),
        //     cc.delayTime(0.3),
        //     effect_manager.step_a_bit_action(hero).reverse()
        // );
        
        // enemy.runAction(seq);
    },
    after_attack: function (hero,enemy) {
    
    },
    shoot_air_ball:function(effect_manager)
    {
        
    },
    // update (dt) {},
});
