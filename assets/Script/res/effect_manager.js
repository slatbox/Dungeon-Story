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
        arrow:cc.Prefab,
        gray_book:cc.Prefab,
        air_ball:cc.Prefab,
        chop_light_small_left:cc.SpriteFrame,
        chop_light_small_right:cc.SpriteFrame,
        chop_light_big_left:cc.SpriteFrame,
        chop_light_big_right:cc.SpriteFrame,
        scratch_big_sp:cc.SpriteFrame,
        scratch_small_sp:cc.SpriteFrame,
        bump_small_sp:cc.SpriteFrame,
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
    big_chop_action:function(enemy)
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
        var call = cc.callFunc(function(){
            chop1.runAction(action1);
            chop2.runAction(action2);
            tem.y = enemy.height/2;
            enemy.addChild(tem);
        },this);
        
        return call;
    },
    small_chop_action:function(enemy)
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
        var call = cc.callFunc(function(){
            chop1.runAction(action1);
            chop2.runAction(action2);
            tem.y = enemy.height/2;
            enemy.addChild(tem);
        },this);
        
        return call;
    },
    arrow_wound_action:function(enemy)
    {
        var sp_set = [this.chop_light_small_right,this.chop_light_small_left];
        var rand1 = sp_set[Math.floor(Math.random() *sp_set.length)];

        var chop1 = new cc.Node;
        chop1.addComponent(cc.Sprite).spriteFrame = rand1;
        chop1.opacity = 0;
        chop1.position = this.random_bias(20);


        var tem = new cc.Node;
        tem.addChild(chop1);

        var action1 = cc.sequence(
            cc.fadeIn(0.2).easing(cc.easeBounceIn()),
            cc.fadeOut(0.3),
            cc.removeSelf()
        );
        var call = cc.callFunc(function(){
            chop1.runAction(action1);
            tem.y = enemy.height/2;
            enemy.addChild(tem);
        },this);
        
        return call;
    },
    scratch_small:function(enemy)
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
        enemy.addChild(tem);
    },
    small_bump_action:function(enemy)
    {
        var bump1 = new cc.Node;
        bump1.addComponent(cc.Sprite).spriteFrame = this.bump_small_sp;
        bump1.opacity = 0;
        bump1.position = this.random_bias(20);

        var bump2 = new cc.Node;
        bump2.addComponent(cc.Sprite).spriteFrame = this.bump_small_sp;
        bump2.opacity = 0;
        bump2.position = this.random_bias(20);

        var tem = new cc.Node;
        tem.addChild(bump1);
        tem.addChild(bump2);

        var action1 = cc.sequence(
            cc.fadeIn(0.05).easing(cc.easeBounceIn()),
            cc.fadeOut(0.15),
            cc.removeSelf()
        );
        var action2 = cc.sequence(
            cc.delayTime(0.1),
            cc.fadeIn(0.05).easing(cc.easeBounceIn()),
            cc.fadeOut(0.15),
            cc.removeSelf()
        );

        

        var call = cc.callFunc(function(){
            bump1.runAction(action1);
            bump2.runAction(action2);
            tem.y = enemy.height/2;
            enemy.addChild(tem);
        },this);
        
        return call;
    },
    scratch_big:function(enemy)
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
        enemy.addChild(tem);
    },
    create_air_ball:function(){
        return cc.instantiate(this.air_ball);
    },
    create_gray_book:function()
    {
        return cc.instantiate(this.gray_book);
    },
    get_tremble_action:function(duration,times){
        var act = cc.sequence(
            cc.moveBy(duration/times/2.0,-10,0),
            cc.moveBy(duration/times/2.0,10,0),
        );
        return cc.repeat(act, times);
        
    },
    get_harm_action:function(){
        var harm_act = cc.spawn(
            this.get_tremble_action(1.0,8),
            cc.blink(1.0,3)
        )
        return harm_act;
    },
    allocate_harm_value:function(enemy,values)
    {
        var hero_hp_bar = cc.find("Canvas/fight_stage/hero_hp_bar").getComponent("ability_row");
        var enemy_hp_bar = cc.find("Canvas/fight_stage/foe_hp_bar").getComponent("ability_row");
        var k3 = 0.75;
        var k5 = 300;
        var enemy_df = enemy.getComponent("creature").DF;
        var hp_change =  - Math.floor(values.AT*(1 - k3 * enemy_df/(enemy_df + k5)));
        if(enemy.current_hp){
            enemy.current_hp += hp_change;
            enemy.current_hp = enemy.current_hp < 0 ? 0 : enemy.current_hp;

            enemy_hp_bar.set_level(enemy.current_hp);
        }
        else{
            enemy.getComponent("hero").current_hp += hp_change;
            enemy.getComponent("hero").current_hp = enemy.getComponent("hero").current_hp < 0 ? 0 : enemy.getComponent("hero").current_hp;
            hero_hp_bar.set_level(enemy.getComponent("hero").current_hp);
        }
    },
    do_harm_to_action:function(enemy,effect_action,values)
    {
        var act = cc.jumpBy(0.15,enemy.width,0,15,1);

        if(enemy.getComponent("hero")){
            act = act.reverse();
        }
        var seq = cc.sequence(
            act,
            cc.callFunc(function(){
                enemy.runAction(this.get_harm_action());
                enemy.runAction(effect_action);
                this.allocate_harm_value(enemy,values);
            },this),
            
            act.reverse()
        )
        return seq;
    },
    walk_to_enemy_action:function(enemy)
    {
        var seq;
        if(enemy.getComponent("hero")){
            seq = cc.jumpTo(0.7,enemy.x + enemy.width*1.5,enemy.y,10,3);
        }
        else{
            seq = cc.jumpTo(0.7,enemy.x - enemy.width*1.5,enemy.y,10,3);
        }

        return seq;
    },
    walk_back_action:function(original_pos){
        var seq =cc.jumpTo(0.7,original_pos,10,3);
        
        return seq;
    },
    step_a_bit_action:function(enemy){
        if(enemy.getComponent("hero")){
            return cc.jumpBy(0.2, - enemy.width/2,0,10,1);
        }
        else{
            return cc.jumpBy(0.2, enemy.width/2,0,10,1);
        }
    },
    recoil_action:function(shooter){
        var seq = cc.sequence(
            cc.moveBy(0.1,20,0),
            cc.moveBy(0.1,-20,0)
        );
        if(shooter.getComponent("hero")){
            return seq.reverse();
        }
        return seq;
    },
    
    shot_action:function(shooter,enemy,values){

        var direction = cc.repeatForever(cc.moveBy(0.1,-170,0));
        if(shooter.getComponent("hero")){
            direction = direction.reverse();
        }

        var seq = cc.sequence(
            cc.callFunc(function(){
                var arrow = cc.instantiate(this.arrow);
                arrow.runAction(direction);
                arrow.position = new cc.Vec2(shooter.x,shooter.y + shooter.height / 2);
                arrow.getComponent("arrow").init(enemy,values,this);
                shooter.parent.addChild(arrow);
            },this),
            this.recoil_action(shooter)
        );
        return seq;

        
        
    },


    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad:function()
    {
        window.Global.effect_manager = this;
    },
    

    // update (dt) {},
});
module.exports = EffectManager;
