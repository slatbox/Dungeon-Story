// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        background_pic_1: cc.Sprite,
        background_pic_2: cc.Sprite,
        background_textures : {default:[],type:cc.SpriteFrame},
        rolling_speed : 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start :function()
    {
        var mov = cc.repeatForever(cc.moveBy(1,cc.Vec2(-this.rolling_speed,0)));
        this.background_pic_1.node.runAction(mov);
        this.background_pic_2.node.runAction(mov.clone());
        
        this.counter = 2;
    },
    update:function(dt)
    {
        var view_size = cc.view.getVisibleSize();
       if(Math.abs(this.background_pic_1.node.x + this.background_pic_1.node.width - view_size.width/2) < dt*this.rolling_speed)
       {
           this.background_pic_2.node.x = view_size.width/2;
       }
       if(Math.abs(this.background_pic_1.node.x +this.background_pic_1.node.width  + view_size.width/2) < dt*this.rolling_speed)
       {
           this.background_pic_1.getComponent(cc.Sprite).spriteFrame = this.background_textures[this.counter];
           this.counter = (this.counter+1)%8;
       }
       if(Math.abs(this.background_pic_2.node.x+this.background_pic_2.node.width - view_size.width/2) <dt*this.rolling_speed)
        {
            this.background_pic_1.node.x = view_size.width/2;
        }
       if(Math.abs(this.background_pic_2.node.x+this.background_pic_2.node.width + view_size.width/2) < dt*this.rolling_speed)
       {
           this.background_pic_2.getComponent(cc.Sprite).spriteFrame = this.background_textures[this.counter];
           this.counter = (this.counter+1)%8;
       }
    }
    // update (dt) {},
});
