/*
 * @Author: your name
 * @Date: 2020-07-12 17:07:41
 * @LastEditTime: 2020-09-01 17:15:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\start_menu\hero_description.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const HeroStage = require("hero_stage");
const AbilityRow = require('ability_row');
const HeroDescription = cc.Class({
    extends: cc.Component,

    properties: {
        
        HP:
        {
            default:null,
            type:AbilityRow
        },
        AT:{
            default:null,
            type:AbilityRow
        },
        DF:{
            default:null,
            type:AbilityRow
        },
        MG:{
            default:null,
            type:AbilityRow
        },
        SP:{
            default:null,
            type:AbilityRow
        },
        LK:{
            default:null,
            type:AbilityRow
        },
        inialized:false
        
    },
    set_description:function(data)
    {
        // this.HP.max = max_levels.HP;
        // this.DF.max = max_levels.DF;
        // this.AT.max = max_levels.AT;
        // this.MG.max = max_levels.MG;
        // this.SP.max = max_levels.SP;
        // this.LK.max = max_levels.LK;
        
        this.HP.set_level(data.HP);
        this.DF.set_level(data.DF);
        this.AT.set_level(data.AT);
        this.MG.set_level(data.MG);
        this.SP.set_level(data.SP);
        this.LK.set_level(data.LK);
    },
    set_max_of:function(label,max){
        this[label].max = max;
    }
});

module.exports = HeroDescription;