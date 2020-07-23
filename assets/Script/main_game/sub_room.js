// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SubRoom = cc.Class({
    properties: {
        left_down :cc.Vec2,
        right_up:cc.Vec2,
        virtual:0,
        ad_rooms:
        {
            default:[],
            type:SubRoom
        },
        gate:[],
        room_type:0
    },
    get_pos_in_front_gate:function()
    {
        var gate = this.gate;
        if(gate.x == this.left_down.x)//down wall
        {
            return new cc.Vec2(gate.x-1,gate.y);
        }
        else if(gate.x == this.right_up.x)//up wall
        {
            return new cc.Vec2(gate.x+1,gate.y);
        }
        else if(gate.y == this.left_down.y) //left wall
        {
            return new cc.Vec2(gate.x,gate.y+1);
        }
        else//(gate.y == sub_room.right_up.y)//right wall
        {
            return new cc.Vec2(gate.x,gate.y-1);
        }
    },
    is_gate:function(v)
    {
        for(var i = 0 ; i < this.gate.length;i++)
        {
            if(v.x == this.gate[i].x && v.y == this.gate[i].y)
            {
                return true;
            }
        }
        return false;
    },
    random_wall_place:function()
    {
        var i_start = this.right_up.y-1;
        var i_end = this.left_down.y+1;
        var j_start = this.left_down.x-1;
        var j_end = this.right_up.x+1;
        var all_place = [];
        // for(var i = i_start+1;i <= i_end-1;i++)
        // {
        //     if(!this.is_gate(new cc.Vec2(i,j_start)))
        //     {
        //         all_place.push(new cc.Vec2(i,j_start));
        //     }
        //    if(!this.is_gate(new cc.Vec2(i,j_end)))
        //    {
        //        all_place.push(new cc.Vec2(i,j_end));
        //    }
        // }
        for(var j = j_start+1;j <= j_end -1;j++)
        {
            if (!this.is_gate(new cc.Vec2(i_start,j))) {
                all_place.push(new cc.Vec2(i_start,j));
            }
            // if (!this.is_gate(new cc.Vec2(i_end,j))) {
            //     all_place.push(new cc.Vec2(i_end,j));
            // }
        }
        var rand = Math.floor(Math.random() * all_place.length);
        return all_place[rand];
    }

    
});

module.exports = SubRoom;
