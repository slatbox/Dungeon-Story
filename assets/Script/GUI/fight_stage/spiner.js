// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const types = require("types");
const ToolTypes = types.ToolTypes;
const Spiner = cc.Class({
    extends: cc.Component,

    properties: {
        // icon_set:{
        //     default:[],
        //     type:cc.SpriteFrame
        // },
        bad_luck_icon:cc.SpriteFrame,
        spin_time:0.5,
        spin_gap: 50,
        trigger_time:1
    },
    create_random_icon:function()
    {
        var rand0 = Math.random();
        var rand1 = Math.random();
        var rand2 = Math.random();
        var using_icon;
        var corre_function_comp;
        if(rand0 < this.good_luck_chance)
            if(rand1 < this.arm_chance)
                if(rand2 < this.main_arm_chance)
                {
                    corre_function_comp = this.corresponding_tool_set.main_arm;
                    using_icon = this.icon_set.main_arm;
                }
                else
                {
                    corre_function_comp = this.corresponding_tool_set.asis_arm;
                    using_icon = this.icon_set.asis_arm;
                }     
            else
            {
                corre_function_comp = this.corresponding_tool_set.asis_tool;
                using_icon = this.icon_set.asis_tool;
            }
        else
        {
            corre_function_comp = this.enemy.getComponent(this.enemy.name);
            using_icon = this.icon_set.bad_luck;
        }

        var random_icon = new cc.Node();
        random_icon.addComponent(cc.Sprite).spriteFrame = using_icon;
        random_icon.corre_function_comp = corre_function_comp;
        random_icon.anchorX = 0.5;
        random_icon.anchorY = 0.5;
        random_icon.x = 0;
        random_icon.y = 0;
        return random_icon;
    },
    spin_out_new_icon:function()
    {
        var last_times = 4;
        var new_icon = this.create_random_icon();
        new_icon.y = this.spin_gap;
        this.node.addChild(new_icon);
        var mov_down = cc.sequence(
            cc.moveBy(this.spin_time * last_times,0,- this.spin_gap*last_times),
            cc.removeSelf()
        );
        new_icon.current_action = mov_down;
        new_icon.runAction(mov_down);
        this.down_icon = this.middle_icon;
        this.middle_icon = this.up_icon;
        this.up_icon = new_icon;
    },
    start_spin:function()
    {
        var last_times = 4;
        var mov_down = cc.sequence(
            cc.moveBy(this.spin_time * last_times,0,- this.spin_gap*last_times),
            cc.removeSelf()
        );
        var mov_c = mov_down.clone();
        var mov_c2 = mov_down.clone();
        this.up_icon.runAction(mov_down);
        this.middle_icon.runAction(mov_c);
        this.down_icon.runAction(mov_c2);

        this.up_icon.current_action = mov_down;
        this.middle_icon.current_action = mov_c;
        this.down_icon.current_action = mov_c2;
        this.is_spining = true;
    },
    respin:function()
    {
        this.node.stopAction(this.current_action);
        this.start_spin();
    },
    set_spin_chance:function()
    {

    },
    init:function(tool_comps,chance_set,hero,enemy)
    {
        //init chances
        var main_arm = tool_comps[ToolTypes.arm_main];
        var asis_arm = tool_comps[ToolTypes.arm_asis];
        var asis_tool = tool_comps[ToolTypes.tool];
        this.hero = hero;
        this.enemy = enemy;

        this.arm_chance = asis_tool? chance_set.arm_chance : 1.0;
        this.main_arm_chance = asis_arm ? chance_set.main_arm_chance : 1.0;
        // var hero_comp = window.Global.hero_comp;
        var hero_lk = this.hero.getComponent("creature").LK ;
        var enemy_lk = this.enemy.getComponent("creature").LK;

        this.good_luck_chance = hero_lk/(enemy_lk + hero_lk);

        this.icon_set = {
            main_arm:main_arm.node.getComponent(cc.Sprite).spriteFrame,
            asis_arm:(asis_arm ? asis_arm.node.getComponent(cc.Sprite).spriteFrame : null),
            asis_tool:(asis_tool ? asis_tool.node.getComponent(cc.Sprite).spriteFrame : null),
            bad_luck:this.bad_luck_icon
        };
        this.corresponding_tool_set = {
            main_arm:main_arm,
            asis_arm:asis_arm,
            asis_tool:asis_tool,
        };
        
        //init spiner elements
        var up_icon = this.create_random_icon();
        up_icon.y = this.spin_gap;

        var middle_icon = this.create_random_icon();
        var down_icon = this.create_random_icon();
        down_icon.y = - this.spin_gap;

        this.node.addChild(middle_icon);
        this.node.addChild(up_icon)
        this.node.addChild(down_icon);

        this.middle_icon = middle_icon;
        this.up_icon = up_icon;
        this.down_icon = down_icon;

        this.is_spining = false;
        this.result = this.middle_icon;
    },
    clear:function()
    {
        this.middle_icon.destroy();
        this.up_icon.destroy();
        this.down_icon.destroy();
    },
    onLoad:function()
    {
        
        
    },
    stop:function()
    {
        var call = function()
        {
            this.middle_icon.stopAction(this.middle_icon.current_action);
            this.up_icon.stopAction(this.up_icon.current_action);
            this.down_icon.stopAction(this.down_icon.current_action);

            var m1 = cc.moveTo(0.1, 0, 0);
            var m2 = cc.moveTo(0.1, 0, this.spin_gap);
            var m3 = cc.moveTo(0.1, 0, - this.spin_gap);

            this.middle_icon.runAction(m1);
            this.result = this.middle_icon;
            this.up_icon.runAction(m2);
            this.down_icon.runAction(m3);
            this.is_spining = false;
        };
        var seq = cc.sequence(
            cc.delayTime(this.trigger_time),
            cc.callFunc(call,this)
        );
        this.current_action = seq;
        
        this.node.runAction(seq);
    },
    update:function(dt)
    {
        if(this.is_spining &&  this.up_icon.y <= 0)
        {
            this.spin_out_new_icon();
        }
    },

    // update (dt) {},
});

module.exports = Spiner;