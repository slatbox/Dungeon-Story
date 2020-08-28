/*
 * @Author: your name
 * @Date: 2020-07-03 13:00:01
 * @LastEditTime: 2020-08-28 15:32:31
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
        MG:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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
        for(var i = 0 ; i < listeners.length;i++){
            listeners[i].listen(tem_values,this)
        }
        
        return tem_values;
    },

    // update (dt) {},
});
