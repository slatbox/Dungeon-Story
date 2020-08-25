/*
 * @Author: Jeffrey.Sewen
 * @Date: 2020-07-10 08:10:43
 * @LastEditTime: 2020-08-25 17:33:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\res\interaction_manager.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const InteractionManager = cc.Class({
    extends: cc.Component,

    properties: {
        unlocked_door:cc.Prefab,
        locked_door:cc.Prefab,
        room_door:cc.Prefab,
        actor_statue:{
            default:[],
            type:cc.SpriteFrame
        },
        white_statue:{
            default:[],
            type:cc.SpriteFrame
        },
        furniture:{
            default:[],
            type:cc.SpriteFrame
        },
        normal_jar:cc.Prefab,
        gold:cc.Prefab,
        normal_key:cc.Prefab,
        blood:cc.Prefab,

        normal_iron_sword:cc.Prefab,
        ice_bow:cc.Prefab,
        pick_up_tool_sound:cc.AudioClip
    },
    
    random_interaction:function()
    {
        var sets = [this.actor_statue,this.furniture];
        var using_set = sets[Math.floor(Math.random() * sets.length)];
        var using_frame = using_set[Math.floor(Math.random() * using_set.length)];
        var inter = new cc.Node();
        
        inter.addComponent(cc.Sprite).spriteFrame = using_frame;
        return inter;
    },
    random_instant_item:function()
    {
        var instant_items = [this.gold,this.normal_key,this.blood];
        var item = cc.instantiate(instant_items[Math.floor(Math.random() * instant_items.length)]);
       
        return item;
    },
    random_tool:function()
    {
        if(!this.tool_list){
            this.tool_list = [
                this.normal_iron_sword,
                this.ice_bow
            ];
        }
        
        var tool = cc.instantiate(this.tool_list[Math.floor(Math.random() * this.tool_list.length)]);
        tool.scaleX = 0.85;
        tool.scaleY = 0.85;
        return tool;
    },
    create_normal_jar:function()
    {
        var jar = cc.instantiate(this.normal_jar);
        jar.anchorX = 0.5;
        jar.anchorY = 0;
        return jar;
    },
    start:function()
    {
        window.Global.pick_up_sound = this.pick_up_tool_sound;
    },


});

module.exports = InteractionManager;