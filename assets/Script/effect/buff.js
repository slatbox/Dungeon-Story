/*
 * @Author: your name
 * @Date: 2020-08-31 09:47:40
 * @LastEditTime: 2020-09-06 15:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\effect\buff.js
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
       label:cc.Label
    },
    set_label:function(value){
        this.label.string = String(value);
    },
    update_time_label:function()
    {
        if(this.node.max_time){
            this.set_label(this.node.max_time - this.node.time);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    
});
