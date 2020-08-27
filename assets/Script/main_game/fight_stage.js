/*
 * @Author: your name
 * @Date: 2020-07-26 19:23:35
 * @LastEditTime: 2020-08-27 19:18:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\main_game\fight_stage.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EffectManager = require("effect_manager");

cc.Class({
    extends: cc.Component,

    properties: {
       back_ground:cc.Node,
       actor_gap:300,
       actor_dis:20,
       effect_manager:{
           default:null,
           type:EffectManager
       },
       spiner_system:cc.Node,
       hero_hp_bar:cc.Node,
       foe_hp_bar:cc.Node
    },
    init:function(hero,enemy,back_room)
    {
        this.enemy = enemy;
        this.hero = hero;
        this.enemy.parent = this.node;
        this.hero.parent = this.node;
        this.hero.x = -this.actor_gap/2;
        this.hero.y = this.back_ground.y-this.actor_dis;
        this.enemy.x = this.actor_gap/2;
        this.enemy.y = this.back_ground.y-this.actor_dis;
        this.enemy.current_hp = this.enemy.getComponent("creature").HP;
        
        this.hero.runAction(cc.flipX(true));

        this.back_room = back_room;
        this.spiner_system.getComponent("spiner_sys").init();
        //hide irelative gui
        var mini_map = cc.find("mini_map");
        var BasicInfomation = cc.find("BasicInfomation");
        var menu = cc.find("menu");
        menu.original_pos = menu.position;
        mini_map.active = false;
        BasicInfomation.active = false;
        // menu.runAction(cc.moveTo(0.2,menu.position.x,cc.view.getVisibleSize().height - menu.height * 1.2));

        //set hp bars
        this.hero_hp_bar.getComponent("ability_row").max = hero.getComponent("creature").HP;
        this.hero_hp_bar.getComponent("ability_row").set_level(hero.getComponent("hero").current_hp);

        this.foe_hp_bar.getComponent("ability_row").max = enemy.getComponent("creature").HP;
        this.foe_hp_bar.getComponent("ability_row").set_level(enemy.getComponent("creature").HP);

        
        
    },
    exit_stage:function()
    {
        this.node.active = false;
        
        cc.find("Canvas").getComponent("player_controller").enabled = true;
        this.back_room.active = true;
        this.hero.parent = this.back_room;
        this.hero.x = this.hero.getComponent("hero").current_pos.x;
        this.hero.y = this.hero.getComponent("hero").current_pos.y;
        
        this.back_room = null;
        this.enemy.destroy();

        var mini_map = cc.find("mini_map");
        var BasicInfomation = cc.find("BasicInfomation");
        var menu = cc.find("menu");
        mini_map.active = true;
        BasicInfomation.active = true;
        // menu.runAction(cc.moveTo(0.2,menu.original_pos));
    },
    onEnable:function()
    {
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(0.5));
    },
    onLoad:function()
    {
        this.testing_effect_command = "explode_gray()";
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var yellow_explode = eval("this.effect_manager."+this.testing_effect_command);
            yellow_explode.position =this.node.convertToNodeSpaceAR(event.getLocation());
            this.node.addChild(yellow_explode);
          }, this);
        
    },
    
});
