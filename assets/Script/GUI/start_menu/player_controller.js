// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const GameWorld = require("game_world");
cc.Class({
    extends: cc.Component,

    properties: {
       is_pressing:false,
       game_world:GameWorld
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    call_press:function()
    {
        this.game_world.deal_with_touch(this.current_pos);
    },
    onLoad:function()
    {
        var start_call = function(event)
        {
            this.current_pos = event.getLocation();
            this.is_pressing = true;
        };
        var end_call = function(event)
        {
            this.current_pos = null;
            this.is_pressing = false;
        };
        var update_pos = function(event)
        {
            this.current_pos = event.getLocation();
        };
        this.node.on(cc.Node.EventType.TOUCH_START,start_call,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,update_pos,this)
        this.node.on(cc.Node.EventType.TOUCH_END,end_call,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,end_call,this);
    },
    update:function(dt)
    {
        if(this.is_pressing == true)
        {
            this.call_press();
        }
    },
});
