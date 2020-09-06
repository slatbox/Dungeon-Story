/*
 * @Author: your name
 * @Date: 2020-07-03 13:00:01
 * @LastEditTime: 2020-09-04 10:10:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\actors\creature.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        HP:0,
        AT:0,
        DF:0,
        SP:0,
        LK:0,
        MG:0,
    },
    start :function()
    {
        var animation = this.getComponent(cc.Animation);
        animation.play();
    },
    get_combat_values_contribution:function(listeners)
    {
        var tem_values = {
            HP: this.HP,
            AT: this.AT,
            DF: this.DF,
            SP: this.SP,
            LK: this.LK,
            MG: this.MG,
        }; 
        var fight_stage = cc.find("Canvas/fight_stage").getComponent("fight_stage");
        fight_stage.broadcast("hero_basic_values",tem_values,this.node);
        return tem_values;
    },
    get_raw_values:function()
    {
        var data = {
            HP: this.HP,
            AT: this.AT,
            DF: this.DF,
            SP: this.SP,
            LK: this.LK,
            MG: this.MG,
        };
        return data;
    },
});
