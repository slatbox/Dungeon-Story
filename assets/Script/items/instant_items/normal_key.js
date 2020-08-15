// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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
            hero_cmp.set_value("normal_keys",hero_cmp.normal_keys + 1);
            this.node.runAction(seq);
            cc.audioEngine.playEffect(this.sound_effect,false);
            this.node.parent.getComponent("room").interaction_items[this.node.pos.x][this.node.pos.y] = null;
        };
        var seq = cc.sequence(
            cc.delayTime(hero.getComponent("hero").moving_time * 0.5),
            cc.callFunc(call,this)
        )
        this.node.runAction(seq);
    }

    // update (dt) {},
});
