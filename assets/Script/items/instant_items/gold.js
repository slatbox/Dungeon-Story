// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        small_rate:0.5,
        middle_rate:0.2,
        large_rate:0.3,
        small_price:2,
        middle_price:5,
        large_price:10,
        small_frame:cc.SpriteFrame,
        middle_frame:cc.SpriteFrame,
        large_frame:cc.SpriteFrame,
        sound_effect:cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    act:function(hero,direction)
    {
        hero.getComponent("hero").charge(direction);
        var call = function()
        {
            var seq = cc.sequence(
                cc.spawn(
                    cc.moveBy(0.5,0,40).easing(cc.easeBounceIn()),
                    cc.fadeOut(0.5)
                ),
                cc.removeSelf()
            );
            var hero_cmp = hero.getComponent("hero");
            hero_cmp.set_value("gold",hero_cmp.gold + this.current_price);
            this.node.runAction(seq);
            cc.audioEngine.playEffect(this.sound_effect,false);
            this.node.parent.getComponent("room").interaction_items[this.node.pos.x][this.node.pos.y] = null;
        };
        var seq = cc.sequence(
            cc.delayTime(hero.getComponent("hero").moving_time * 0.5),
            cc.callFunc(call,this)
        )
        this.node.runAction(seq);

    },
    
    start:function()
    {
        var rand1 = Math.random();

        if(rand1 < this.small_rate){
            this.node.getComponent(cc.Sprite).spriteFrame = this.small_frame;
            this.current_price = this.small_price;
        }
        else if(rand1 - this.small_rate< this.middle_rate){
            this.node.getComponent(cc.Sprite).spriteFrame = this.middle_frame;
            this.current_price = this.middle_price;
        }
        else{
            this.node.getComponent(cc.Sprite).spriteFrame = this.large_frame;
            this.current_price = this.large_price;
        }
    }
    // update (dt) {},
});
