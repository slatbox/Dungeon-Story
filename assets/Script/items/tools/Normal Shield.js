/*
 * @Author: your name
 * @Date: 2020-08-28 23:32:30
 * @LastEditTime: 2020-09-06 11:12:01
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

const NormalIronSword  = cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        var hero_buff_pool = cc.find("Canvas/fight_stage/hero_buff_pool").getComponent("buff_pool");
    
        //create animation
        var shield_icon = new cc.Node();
        shield_icon.addComponent(cc.Sprite).spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
        shield_icon.position = new cc.Vec2(hero.x + hero.width,hero.y + hero.height);
        shield_icon.runAction(cc.sequence(
            cc.spawn(cc.fadeIn(0.1),cc.moveBy(0.3,0,-30)),
            cc.spawn(cc.fadeOut(0.1),cc.moveBy(0.3,0,30).easing(cc.easeBounceIn())),
            cc.removeSelf()
        ));
        hero.parent.addChild(shield_icon);
        //create buff
        var buff = effect_manager.create_buff(this.node.getComponent(cc.Sprite).spriteFrame,hero,enemy);
        buff.shield_icon = this.node.getComponent(cc.Sprite).spriteFrame;
        buff.name = "shield";
        buff.usage_time = 1;
        buff.is_out_of_date = function()
        {
            if(this.usage_time == 0)
                return true;
            else 
                return false;
        };
        buff.listen = function(event,data,emitter)
        {
            if(data.normal_shield_processed){
                return;
            }
            if(event == "hero_get_harm"){
                this.usage_time = 0;
                data.value = 0;
                data.normal_shield_processed = 1;
            }
        };
        hero_buff_pool.add_buff(buff); 

        var fight_stage = cc.find("Canvas/fight_stage").getComponent("fight_stage");
        fight_stage.next_phase();

    },
    after_attack: function (hero,enemy) {
    
    },

    // update (dt) {},
});
