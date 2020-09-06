/*
 * @Author: your name
 * @Date: 2020-07-13 18:22:36
 * @LastEditTime: 2020-09-01 19:06:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\main\main_hero_stage.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const HeroDescription = require("../start_menu/hero_description");

const MainHeroStage = cc.Class({
    extends: cc.Component,
    
    properties: {
        description:cc.Node,
        virtual_hero:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    set_stage:function(hero)
    {
        var hero_comp = window.Global.hero_comp;
        var data = hero_comp.node.getComponent("creature").get_raw_values();
        var des_comp = this.description.getComponent("hero_description");
        des_comp.set_max_of("HP",data.HP);
        data.HP = hero_comp.current_hp;
        des_comp.set_description(data);
        des_comp.inialized = true;
    },
    start:function()
    {
        var world = cc.find("Canvas/GameWorld");
        var hero = world.getComponent("game_world").hero;
        this.virtual_hero.getComponent(cc.Sprite).spriteFrame = hero.getComponent(cc.Sprite).spriteFrame;
        
    },
    

    // update (dt) {},
});
module.exports = MainHeroStage;