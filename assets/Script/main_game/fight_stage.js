// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const EffectManager = require("effect_manager");

cc.Class({
    extends: cc.Component,

    properties: {
       back_ground:cc.Node,
       actor_gap:300,
       actor_dis:20,
       effect_manager:{
           default:null,
           type:EffectManager
       }
    },
    init:function(hero,enemy,back_room)
    {
        this.enemy = enemy;
        this.hero = hero;
        this.enemy.parent = this.node;
        this.hero.parent = this.node;
        this.hero.x = -this.actor_gap/2;
        this.hero.y = this.back_ground.y-this.actor_dis;
        this.enemy.x = this.actor_gap/2;
        this.enemy.y = this.back_ground.y-this.actor_dis;
        this.hero.runAction(cc.flipX(true));

        this.back_room = back_room;
    },
    exit_stage:function()
    {
        this.node.active = false;
        
        cc.find("Canvas").getComponent("player_controller").enabled = true;
        this.back_room.active = true;
        this.hero.parent = this.back_room;
        this.hero.x = this.hero.getComponent("hero").current_pos.x;
        this.hero.y = this.hero.getComponent("hero").current_pos.y;
        
        this.back_room = null;
        this.enemy.destroy();
    },
    onEnable:function()
    {
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(0.5));
    },
    onLoad:function()
    {
        this.testing_effect_command = "explode_gray()";
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var yellow_explode = eval("this.effect_manager."+this.testing_effect_command);
            yellow_explode.position =this.node.convertToNodeSpaceAR(event.getLocation());
            this.node.addChild(yellow_explode);
          }, this);
    },
    
});
