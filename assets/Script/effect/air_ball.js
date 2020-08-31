/*
 * @Author: your name
 * @Date: 2020-08-30 19:47:59
 * @LastEditTime: 2020-08-30 21:25:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\effect\air_ball.js
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
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init:function(target,values,effect_manager){
        this.target = target;
        this.effect_manager = effect_manager;
        this.values = values;
        this.state = 1;
    },
    update:function(dt){
        if(!this.target){return;}
        if(!this.state){return;}
        
        var distance = Math.sqrt(Math.abs(this.node.x - this.target.x) ** 2 + Math.abs(this.node.y - this.target.y) ** 2);
        if(distance < 50){

            var seq = cc.spawn(
                this.effect_manager.get_harm_action(),
                this.effect_manager.allocate_harm_value(this.target,this.values),
                // this.effect_manager.arrow_wound_action(this.target)
            );
            
            var escape_bar = cc.find("Canvas/fight_stage/escape_sys/escape_bar");

            if (escape_bar.getComponent("escape_bar").miss) {
                this.node.runAction(cc.sequence(cc.delayTime(1.0),cc.fadeIn(0.5),cc.removeSelf()));
            }
            else{
                this.node.runAction(cc.sequence(cc.fadeOut(0.1),cc.removeSelf()));
            }
            this.state = 0;
            
            this.target.runAction(seq);
            
            
        }
    }
    

    // update (dt) {},
});
