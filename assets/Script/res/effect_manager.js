// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EffectManager = cc.Class({
    extends: cc.Component,

    properties: {
        yellow_explode:cc.Prefab,
        gray_explode:cc.Prefab,
        chop_light_small_left:cc.SpriteFrame,
        chop_light_small_right:cc.SpriteFrame,
        chop_light_big_left:cc.SpriteFrame,
        chop_light_big_right:cc.SpriteFrame,
        scratch_big_sp:cc.SpriteFrame,
        scratch_small_sp:cc.SpriteFrame
    },
    
    explode_gray:function()
    {
        return cc.instantiate(this.gray_explode);
    },
    explode_yellow:function()
    {
        return cc.instantiate(this.yellow_explode);
    },
    random_bias:function(width)
    {
        var min_bias = - width;
        var max_bias = width;
        var random_bias_x = Math.floor(Math.random() * (max_bias - min_bias + 1)) + min_bias;
        var random_bias_y = Math.floor(Math.random() * (max_bias - min_bias + 1)) + min_bias;
        return new cc.Vec2(random_bias_x,random_bias_y);
    },
    chop_big:function()
    {
        var sp_set = [this.chop_light_big_right,this.chop_light_big_left];
        var rand1 = sp_set[Math.floor(Math.random() *sp_set.length)];
        var rand2 = sp_set[Math.floor(Math.random() *sp_set.length)];

        var chop1 = new cc.Node;
        chop1.addComponent(cc.Sprite).spriteFrame = rand1;
        chop1.opacity = 0;
        chop1.position = this.random_bias(10);

        var chop2 = new cc.Node;
        chop2.addComponent(cc.Sprite).spriteFrame = rand2;
        chop2.opacity = 0;
        chop2.position = this.random_bias(10);

        var tem = new cc.Node;
        tem.addChild(chop1);
        tem.addChild(chop2);

        var action1 = cc.sequence(
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        var action2 = cc.sequence(
            cc.delayTime(0.15),
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        chop1.runAction(action1);
        chop2.runAction(action2);
        return tem;
    },
    chop_small:function()
    {
        var sp_set = [this.chop_light_small_right,this.chop_light_small_left];
        var rand1 = sp_set[Math.floor(Math.random() *sp_set.length)];
        var rand2 = sp_set[Math.floor(Math.random() *sp_set.length)];

        var chop1 = new cc.Node;
        chop1.addComponent(cc.Sprite).spriteFrame = rand1;
        chop1.opacity = 0;
        chop1.position = this.random_bias(20);

        var chop2 = new cc.Node;
        chop2.addComponent(cc.Sprite).spriteFrame = rand2;
        chop2.opacity = 0;
        chop2.position = this.random_bias(20);

        var tem = new cc.Node;
        tem.addChild(chop1);
        tem.addChild(chop2);

        var action1 = cc.sequence(
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        var action2 = cc.sequence(
            cc.delayTime(0.15),
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        chop1.runAction(action1);
        chop2.runAction(action2);
        return tem;
    },
    scratch_small:function()
    {
        var scratch1 = new cc.Node;
        scratch1.addComponent(cc.Sprite).spriteFrame = this.scratch_small_sp;
        scratch1.opacity = 0;
        scratch1.position = this.random_bias(20);

        var scratch2 = new cc.Node;
        scratch2.addComponent(cc.Sprite).spriteFrame = this.scratch_small_sp;
        scratch2.opacity = 0;
        scratch2.position = this.random_bias(20);

        var tem = new cc.Node;
        tem.addChild(scratch1);
        tem.addChild(scratch2);

        var action1 = cc.sequence(
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        var action2 = cc.sequence(
            cc.delayTime(0.15),
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        scratch1.runAction(action1);
        scratch2.runAction(action2);
        return tem;
    },
    scratch_big:function()
    {
        var scratch1 = new cc.Node;
        scratch1.addComponent(cc.Sprite).spriteFrame = this.scratch_big_sp;
        scratch1.opacity = 0;
        scratch1.position = this.random_bias(20);

        var scratch2 = new cc.Node;
        scratch2.addComponent(cc.Sprite).spriteFrame = this.scratch_big_sp;
        scratch2.opacity = 0;
        scratch2.position = this.random_bias(20);

        var tem = new cc.Node;
        tem.addChild(scratch1);
        tem.addChild(scratch2);

        var action1 = cc.sequence(
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        var action2 = cc.sequence(
            cc.delayTime(0.15),
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        scratch1.runAction(action1);
        scratch2.runAction(action2);
        return tem;
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    

    // update (dt) {},
});
module.exports = EffectManager;
