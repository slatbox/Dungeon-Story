/*
 * @Author: your name
 * @Date: 2020-08-29 14:15:55
 * @LastEditTime: 2020-08-29 20:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\effect\arrow.js
 */


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
            this.target.runAction(seq);
            this.node.runAction(cc.sequence(cc.delayTime(2),cc.removeSelf(true)));
            this.state = 0;
        }
    }
    
    
    
});
