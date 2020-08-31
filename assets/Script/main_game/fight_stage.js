/*
 * @Author: your name
 * @Date: 2020-07-26 19:23:35
 * @LastEditTime: 2020-08-31 15:45:02
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
       escape_bar:cc.Node,
       hero_hp_bar:cc.Node,
       foe_hp_bar:cc.Node,
       hero_buff_pool:cc.Node
       
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
        this.escape_bar.getComponent("escape_bar").init();
        this.escaping = false;
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
    get_final_values:function(actor){
        var basic_values;
        basic_values = actor.getComponent("creature").get_combat_values_contribution([]);
        var tools_comp = cc.find("Canvas/game_menu/tools_box").getComponent("tools_box").tools;
        if(actor.getComponent("hero")){
            for(var i = 0 ; i < tools_comp.length;i++){
                for(var each in basic_values){
                    basic_values[each] = basic_values[each] + tools_comp[i].get_combat_values_contribution([])[each];
                }
            }
        }
        return basic_values;
    },
    compute_values:function()
    {
        this.hero_buff_pool.getComponent("buff_pool").update_buffs();

        
        var basic_values;
        if(this.doing_result_comp.node.getComponent("tool")){
            basic_values = this.get_final_values(this.hero);
            var result_values = this.doing_result_comp.node.getComponent("tool").get_combat_values_contribution([]);
            for (var each_attribute in this.final_data) {
                this.final_data[each_attribute] = (basic_values[each_attribute] + result_values[each_attribute])*this.multiply;
            }
        }
        else{
            basic_values = this.get_final_values(this.enemy);
            for (var each_attribute in this.final_data) {
                this.final_data[each_attribute] = basic_values[each_attribute]*this.multiply;
            }
        }

        if(this.doing_result_comp.getComponent("tool")){
            this.next_phase();
        }
        else{
            this.escape_bar.getComponent("escape_bar").start_slide();
        }
       
        
    },
    before_attack:function()
    {
        this.doing_result_comp.before_attack(this.hero,this.enemy);
        this.next_phase();
    },
    during_attack:function()
    {
        this.doing_result_comp.during_attack(this.hero,this.enemy,this.final_data);
    },
    after_attack:function()
    {
        
        var call = function()
        {
            this.doing_result_comp.after_attack(this.hero, this.enemy);

            this.spiner_system.getComponent("spiner_sys").open();
            //检测怪兽死亡

            if (this.enemy.current_hp <= 0) {
                this.exit_stage();
            }
        };

        
        
        this.node.runAction(cc.sequence(
            cc.delayTime(1.0),cc.callFunc(call,this)
        ));
        
    },

    next_phase:function()
    {
        this.phase_state = (this.phase_state + 1) % 4;
        if(this.phase_state == 0)
            this.compute_values();
        else if(this.phase_state == 1)
            this.before_attack();
        else if(this.phase_state == 2)
            this.during_attack();
        else if(this.phase_state == 3)
            this.after_attack();

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
        this.multiply = multiply * this.spiner_system.getComponent("spiner_sys").multiply;
        this.final_data = {
            HP: 0,
            AT: 0,
            DF: 0,
            SP: 0,
            LK: 0,
            MG: 0
        };

        //init listeners 
        
        
        
        
        if(!this.doing_result_comp){
            return;
        }
        this.phase_state = 3;
        this.next_phase();
    },
    broadcast:function(event,data,emitter){
        this.hero_buff_pool.getComponent("buff_pool").broadcast(event,data,emitter);
        cc.find("Canvas/game_menu/tools_box").getComponent("tools_box").broadcast(event,data,emitter);
    }
    
    
});
