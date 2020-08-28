/*
 * @Author: your name
 * @Date: 2020-07-26 19:23:35
 * @LastEditTime: 2020-08-28 22:02:09
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
        var spiner_sys = this.spiner_system.getComponent("spiner_sys");
        spiner_sys.init(hero,enemy);
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
        this.spiner_system.getComponent("spiner_sys").clear();
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
    make_temp_values_object:function(comp_with_values)
    {
        var tem_values = {
            HP:comp_with_values.HP,
            AT:comp_with_values.AT,
            DF:comp_with_values.DF,
            LK:comp_with_values.LK,
            SP:comp_with_values.SP,
            MG:comp_with_values.MG,
        };
        return tem_values;
    },
    compute_values:function()
    {

        var basic_values = this.hero.getComponent("creature").get_combat_values_contribution([]);
        var result_values = this.doing_result_comp.node.getComponent("tool").get_combat_values_contribution([]);
        for(var each_attribute in this.final_data){
            this.final_data[each_attribute] = basic_values[each_attribute] + result_values[each_attribute];
        }
    },
    before_attack:function(hero,enemy)
    {
        
        this.doing_result_comp.before_attack(hero,enemy);
    },
    during_attack:function(hero,enemy)
    {
        this.doing_result_comp.during_attack(hero,enemy,this.final_data);
    },
    after_attack:function(hero,enemy)
    {
        this.doing_result_comp.after_attack(hero,enemy);

        //检测怪兽死亡
    },

    do_spin_result:function(results)
    {
        
        var result_comp = results[0].corre_function_comp;
        if(!result_comp){
            return;
        }
        var multiply = 1;
        if(results[1].corre_function_comp.node.name == result_comp.node.name){
            multiply += 1;
            if(results[2].corre_function_comp.node.name == result_comp.node.name)
                multiply += 1;
        }
        this.doing_result_comp = result_comp.getComponent(result_comp.node.name);
        this.multiply = multiply;
        this.final_data = {
            HP: 0,
            AT: 0,
            DF: 0,
            SP: 0,
            LK: 0,
            MG: 0
        }
        if(!this.doing_result_comp){
            return;
        }
        this.compute_values();
        this.before_attack(this.hero,this.enemy);
        this.during_attack(this.hero,this.enemy);
        this.after_attack(this.hero,this.enemy);
    },
    
});
