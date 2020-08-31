/*
 * @Author: your name
 * @Date: 2020-07-12 17:31:02
 * @LastEditTime: 2020-08-29 19:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\GUI\start_menu\ability_row.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const AbilityRow = cc.Class({
    extends: cc.Component,

    properties: {
        bar_frame:cc.SpriteFrame,
        label_object:cc.Label,
        num_label:cc.Label,
        label:"HP",
        max: 10,
        bar_gap:0,
        color:cc.Color,
        show_max:true,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    set_level:function(level)
    {
        var percent = level / this.max;
        this.bar.width = this.max_width;
        //    this.bar.width = this.max_width * percent;
        var target_scale = this.bar.original_scale * percent;
        this.bar.runAction(cc.scaleTo(0.2,target_scale,this.bar.scaleY))
        var label = this.node.getChildByName("Label");
        this.bar.height = label.height * label.scaleY;
        var to_show = String(level);
        if (this.show_max)
            to_show += "/" + String(this.max);
        this.num_label.string = to_show;
    },

    onLoad:function()
    {
        this.label_object.string = this.label;
        var label = this.node.getChildByName("Label");
        var bg = this.node.getChildByName("5bk");
        var bar_layer = this.node.getChildByName("bar_layer");
        var real_bg_width = bg.scaleX * bg.width;
        this.max_width = real_bg_width;
        
        var width = label.width;
        var bar = new cc.Node();
        bar.addComponent(cc.Sprite).spriteFrame = this.bar_frame;
        bar.anchorX = 0;
        bar.anchorY = 0.5;
        bar.x = label.x + width/2;
        bar.y = label.y;
        bar.original_scale = bar.scaleX;
        bar.color = this.color;
        this.bar = bar;
        
        bar_layer.addChild(bar);
        
    },
    start:function()
    {
        var ability_label = this.node.getChildByName("Label").getComponent(cc.Button);
        ability_label.normalColor = this.color;
    },
    // update (dt) {},
});

module.exports = AbilityRow;