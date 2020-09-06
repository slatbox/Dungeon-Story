/*
 * @Author: your name
 * @Date: 2020-08-29 16:51:21
 * @LastEditTime: 2020-09-06 16:20:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\enemys\green_goblin_wizard.js
 */

cc.Class({
    extends: cc.Component,

    properties: {
        effect_color:cc.Color,
        buff_sprite_frame:cc.SpriteFrame
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
    listen:function(event,data,emitter){
        if(event != "hero_get_harm")return;

        var hero = window.Global.hero_comp.node;
        var enemy = this.node;
        var effect_manager = window.Global.effect_manager;
        var hero_buff_pool = cc.find("Canvas/fight_stage/hero_buff_pool").getComponent("buff_pool");
        var rand = Math.random();
        if(rand < 0.5){
            
            if(hero_buff_pool.has_a_buff("paralysis")){
                return;
            }

            var action = effect_manager.get_ill_state_action(this.effect_color);
            hero.runAction(action);
            
            var buff = effect_manager.create_buff(this.buff_sprite_frame, hero, enemy);
            
            buff.name = "paralysis";
            buff.max_time = 3;
            buff.time = 0;
            buff.action = action;
            buff.getComponent("buff").set_label(buff.max_time);
            buff.is_out_of_date = function () {
                if(this.time > this.max_time){
                    hero.stopAction(this.action);
                    return true;
                }
                else
                    return false;
            };
            buff.listen = function (event, data, emitter) {
                if(event == "before_attack"){
                    if(emitter.is_hero_attacking()){
                        var tranmble_action = effect_manager.get_tremble_action(0.3,2);
                        hero.runAction(tranmble_action);
                        emitter.phase_state += 1;
                    
                    }
                }
            };
            hero_buff_pool.add_buff(buff); 
        }

    }
    
    // update (dt) {},
});
