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
    },
    set_description:function(hero)
    {
        var creature = hero.getComponent("creature");
        var hp = creature.HP;
        var df = creature.DF;
        var at = creature.AT;
        var mg = creature.MG;
        var sp = creature.SP;
        var lk = creature.LK;
        this.HP.set_level(hp);
        this.DF.set_level(df);
        this.AT.set_level(at);
        this.MG.set_level(mg);
        this.SP.set_level(sp);
        this.LK.set_level(lk);
    },
});

module.exports = HeroDescription;