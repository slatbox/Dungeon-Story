/*
 * @Author: your name
 * @Date: 2020-08-20 14:59:54
 * @LastEditTime: 2020-08-20 15:19:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\interactions\locked_door.js
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const TileWidth = 24 * 3;
const TileHeight = 24 * 3;
const DoorState = cc.Enum({
    open:0,
    close:1
});

cc.Class({
    extends: cc.Component,

   
    properties: {
        open_frame: cc.SpriteFrame,
        sounds: {
            default: [],
            type: cc.AudioClip
        }
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad:function()
    {
        this.state = DoorState.close;
    },
    act:function(hero,data)
    {
        var direction = data;
        var hero_com = hero.getComponent("hero");
        
        if(this.state == DoorState.close)
        {
            if(hero_com.normal_keys > 0){
                hero_com.set_value("normal_keys",hero_com.normal_keys - 1);
                this.node.getComponent(cc.Sprite).spriteFrame = this.open_frame;
                this.state = DoorState.open;
                var rand = Math.floor(Math.random() * this.sounds.length);
                var call = function(){
                    cc.audioEngine.playEffect(this.sounds[1],false);
                };
                var seq = cc.sequence(
                    cc.delayTime(0.2),
                    cc.callFunc(call,this)
                );
                cc.audioEngine.playEffect(this.sounds[0],false);
                this.node.runAction(seq);                
            }
            else{
                hero_com.charge(direction);
            }
            
        }
        else
        {
            hero_com.move(direction);
        }
        this.hero = hero;
    },

    // update (dt) {},
});
