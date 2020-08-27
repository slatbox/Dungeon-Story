/*
 * @Author: Jeffrey.Swen
 * @Date: 2020-07-21 10:57:21
 * @LastEditTime: 2020-08-27 16:35:20
 * @LastEditors: Please set LastEditors
 * 
 * @Description: specific class for hero
 * 
 * @Attations:
 * 
 * 1) if you want to change hero's some attibute,do use the "set_value" method,which can update
 * the hero message board. 
 * 
 * @FilePath: \Dungeon-Story\assets\Script\actors\hero.js
 */

const TileWith = 24 * 3;
const TileHeight = 24 * 3;

cc.Class({
    extends: cc.Component,

    properties: {
        current_pos: cc.Vec2,
        moving_time : 0.5,
        jump_height:10,
        foot_setp_sound_ef: 
        {
            default:[],
            type: cc.AudioClip
        },
        default_tools:
        {
            default:[],
            type:cc.Prefab
        },
        current_hp:0,
        normal_keys:0,
        gold:0
    },

    move:function(direction)
    {
        var call = function()
        {
            var rand_sound = Math.floor(Math.random() * this.foot_setp_sound_ef.length);
            cc.audioEngine.playEffect(this.foot_setp_sound_ef[rand_sound],false);
        };
        var seq = cc.sequence(
            cc.flipX(direction.x == 1 || direction.x == 0),
            cc.callFunc(call,this),
            cc.jumpBy(this.moving_time * 0.5,direction.x * TileWith * 0.5,direction.y * TileHeight * 0.5,this.jump_height,1),
            cc.callFunc(call,this),
            cc.jumpBy(this.moving_time * 0.5,direction.x * TileWith * 0.5,direction.y * TileHeight * 0.5,this.jump_height,1)
        )
        this.node.runAction(seq);
        var update_pos = function(dt)
        {
            this.current_pos.x = this.node.x;
            this.current_pos.y = this.node.y;
        };
        this.scheduleOnce(update_pos,this.moving_time);
    },
    charge:function(direction)
    {
        var seq = cc.sequence(
            cc.flipX(direction.x == 1 || direction.x == 0),
            cc.jumpBy(this.moving_time * 0.5,
                direction.x * TileWith * 0.3,
                direction.y * TileHeight * 0.3,
                this.jump_height,
                1),
            cc.jumpBy(this.moving_time * 0.5,
                -direction.x * TileWith * 0.3,
                -direction.y * TileHeight * 0.3,
                this.jump_height,
                1),
        )
        this.node.runAction(seq);
        
    },
    update_info_table:function()
    {
        var table = cc.find("BasicInfomation").getComponent("basic_info_table");
        var to_set = ["current_hp","gold","normal_keys"];
        for(var i = 0 ; i < to_set.length;i++){
            table.set_label(to_set[i],this[to_set[i]]);
        }
    },
    set_value:function(label,value)
    {
        this[label] = value;
        this.update_info_table();
    },
    onLoad:function()
    {
        window.Global.hero_comp = this;
    },
    start:function()
    {
        this.current_hp = this.node.getComponent("creature").HP;
        this.update_info_table();
        for(var i = 0 ; i < this.default_tools.length;i++){
            var new_tool = cc.instantiate(this.default_tools[i]).getComponent("tool");
            new_tool.is_default = 1;
            new_tool.collect_into_bag();
        }
    }
    // update (dt) {},
});
