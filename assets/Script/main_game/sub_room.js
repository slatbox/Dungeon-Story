// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const MainHeroStage = require("../GUI/main/main_hero_stage");

const SubRoom = cc.Class({
    properties: {
        left_down :cc.Vec2,
        right_up:cc.Vec2,
        virtual:0,
        gate:[],
        room_type:0
    },
    // // get_pos_in_front_gate:function(test_gate)
    // // {
    // //     if(test_gate.x  == this.left_down.x - 1)//left wall
    // //     {
    // //         return new cc.Vec2(test_gate.x+1,test_gate.y);
    // //     }
    // //     else if(test_gate.x == this.right_up.x+1)//right wall
    // //     {
    // //         return new cc.Vec2(test_gate.x-1,test_gate.y);
    // //     }
    // //     else if(test_gate.y == this.left_down.y - 1) //up wall
    // //     {
    // //         return new cc.Vec2(test_gate.x,test_gate.y+1);
    // //     }
    // //     else//(gate.y == sub_room.right_up.y)//right wall
    // //     {
    // //         return new cc.Vec2(test_gate.x,test_gate.y-1);
    // //     }
    // // },
    // is_in_list:function(pos,List)
    // {
    //     for(var i = 0 ; i < List.length;i++)
    //     {
    //         if(pos.x == List[i].x && pos.y == List[i].y){
    //             return true;
    //         }
    //     }
    //     return false;
    // },
    
    is_in_front_of_gate:function(ij_pos)
    {
        //pos is a ij_pos
        for(var i = 0 ; i < this.gate.length;i++){
            var ij_gate_pos = this.gate[i];
            var coutner = Math.abs(ij_pos.x - ij_gate_pos.x) + Math.abs(ij_pos.y - ij_gate_pos.y);
            if(coutner <= 1){
                return true;
            }
        }
        return false;
    },
    is_gate:function(ij_pos)
    {
        for(var i = 0 ; i < this.gate.length;i++)
        {
            if(ij_pos.x == this.gate[i].x && ij_pos.y == this.gate[i].y)
            {
                return true;
            }
        }
        return false;
    },
    random_pos:function()
    {
        var i_start = this.right_up.x;
        var i_end = this.left_down.x;
        var j_start = this.left_down.y;
        var j_end = this.right_up.y;
        var rand_i = Math.floor(Math.random() * (i_end - i_start + 1)) + i_start;
        var rand_j = Math.floor(Math.random() * (j_end - j_start + 1)) + j_start;
        return new cc.Vec2(rand_i,rand_j);
    }, 
    random_pos_beside_wall:function()
    {
        //return ij_pos
        var i_start = this.right_up.x;
        var i_end = this.left_down.x;
        var j_start = this.left_down.y;
        var j_end = this.right_up.y;
        var valid_pos = [];
        for(var i = i_start;i <= i_end;i++){
            for(var j = j_start;j <= j_end;j++){
                if((i == i_start || i == i_end || j == j_start || j == j_end) &&
                    !this.is_in_front_of_gate(new cc.Vec2(i,j))){
                    valid_pos.push(new cc.Vec2(i,j));
                }
            }
        }
        return valid_pos[Math.floor(Math.random() * valid_pos.length)];
    },
    random_wall_place:function()
    {
        var i_start = this.right_up.x-1;
        var i_end = this.left_down.x+1;
        var j_start = this.left_down.y-1;
        var j_end = this.right_up.y+1;
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
