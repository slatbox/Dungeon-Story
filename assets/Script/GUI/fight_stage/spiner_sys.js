// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Spiner = require("spiner");
const SpinerButtonState = cc.Enum({
    SPIN:0,
    STOP:1,
    RESPIN:2,
    WAIT:3
});

cc.Class({
    extends: cc.Component,

    properties: {
        spiners:{
            default:[],
            type:Spiner
        },
        main_arm_chance:0.5,
        asis_arm_chance:0.5,
        arm_chance:0.7,
        asis_tool_chance:0.3,
        spin_button:cc.Button,
        spin_color:cc.Color,
        stop_color:cc.Color,
        respin_color:cc.Color,
        wait_color:cc.Color
    },
    set_spin_button_label:function(string)
    {
        var label = this.spin_button.node.getChildByName("Background").getChildByName("Label");
        label.getComponent(cc.Label).string = string;
    },
    spin_button_interface:function()
    {
        if(this.spin_button.state == SpinerButtonState.SPIN){
            this.start_spin();
        }
        else if(this.spin_button.state == SpinerButtonState.STOP){
            this.stop();
        }
        else if(this.spin_button.state == SpinerButtonState.RESPIN){
            this.respin();
        }
        
    },
    start_spin:function()
    {
        for(var i = 0 ; i < this.spiners.length;i++){
            this.spiners[i].start_spin();   
        }
        this.spin_button.state = SpinerButtonState.STOP;
        this.spin_button.normalColor = this.stop_color;
        this.set_spin_button_label("Stop");
        
    },
    respin:function()
    {
        this.node.stopAction(this.current_action);
        for(var i = 0 ; i < this.spiners.length;i++){
            this.spiners[i].respin(); 
        }
        this.spin_button.state = SpinerButtonState.STOP;
        this.spin_button.normalColor = this.stop_color;
        this.set_spin_button_label("Stop");
    },
    stop:function()
    {
        var time = this.spiners[0].trigger_time;
        var call0 = function(){this.spiners[0].stop();};
        var call1 = function(){this.spiners[1].stop();};
        var call2 = function(){this.spiners[2].stop();};
        var open_respin = function(){
            this.spin_button.state = SpinerButtonState.RESPIN;
            this.spin_button.normalColor = this.respin_color;
            this.set_spin_button_label("Respin");
        };
        var close_respin = function(){
            this.spin_button.state = SpinerButtonState.WAIT;
            this.spin_button.normalColor = this.wait_color;
            this.set_spin_button_label("Wait");
        };
        var open_spin = function(){
            this.spin_button.state = SpinerButtonState.SPIN;
            this.spin_button.normalColor = this.spin_color;
            this.set_spin_button_label("Spin");
        };
        var do_spin_result = function(){
            
            this.results = [];
            for(var i = 0 ; i < this.spiners.length;i++){
                this.results.push(this.spiners[i].result);
            }
            this.node.parent.getComponent("fight_stage").do_spin_result(this.results);
        }
        var seq = cc.sequence(
            cc.callFunc(call0,this),
            cc.delayTime(time),
            cc.callFunc(open_respin,this),
            cc.callFunc(call1,this),
            cc.delayTime(time),
            cc.callFunc(close_respin,this),
            cc.callFunc(call2,this),
            cc.delayTime(time + 0.5),
            cc.callFunc(open_spin,this),
            cc.callFunc(do_spin_result,this)
        );
        this.spin_button.state = SpinerButtonState.WAIT;
        this.spin_button.normalColor = this.wait_color;
        this.set_spin_button_label("Wait");
        this.current_action = seq;
        this.node.runAction(seq);
    },
    init:function(hero,enemy)
    {
        var tool_comps = cc.find("Canvas/game_menu/tools_box").getComponent("tools_box").tools;
        var chance_set = {
            main_arm_chance:this.main_arm_chance,
            asis_arm_chance:this.asis_arm_chance,
            arm_chance:this.arm_chance,
            asis_tool_chance:this.asis_tool_chance,
        };
        this.results = [];
        for(var i = 0 ; i < this.spiners.length;i++){
            this.spiners[i].init(tool_comps,chance_set,hero,enemy);
        }
    },
    clear:function()
    {
        for(var i = 0 ; i < this.spiners.length;i++){
            this.spiners[i].clear();
        }
    },
    start:function()
    {
        this.spin_button.state = SpinerButtonState.SPIN;
        this.spin_button.normalColor = this.spin_color;
        
    },
    update:function(dt)
    {
        // var has_stoped = true;
        // for(var i = 0 ; i < this.spiners.length;i++){
        //     has_stoped = (has_stoped && !this.spiners[i].is_spining);
        // }
        // this.results = [];
        // if(has_stoped){
        //     for(var i = 0 ; i < this.spiners.length;i++){
        //         this.results.push(this.spiners[i].result);
        //     }
        // }
    },
    
    
});
