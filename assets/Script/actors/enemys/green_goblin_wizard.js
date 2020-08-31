/*
 * @Author: your name
 * @Date: 2020-08-29 16:51:21
 * @LastEditTime: 2020-08-30 20:58:29
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
        

        
        var book = effect_manager.create_gray_book();
        book.position = new cc.Vec2(enemy.x - enemy.width, enemy.y + enemy.height / 2 + 70);
        enemy.parent.addChild(book);



        var air_ball = effect_manager.create_air_ball();
        air_ball.getComponent("air_ball").init(hero,values,effect_manager);

        air_ball.opacity = 0;

        var seq = effect_manager.shoot_forward_action(enemy,air_ball);
        
        book.runAction(cc.sequence(
            cc.delayTime(0.5),
            seq
        ));

    },
    after_attack: function (hero,enemy) {
    
    },
    shoot_air_ball:function(effect_manager)
    {
        
    },
    // update (dt) {},
});
