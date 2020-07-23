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
        save_room:function(room)
        {
            var room_values = [
                "up_gate","down_gate","left_gate","right_gate",
                "tile_set","decoration_tile_set","interactions"
            ]
            var wall_marks = [];
            var wall_sprites = [];
            var ground_sprites = [];
            var gate_sprites = [];
            var actors = [];
            var interaction_items = [];
            for(var i = 0 ; i < RoomHeight;i++){
                for(var j = 0 ; j < RoomWidth;j++){
                    
                }
            }

        }
    },
    
});

module.exports = DataManager;