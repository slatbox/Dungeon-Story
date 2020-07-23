// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const TileWidth = 24 * 3;
const TileHeight = 24 * 3;
const DoorState = cc.Enum({
    open:0,
    close:1
})
cc.Class({
    extends: cc.Component,

    properties: {
        open_frame: cc.SpriteFrame,
        sounds:{
            default:[],
            type:cc.AudioClip
        }
    },

    onLoad:function()
    {
        this.state = DoorState.close;
    },
    act:function(hero,data)
    {
        var direction = data;
        if(this.state == DoorState.close)
        {
            this.node.getComponent(cc.Sprite).spriteFrame = this.open_frame;
            this.state = DoorState.open;
            var rand = Math.floor(Math.random() * this.sounds.length);
            cc.audioEngine.playEffect(this.sounds[rand],false);
        }
        else
        {
            hero.getComponent("hero").move(direction);
        }
        this.hero = hero;
    },
    update:function(dt)
    {
        if(!this.hero)
        {
            return;
        }
        var sub_x = this.hero.x - TileWidth * 0.5  - this.node.x;
        var sub_y = this.hero.y + TileHeight - this.node.y;
        if(Math.abs(sub_x) < 5 && Math.abs(sub_y) < 5)
        {
            this.node.opacity = 255 * 0.5;
        }
        else 
        {
            this.node.opacity = 255;
        }
    }
});
