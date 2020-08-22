/*
 * @Author: your name
 * @Date: 2020-07-13 18:31:28
 * @LastEditTime: 2020-08-22 10:04:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editon
 * @FilePath: \Dungeon-Story\assets\Script\GUI\main\main_game_menu.js
 */

const MainHeroStage = require("main_hero_stage");

cc.Class({
    extends: cc.Component,

    properties: {
        hero_stage:
        {
            default:null,
            type:MainHeroStage
        },
    },

    back_to_game:function()
    {
        this.node.active = false;
    },
    show:function()
    {
        this.node.active = true;
    },
    
    exit_game:function()
    {

    },
    onEnable:function()
    {
        var world = cc.find("Canvas/GameWorld");
        var hero = world.getComponent("game_world").hero;
        this.hero_stage.set_stage(hero)
    }
    // update (dt) {},
});
