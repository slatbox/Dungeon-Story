/*
 * @Author: your name
 * @Date: 2020-08-29 16:24:40
 * @LastEditTime: 2020-08-29 16:32:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\effect\magic_book.js
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
        open_frame:cc.SpriteFrame,
        close_frame:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    open:function()
    {
        this.node.getComponent(cc.Sprite).spriteFrame = this.open_frame;
    },
    close:function()
    {
        this.node.getComponent(cc.Sprite).spriteFrame = this.close_frame;
    },
    
    start:function()
    {
        this.node.opacity = 0;
        var seq = cc.sequence(
            cc.spawn(cc.fadeIn(0.5),cc.moveBy(0.5,0,-70)),
            cc.callFunc(function(){
                var action = cc.repeatForever(cc.sequence(
                    cc.moveBy(0.5,0,30),
                    cc.moveBy(0.5,0,-30)
                ));
                this.node.runAction(action);
            },this)
        ); 
        
    },
    // update (dt) {},
});
