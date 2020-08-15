// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const MainHeroStage = require("../GUI/main/main_hero_stage");
const TileWidth = 72;

cc.Class({
    extends: cc.Component,

    properties: {
        state2:cc.SpriteFrame,
        state3:cc.SpriteFrame,
        sound_effect: cc.AudioClip,
        virtual_rate:0.5
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    act:function(hero,data)
    {
        this.state += 1;
        var action = cc.blink(0.5,3);
        hero.getComponent("hero").charge(data);
        var call = function()
        {
            cc.audioEngine.playEffect(this.sound_effect,false);
            if(this.state == 2){
                this.node.getComponent(cc.Sprite).spriteFrame = this.state2;
                this.node.runAction(action.clone());
                
            }
            else if(this.state == 3){
                this.node.getComponent(cc.Sprite).spriteFrame = this.state3;
                this.node.runAction(action.clone());
            }
            else{
                var seq = cc.sequence(
                    action.clone(),
                    cc.removeSelf()
                );
                var interaction_set = cc.find("InteractionManager").getComponent("interaction_manager");
                var item = interaction_set.random_instant_item();
                item.x = this.node.x;
                item.y = this.node.y + 0.5 * TileWidth;
                item.pos = this.node.pos;
                this.node.parent.getComponent("room").interaction_items[this.node.pos.x][this.node.pos.y] = item;
                this.node.parent.addChild(item);
                this.node.runAction(seq);
                
            }
        };
        var seq = cc.sequence(
            cc.delayTime(hero.getComponent("hero").moving_time * 0.5),
            cc.callFunc(call,this)
        )
        this.node.runAction(seq);
    },
    
    start:function(){
        var virtual_rand = Math.random();
        if(virtual_rand < this.virtual_rate){
            var interaction_set = cc.find("InteractionManager").getComponent("interaction_manager");
            var item = interaction_set.random_instant_item();
            item.x = this.node.x;
            item.y = this.node.y + 0.5 * TileWidth;
            item.pos = this.node.pos;
            this.node.parent.getComponent("room").interaction_items[this.node.pos.x][this.node.pos.y] = item;
            this.node.parent.addChild(item);
            this.node.runAction(cc.removeSelf());
        }
        else{
            var frames = [this.node.getComponent(cc.Sprite).spriteFrame,this.state2,this.state3];
            this.state = Math.floor(Math.random() * 3) + 1;
            this.node.getComponent(cc.Sprite).spriteFrame = frames[this.state - 1];
        }
        
    }
    // update (dt) {},
});
