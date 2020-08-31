/*
 * @Author: your name
 * @Date: 2020-07-31 11:46:51
 * @LastEditTime: 2020-08-31 18:21:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\fight_stage\escape_bar.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EscapBarState = cc.Enum({
    MOVING:0,
    STOP:1
});



cc.Class({
    extends: cc.Component,

    properties: {
        pin:cc.Node,
        control_button:cc.Button,
        button_label:cc.Label,
        start_button_color:cc.Color,
        stop_button_color:cc.Color,
        escape_bar:cc.Node,
        moving_time:1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function()
    {
        this.original_pin_pos = this.pin.position;
        this.state = EscapBarState.STOP;
    },
    button_call_back:function(){
      if(this.state == EscapBarState.STOP){
        //   this.start_slide();
        
      }  
      else{
          this.stop_slide();
      }
    },
    random_area_x:function()
    {
        var length = this.node.width;
        var area_width = this.escape_bar.width;
        var min_x = area_width/2.0;
        var max_x = length - area_width/2.0;
        return Math.random() * (max_x - min_x) + min_x - length/2;
    },
    init:function()
    {
        this.escape_bar.x = this.random_area_x();
        this.miss = false;
    },
    start_slide:function(moving_time)
    {
        this.escape_bar.x = this.random_area_x();
        var width = this.node.width;
        this.pin.position = this.original_pin_pos;
        var seq = cc.sequence(
            cc.moveBy(moving_time,width,0),
            cc.moveBy(moving_time, - width,0),
        );
        this.pin.current_action = cc.repeatForever(seq)
        this.pin.runAction(this.pin.current_action);
        this.control_button.normalColor = this.stop_button_color;
        this.state = EscapBarState.MOVING;
        this.control_button.node.getChildByName()
        this.button_label.string = "Stop";
    },
    is_in_escape_bar:function()
    {
        if(this.pin.x < this.escape_bar.x + this.escape_bar.width/2 && 
            this.pin.x > this.escape_bar.x - this.escape_bar.width/2)
        {
            return true;
        }
        return false;
    },
    stop_slide:function()
    {
        this.pin.stopAction(this.pin.current_action);
        this.state = EscapBarState.STOP;
        this.control_button.normalColor = this.start_button_color;
        this.button_label.string = "Wait";
        this.miss = this.is_in_escape_bar();

        var fight_state = cc.find("Canvas/fight_stage");
        fight_state.getComponent("fight_stage").next_phase();
        
    },
    update:function(dt)
    {

    }
});
