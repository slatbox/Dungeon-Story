/*
 * @Author: your name
 * @Date: 2020-08-22 16:49:55
 * @LastEditTime: 2020-08-25 20:22:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\items\tool.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const types = require("types");
const ToolTypes = types.ToolTypes;

cc.Class({
    extends: cc.Component,

    properties: {
        type:{
            default:ToolTypes.arm_main,
            type:ToolTypes
        },
        description:"This is as tool"
    },

    start:function()
    {
        if(this.is_default){
            return;
        }
        var action = cc.repeatForever(
            cc.sequence(
                cc.moveBy(0.8,0,10).easing(cc.easeSineInOut()),
                cc.moveBy(0.8,0,-10).easing(cc.easeSineInOut())
            )
        );
        this.node.runAction(action);
        this.current_action = action;
    },
    collect_into_bag:function(){
        
        this.node.stopAction(this.current_action);
        this.node.scaleX = 1;
        this.node.scaleY = 1;
        this.node.opacity = 255;
        var tool_box = cc.find("Canvas/game_menu/tools_box");
        tool_box.getComponent("tools_box").add_tool(this);
    },
    drop_back_to_room:function(ij_pos,tool_box)
    {
        var action = cc.repeatForever(
            cc.sequence(
                cc.moveBy(0.8,0,10).easing(cc.easeSineInOut()),
                cc.moveBy(0.8,0,-10).easing(cc.easeSineInOut())
            )
        );
        var TileWidth = window.Global.TileWidth;
        this.node.removeComponent(cc.Button);
        this.node.off(cc.Node.EventType.TOUCH_START,this.button_call,tool_box);
        this.node.position = new cc.Vec2(
            ij_pos.y * TileWidth + 0.5 * TileWidth,
            - (ij_pos.x * TileWidth + 0.5 * TileWidth)
            );
        this.node.pos = ij_pos;
        this.node.scaleX = 0.85;
        this.node.scaleY = 0.85;
        this.node.parent = cc.find("Canvas/GameWorld").getComponent("game_world").current_room;
        this.node.parent.getComponent("room").interactions[ij_pos.x][ij_pos.y] = this.node;
        this.node.runAction(action);
        this.current_action = action;
    },
    act:function(hero,direction)
    {
        var call = function()
        {
            this.collect_into_bag();
        };
        var seq = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,0,40).easing(cc.easeBounceIn()),
                cc.fadeOut(0.5),
            ),  
            cc.callFunc(call,this)
            
        );
        this.node.runAction(seq);
        this.node.parent.getComponent("room").interactions[this.node.pos.x][this.node.pos.y] = null;
        hero.getComponent("hero").move(direction);
        cc.audioEngine.playEffect(window.Global.pick_up_sound,false);
    },
    // update (dt) {},
});
