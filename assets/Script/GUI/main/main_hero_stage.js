/*
 * @Author: your name
 * @Date: 2020-07-13 18:22:36
 * @LastEditTime: 2020-08-22 10:07:38
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

const MainHeroStage = cc.Class({
    extends: cc.Component,
    
    properties: {
        description:cc.Node,
        virtual_hero:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    set_stage:function(hero)
    {
        this.description.getComponent("hero_description").set_description(hero);
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