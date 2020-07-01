// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const ActorPrefabManager = require("actor_prefab_manager");


cc.Class({
    extends: cc.Component,

    properties: {
        background_pic_1: cc.Sprite,
        background_pic_2: cc.Sprite,
        background_textures : {default:[],type:cc.SpriteFrame},
        rolling_speed : 0,
        actors_show_y : 0,
        actor_moving_time:0,
        background_music: cc.AudioClip,
        actor_prefab_manager:{
            default:null,
            type: ActorPrefabManager
        },
        
        
    },

    start_background:function()
    {
        var title = this.node.getChildByName("title");
        var note = this.node.getChildByName("note");
        title.active = true;
        note.active = true;
        this.background_pic_1.node.active = true;
        this.background_pic_2.node.active = true;
        
        var fade_in = cc.fadeIn(5);

        var mov = cc.repeatForever(cc.moveBy(1,cc.Vec2(this.rolling_speed,0)));
        
        this.background_pic_1.node.runAction(mov);
        this.background_pic_1.node.runAction(fade_in);

        this.background_pic_2.node.runAction(mov.clone());
        this.background_pic_2.node.runAction(fade_in.clone());

        cc.audioEngine.playMusic(this.background_music,true);
    },
    start_show_actors:function()
    {
        var view_size = cc.view.getVisibleSize();
        var fighter = cc.instantiate(this.actor_prefab_manager.fighter);
        var red_demon = cc.instantiate(this.actor_prefab_manager.red_demon);

        fighter.x = view_size.width / 2+fighter.width;
        fighter.y = this.actors_show_y;

        red_demon.x = view_size.width / 2+fighter.width;
        red_demon.y = this.actors_show_y;
        this.node.addChild(fighter);
        this.node.addChild(red_demon);

        var show_background = cc.callFunc(function (target)
        {
            this.start_background();
        },this);

        var seq2 = cc.sequence(
            cc.moveBy(1,-120,0).easing(cc.easeBounceIn()),
            show_background,
            cc.delayTime(1),
            cc.moveBy(1,0,50),
            cc.delayTime(1),
            cc.moveBy(this.actor_moving_time,-view_size.width-200,0),
            
        )
        var show_red_demon = cc.callFunc(function (target,demon_mov)
        {
            demon_mov[0].runAction(demon_mov[1]);
        },this,[red_demon,seq2])
        var seq = cc.sequence(
            cc.moveTo(this.actor_moving_time,0,this.actors_show_y),
            cc.delayTime(1),
            cc.flipX(true),
            cc.delayTime(2),
            cc.flipX(false),
            cc.moveTo(this.actor_moving_time,-view_size.width/2- fighter.width,this.actors_show_y),
            show_red_demon
        );

        fighter.runAction(seq);
        this.showing_actor = red_demon;
        //加载随机显示列表
        var pref = this.actor_prefab_manager;
        this.show_list = [
            pref.robber,
            pref.ranger,
            pref.green_slime,
            pref.purple_slime,
            pref.black_bat,
            pref.red_bat
        ]
    },
   
    roll_background:function(dt)
    {
        var view_size = cc.view.getVisibleSize();
       if(Math.abs(this.background_pic_1.node.x + view_size.width/2) < dt*this.rolling_speed)
       {
           this.background_pic_2.node.x = -view_size.width/2 - this.background_pic_2.node.width;
       }
       if(Math.abs(this.background_pic_1.node.x  - view_size.width/2) < dt*this.rolling_speed)
       {
           var texture_index = Math.floor((Math.random()*8));
           cc.log(texture_index);
           this.background_pic_1.getComponent(cc.Sprite).spriteFrame = this.background_textures[texture_index];
       }
       if(Math.abs(this.background_pic_2.node.x+view_size.width/2) <dt*this.rolling_speed)
        {
            this.background_pic_1.node.x = -view_size.width/2 - this.background_pic_2.node.width;
        }
       if(Math.abs(this.background_pic_2.node.x+this.background_pic_2.node.width + view_size.width/2) < dt*this.rolling_speed)
       {
           var texture_index = Math.floor((Math.random()*8));
           this.background_pic_2.getComponent(cc.Sprite).spriteFrame = this.background_textures[texture_index];
       }
    },
    start :function()
    {
        this.start_show_actors();
    },
    update:function(dt)
    {
        this.roll_background(dt);
        if(this.showing_actor.x <=- cc.view.getVisibleSize().width/2 - this.showing_actor.width)
        {
            this.showing_actor.destroy();
            var len = this.show_list.length;
            var rand = Math.floor(Math.random() * len);
            var next_creatrure = cc.instantiate(this.show_list[rand]);
            next_creatrure.x = cc.view.getVisibleSize().width/2+next_creatrure.width;
            next_creatrure.y = this.actors_show_y;
            this.node.addChild(next_creatrure);
            this.showing_actor = next_creatrure;
            var mov = cc.moveTo(this.actor_moving_time*2,-cc.view.getVisibleSize().width/2 - next_creatrure.width-10,this.actors_show_y);
            next_creatrure.runAction(mov);
        }
    }
    // update (dt) {},
});
