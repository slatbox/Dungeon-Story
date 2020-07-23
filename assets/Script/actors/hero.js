// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const TileWith = 24 * 3;
const TileHeight = 24 * 3;

cc.Class({
    extends: cc.Component,

    properties: {
        current_pos: cc.Vec2,
        moving_time : 0.5,
        jump_height:10,
        foot_setp_sound_ef: 
        {
            default:[],
            type: cc.AudioClip
        }
    },

    move:function(direction)
    {
        var call = function()
        {
            var rand_sound = Math.floor(Math.random() * this.foot_setp_sound_ef.length);
            cc.audioEngine.playEffect(this.foot_setp_sound_ef[rand_sound],false);
        };
        var seq = cc.sequence(
            cc.flipX(direction.x == 1 || direction.x == 0),
            cc.callFunc(call,this),
            cc.jumpBy(this.moving_time * 0.5,direction.x * TileWith * 0.5,direction.y * TileHeight * 0.5,this.jump_height,1),
            cc.callFunc(call,this),
            cc.jumpBy(this.moving_time * 0.5,direction.x * TileWith * 0.5,direction.y * TileHeight * 0.5,this.jump_height,1)
        )
        this.node.runAction(seq);
        var update_pos = function(dt)
        {
            this.current_pos.x = this.node.x;
            this.current_pos.y = this.node.y;
        };
        this.scheduleOnce(update_pos,this.moving_time);
    },
    charge:function(direction)
    {
        var seq = cc.sequence(
            cc.flipX(direction.x == 1 || direction.x == 0),
            cc.jumpBy(this.moving_time * 0.5,
                direction.x * TileWith * 0.3,
                direction.y * TileHeight * 0.3,
                this.jump_height,
                1),
            cc.jumpBy(this.moving_time * 0.5,
                -direction.x * TileWith * 0.3,
                -direction.y * TileHeight * 0.3,
                this.jump_height,
                1),
        )
        this.node.runAction(seq);
        
    },
    onLoad:function()
    {
    
        
    }

    // update (dt) {},
});
