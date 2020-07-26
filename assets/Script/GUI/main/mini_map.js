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
        game_world:{
            default:null,
            type:GameWorld
        },
        room_bar:cc.SpriteFrame,
        room_block:cc.SpriteFrame,
        room_gap:0
    },
    create_probe_bar:function()
    {
        var bar = new cc.Node();
        bar.addComponent(cc.Sprite).spriteFrame = this.room_bar;
        bar.color = cc.Color.GRAY;
        return bar;
    },
    onLoad:function()
    {
        this.rooms = [];
        for(var i = 0; i < 3;i++){
            this.rooms[i] = [];
            for(var j = 0 ; j < 3;j++){
                var each_room = new cc.Node();
                each_room.addComponent(cc.Sprite).spriteFrame = this.room_block;
                each_room.y = (1 - i) * (each_room.height + this.room_gap);
                each_room.x = (j - 1) * (each_room.width + this.room_gap);
                each_room.active = false;
                each_room.color = cc.Color.GRAY;
                this.node.addChild(each_room);
                this.rooms[i][j] = each_room;
            }
        }

        var current_pos = this.game_world.current_pos;
        this.rooms[current_pos.x][current_pos.y].active = true;
        this.current_pos = current_pos;
        this.set_current(current_pos);
    },
    set_current:function(pos)
    {
        this.rooms[this.current_pos.x][this.current_pos.y].color = cc.Color.GRAY;
        this.rooms[pos.x][pos.y].color = cc.Color.GREEN;
        this.current_pos = pos;;
        this.probe_room(pos);
    },
    probe_room:function(pos)
    {
        if(this.game_world.is_adjacient(pos,new cc.Vec2(pos.x-1,pos.y))){
            this.rooms[pos.x-1][pos.y].active = 1;
            var bar = this.create_probe_bar();
            bar.anchorX = 0.5;
            bar.anchorY = 0;
            bar.x = this.rooms[pos.x][pos.y].x;
            bar.y = this.rooms[pos.x][pos.y].y + this.rooms[pos.x][pos.y].width * 0.5;
            this.node.addChild(bar);
        }
        if(this.game_world.is_adjacient(pos,new cc.Vec2(pos.x+1,pos.y))){
            this.rooms[pos.x+1][pos.y].active = 1;
            var bar = this.create_probe_bar();
            bar.anchorX = 0.5;
            bar.anchorY = 1;
            bar.x = this.rooms[pos.x][pos.y].x;
            bar.y = this.rooms[pos.x][pos.y].y - this.rooms[pos.x][pos.y].width * 0.5;
            this.node.addChild(bar);
        }
        if(this.game_world.is_adjacient(pos,new cc.Vec2(pos.x,pos.y-1))){
            this.rooms[pos.x][pos.y-1].active = 1;
            var bar = this.create_probe_bar();
            bar.anchorX = 0.5;
            bar.anchorY = 0;
            bar.angle = 90;
            bar.x = this.rooms[pos.x][pos.y].x - this.rooms[pos.x][pos.y].width * 0.5;
            bar.y = this.rooms[pos.x][pos.y].y;
            this.node.addChild(bar);
        }
        if(this.game_world.is_adjacient(pos,new cc.Vec2(pos.x,pos.y+1))){
            this.rooms[pos.x][pos.y+1].active = 1;
            var bar = this.create_probe_bar();
            bar.anchorX = 0.5;
            bar.anchorY = 0;
            bar.angle = -90;
            bar.x = this.rooms[pos.x][pos.y].x + this.rooms[pos.x][pos.y].width * 0.5;
            bar.y = this.rooms[pos.x][pos.y].y;
            this.node.addChild(bar);
        }
    },

    
    
});
