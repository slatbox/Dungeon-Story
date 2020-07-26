// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const RoomWidth = 13;
const RoomHeight = 9;
const DataManager = cc.Class({
  

    properties: {
        
    },
    statics:
    {
        extract_object_by_keys:function(obj,keys)
        {
            var data = {};
            for(var i = 0 ; i < keys.length;i++)
            {
                data[keys[i]] = obj[keys[i]];
            }
            return data;
        },
        save_obj:function(obj,file_name)
        {
            cc.sys.localStorage.setItem(file_name, JSON.stringify(obj));
        },
        read_obj:function(file_name)
        {
            return JSON.parse(cc.sys.localStorage.getItem(file_name));
        },
        
        extract_node_com:function(node)
        {
            var keys = ['x','y','anchorX','anchorY'];
            return this.extract_object_by_keys(node,keys);
        },
        extract_sprite_com:function(sprite)
        {
            var keys = ['spriteFrame'];
            return this.extract_object_by_keys(sprite,keys);
        },
        extract_creature_com:function(creature)
        {
            var keys = ['HP','AT','DF','SP','MG','LK'];
            return this.extract_object_by_keys(creature,keys);
        },
        extract_hero:function(node)
        {
            var data = {};
            data['node']=this.extract_node_com(node);
            data['sprite'] = this.extract_sprite_com(node.getComponent(cc.Sprite));
            data['creature'] = this.extract_creature_com(node.getComponent('creature'));
            return data;
        },
        save_hero:function(node)
        {
            this.save_obj(this.extract_hero(ndoe),'hero_info');
        },
        extract_game_sprite:function(sprite)
        {
            if(!sprite)
            {
                return null;
            }
            var obj = {
                x:sprite.x,
                y:sprite.y,
                anchorX:sprite.anchorX,
                anchorY:sprite.anchorY,
                name:sprite.name
            };
            return obj;
        },
        save_room:function(room,file_name)
        {
            
            var room_data = {};
            var room_gates = ["up_gate","down_gate","left_gate","right_gate"];
            for(var i = 0 ; i < room_gates.length;i++){
                var gate = room[room_gates[i]];
                if(!gate){
                    continue;
                }
                room_data[room_gates[i]] = {
                    x:gate.x,
                    y:gate.y
                }
            }

            room_data["wall_marks"] = room["wall_marks"];
            room_data["born_ij_pos"] = {
                x:room["born_ij_pos"].x,
                y:room["born_ij_pos"].y
            };
            var sprites_to_save = ["wall_sprites","ground_sprites","interaction_items","actors"];
            for(var k = 0 ; k < sprites_to_save.length;k++){
                var tem = [];
                for(var i = 0 ; i < RoomHeight;i++){
                    tem[i] = [];
                    for(var j = 0 ; j < RoomWidth;j++){
                        tem[i][j] = this.extract_game_sprite(room[sprites_to_save[k]][i][j]);
                    }
                }
                room_data[sprites_to_save[k]] = tem;
            }
            var sub_rooms = [];
            for(var i = 0 ; i < room.sub_rooms.length;i++){
                var each_room = room.sub_rooms[i];
                var to_save = {
                    left_down: {
                        x:each_room.left_down.x,
                        y:each_room.left_down.y
                    },
                    right_up: {
                        x:each_room.right_up.x,
                        y:each_room.right_up.y
                    },
                    virtual: each_room.virtual,
                    room_type: each_room.room_type
                }
                var gate = [];
                for(var j = 0 ; j < each_room.gate.length;j++){
                    var each = {
                        x:each_room.gate[j].x,
                        y:each_room.gate[j].y
                    }
                    gate[j] = each;
                }
                to_save.gate = gate;
                sub_rooms.push(to_save);
            }
            room_data["sub_rooms"] = sub_rooms;

            this.save_obj(room_data,file_name);
        }
    },
    
});

module.exports = DataManager;