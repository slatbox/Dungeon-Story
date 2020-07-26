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

    

    act:function(hero,data)
    {
        var game_world =cc.find("Canvas/GameWorld").getComponent("game_world");
        
        var direction = data;
        game_world.enter_room(new cc.Vec2(
            - direction.y,
            direction.x 
        ));
        
    },
    

    // update (dt) {},
});
