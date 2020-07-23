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
        level: 0,
        bar_gap:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    set_level:function(level)
    {
        this.level = level;
        var max_level = 10;
        for(var i = 0; i < max_level;i++)
        {
            if(i < this.level)
            {
                this.bars[i].active = 1;
            }
            else 
            {
                this.bars[i].active = 0;
            }
        }
    },

    onLoad:function()
    {
        var icon = this.node.getChildByName("icon");
        var height = icon.height;
        var width = icon.width;
        var max_level = 10;
        this.bars = [];
        var start_color = cc.Color.BLUE;
        var end_color = cc.Color.RED;
        for(var i = 0 ; i < max_level;i++)
        {
            var bar = new cc.Node();
            bar.addComponent(cc.Sprite).spriteFrame = this.bar_frame;
            bar.anchorX = 0.5;
            bar.anchorY = 0.5;
            bar.x = width + this.bar_gap * (i+1);
            bar.y = - height/2;

            r = start_color.r + i/10*end_color.r;
            g = start_color.g + i/10*end_color.g;
            b = start_color.b + i/10*end_color.b;
            bar.color = new cc.Color(r,g,b);
            bar.active = false;
            cc.log(bar.color);
            this.node.addChild(bar);
            this.bars.push(bar);
        }
    },
    // update (dt) {},
});

module.exports = AbilityRow;