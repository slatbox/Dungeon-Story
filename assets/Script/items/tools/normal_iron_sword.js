/*
 * @Author: your name
 * @Date: 2020-08-22 16:59:38
 * @LastEditTime: 2020-08-22 17:03:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\items\tools\Normal Iron Sword.js
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    
    act:function(hero,direction)
    {
        this.node.getComponent("tool").pick(hero,direction)
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
            hero_cmp.set_value("current_hp", hero_cmp.current_hp + this.value);
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
