/*
 * @Author: your name
 * @Date: 2020-08-25 15:58:46
 * @LastEditTime: 2020-08-25 16:48:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\main\notice_box.js
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
        tool_icon_node:cc.Node,
        tool_description:cc.RichText,
        title:cc.Label,
        sliding_length:30
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    set_target_tool:function(tool_comp)
    {
        this.tool_description.string = tool_comp.description;
        this.title.string = tool_comp.node.name;
        this.tool_icon_node.getComponent(cc.Sprite).spriteFrame = tool_comp.node.getComponent(cc.Sprite).spriteFrame;
    },
    back:function()
    {
        var action = cc.spawn(
            cc.fadeOut(0.3),
            cc.moveBy(0.3,0,this.sliding_length),
        );
        var seq = cc.sequence(
            action,
            cc.callFunc(function(){this.node.active = false;},this)
        );
        this.node.runAction(seq);
        
    },
    show_tool_message:function(tool_comp){
        this.set_target_tool(tool_comp);
        this.node.active = true;
    },
    onEnable:function()
    {
        this.node.opacity = 0;

        var action = cc.spawn(
            cc.fadeIn(0.3),
            cc.moveBy(0.3,0,- this.sliding_length)
        );
        this.node.runAction(action);
    },
    
    // update (dt) {},
});
