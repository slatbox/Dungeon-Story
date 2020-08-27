/*
 * @Author: your name
 * @Date: 2020-08-06 15:26:02
 * @LastEditTime: 2020-08-27 19:24:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\items\instant_items\blood.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        value:20,
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
            var max_hp = hero.getComponent("creature").HP;
            hero_cmp.set_value("current_hp", (hero_cmp.current_hp + this.value)%max_hp);
            this.node.runAction(seq);
            cc.audioEngine.playEffect(this.sound_effect, false);
            this.node.parent.getComponent("room").interactions[this.node.pos.x][this.node.pos.y] = null;
        };
        var seq = cc.sequence(
            cc.delayTime(hero.getComponent("hero").moving_time * 0.5),
            cc.callFunc(call,this)
        )
        this.node.runAction(seq);
        
    }

    // update (dt) {},
});
