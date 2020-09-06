/*
 * @Author: your name
 * @Date: 2020-08-22 16:39:21
 * @LastEditTime: 2020-09-06 12:56:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\main\tools_box.js
 */
const types = require("types");
const ToolTypes = types.ToolTypes;

cc.Class({
    extends: cc.Component,

    properties: {
        table_pos1:cc.Vec2,
        table_pos2:cc.Vec2,
        notice_box:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    convert_to_button:function(tool_comp)
    {
        tool_comp.node.addComponent(cc.Button);
        tool_comp.button_call = function (event) {
            this.notice_box.getComponent("notice_box").show_tool_message(tool_comp);
        };
        tool_comp.node.on(cc.Node.EventType.TOUCH_START,tool_comp.button_call,this);
        tool_comp.node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
    },
    add_tool:function(tool_comp)
    {
        if(!this.tools){
            this.tools = [];
        }
        var final_position = tool_comp.type;
        
        if (this.tools[tool_comp.type] ) {
            if(tool_comp.type == ToolTypes.arm_asis){
                final_position = ToolTypes.arm_main;
                if(this.tools[ToolTypes.arm_main]){
                    var old_tool = this.tools[ToolTypes.arm_main];
                    old_tool.drop_back_to_room(tool_comp.node.pos, this);
                }
            }
            else{
                var old_tool = this.tools[tool_comp.type];
                old_tool.drop_back_to_room(tool_comp.node.pos, this);
            }
            
        }
        this.convert_to_button(tool_comp);
        tool_comp.node.position = new cc.Vec2(this.table_pos1.x + tool_comp.node.width * 1.2 * final_position, this.table_pos1.y);
        tool_comp.node.removeFromParent(false);
        this.node.addChild(tool_comp.node);
        this.tools[final_position] = tool_comp;
    },
    broadcast:function(event,data,emitter)
    {
        for(var i = 0; i < this.tools.length;i++){
            var tool_specific_comp = this.tools[i].node.getComponent(this.tools[i].node.name);
            if(tool_specific_comp.listen){
                tool_specific_comp.listen(event,data,emitter);
            }
        }
    },
    onLoad:function()
    {
        if(!this.tools){
            this.tools = [];
        }
        
    },  
})