/*
 * @Author: Jeffrey.Swen

 * @Date: 2020-08-18 15:56:37
 * @LastEditTime: 2020-08-22 15:23:39
 * @LastEditors: Please set LastEditors
 * 
 * @Description: used to allocate items ,interactions and actors in a room 
 * 
 * 
 * @FilePath: \Dungeon-Story\assets\Script\main_game\object_allocator.js
 */




const InteractionManager = require("interaction_manager");
const ActorPrefabManager = require("actor_prefab_manager");
const OccupationPrefabManager = require("occupation_prefab_manager");
const DataManager = require("DataManager");
const types = require("types");

const SubRoomType = types.SubRoomType;
const TileWidth = types.TileWidth;

const ObjectManager = cc.Class({
    extends: cc.Component,

    properties: {
        interactions_manager:{
            default:null,
            type:InteractionManager
        },
        occpation_set:{
            default:null,
            type:OccupationPrefabManager
        },
        actor_prefab_manager:{
            default:null,
            type:ActorPrefabManager
        },
        // low_parrerns:RoomPattern,
        guard_rate:0.5,

        path_low_rate:0.5,
        path_middle_rate:0.5,
        
        single_middle_rate:0.15,
        single_high_rate:0.7,
        single_special_rate:0.15,

        additional_foe_rate:0.2,

    },
    init_hero:function(game_world)
    {
        var hero_occpation = DataManager.read_obj("occupation").occupation;
        var hero = cc.instantiate(this.occpation_set[hero_occpation]);
        var room = game_world.current_room.getComponent("room");
        var born_ij_pos = room.born_ij_pos;
        var real_pos = room.convertIJ2Pos(born_ij_pos);
        hero.x = real_pos.x;
        hero.y = real_pos.y;
        hero.getComponent("hero").current_pos = real_pos.clone();
        game_world.current_room.addChild(hero);
        game_world.hero = hero;
    },
    set_born_palce:function(room)
    {
        var rooms = room.sub_rooms;
        var born_sub_room;
        for(var i = 0 ; i < rooms.length;i++){
            if(rooms[i].room_type == SubRoomType.path_room || rooms[i].room_type == SubRoomType.big_spare)
            {
                born_sub_room = rooms[i];
                break;
            }
        }
        
        var down_stair = cc.instantiate(room.tile_set.down_stair);
        var random_ij_pos = born_sub_room.random_pos();
        down_stair.x = random_ij_pos.y* room.tile_width;
        down_stair.y = - random_ij_pos.x * room.tile_width;
        down_stair.name = "down_stair";
        room.node.addChild(down_stair);
        room.interactions[random_ij_pos.x][random_ij_pos.y] = down_stair;
        
        room.born_ij_pos = new cc.Vec2(random_ij_pos.x,random_ij_pos.y);
    },

    add_door_to_sub_room:function(sub_room,type,room)
    {
        if(sub_room.virtual == true || type == 'null'){
            return;
        }
        for(var i = 0; i < sub_room.gate.length;i++){
            
            var door;
            if (type == 'normal')
                door = cc.instantiate(this.interactions_manager.unlocked_door);
            else if (type == 'locked')
                door = cc.instantiate(this.interactions_manager.locked_door);
            var x = sub_room.gate[i].x;
            var y = sub_room.gate[i].y;
            var abs_x = TileWidth * y;
            var abs_y = - TileWidth * x;
            door.x = abs_x;
            door.y = abs_y;
            room.node.addChild(door);
            room.interactions[x][y] = door;
        }
    },
    add_foe_to_sub_room:function(sub_room,type,room)
    {
        var level = type[0];
        var gurad = type[1];
        var random_pos;
        if(gurad == "certain")
            random_pos = sub_room.random_gurading_pos();
        else if(gurad =='rate')
            random_pos = sub_room.random_gurading_pos_rate(this.guard_rate);
        
        while(room.is_occupied(random_pos)){
            if(gurad == "certain")
                random_pos = sub_room.random_gurading_pos();
            else if(gurad =='rate')
                random_pos = sub_room.random_gurading_pos_rate(this.guard_rate);
        }
        
        var foe = this.actor_prefab_manager.random_foe(level);
        var foe_pos = room.convertIJ2Pos(random_pos);
        foe.x = foe_pos.x;
        foe.y = foe_pos.y;
        room.node.addChild(foe);
        room.actors[random_pos.x][random_pos.y] = foe;

    },
    add_decoration_interactions:function(sub_room,room)
    {
        if(room.is_full(sub_room))
            return;
        var pos = sub_room.random_pos_beside_wall();
        while(room.is_occupied(pos) || room.is_in_front_of_gate(pos)){
            pos = sub_room.random_pos_beside_wall();
        }
        var deco_inter = this.interactions_manager.random_interaction();
        deco_inter.position = new cc.Vec2(pos.y * TileWidth + 0.5 * TileWidth, - (pos.x * TileWidth + 0.5 * TileWidth));
        room.interactions[pos.x][pos.y] = deco_inter;
        room.node.addChild(deco_inter);
    },
    add_items_to_sub_room:function(sub_room,type,room)
    {
        
        if(type == "null")return;
        var num_of_jar = 0;
        if(type == 'jar')
            num_of_jar = 1;
        else if(type == 'jar_2')
            num_of_jar = 2;
        else if(type == 'jar_3')
            num_of_jar = 3;
        while(num_of_jar--){
            if(room.is_full(sub_room))
                break;
            var pos = sub_room.random_pos();
            while (room.is_occupied(pos)) {
                pos = sub_room.random_pos();
            }
            var jar = this.interactions_manager.create_normal_jar();
            jar.position = new cc.Vec2(pos.y * TileWidth + 0.5 * TileWidth, - (pos.x * TileWidth + TileWidth));
            jar.pos = pos;
            room.interactions[pos.x][pos.y] = jar;
            room.node.addChild(jar);
        }
        
    },
    add_door_to_room:function(room)
    {
        var room_doors = [room.up_gate,room.down_gate,room.left_gate,room.right_gate];
        for(var i = 0 ; i < room_doors.length;i++){
            if(!room_doors[i]) {continue;}
            var gate = cc.instantiate(this.interactions_manager.room_door);
            var x = room_doors[i].x;
            var y = room_doors[i].y;
            gate.anchorX = 0;
            gate.anchorY = 1;
            var abs_x = room.tile_width * y;
            var abs_y = - room.tile_width * x;
            gate.x = abs_x;
            gate.y = abs_y;
            room.node.addChild(gate);
            room.interactions[x][y] = gate;
        }
    },
    allocate_objects_to_sub_room:function(sub_room,pattern,room)
    {
        this.add_door_to_sub_room(sub_room,pattern[0],room);
        this.add_foe_to_sub_room(sub_room,pattern[1],room);
        this.add_items_to_sub_room(sub_room,pattern[2],room);
        this.add_decoration_interactions(sub_room,room);
    },
    allocate_objects:function(room)
    {
        var sub_rooms = room.sub_rooms;
        for(var i = 0 ; i < sub_rooms.length;i++)
        {
            var using_pattern;
            
            if(sub_rooms[i].room_type == SubRoomType.single_room && sub_rooms[i].virtual == false)
                using_pattern = this.random_single_room_pattern();
            else if(sub_rooms[i].room_type == SubRoomType.path_room || sub_rooms[i].virtual == true)
                using_pattern = this.random_path_room_pattern();

            this.allocate_objects_to_sub_room(sub_rooms[i],using_pattern,room);
        }
        this.add_door_to_room(room);
    },
    random_single_room_pattern:function()
    {
        var middle_patterns = this.patterns.single_middle;
        var high_patterns = this.patterns.high;
        var special_patterns = this.patterns.special;
        var rand = Math.random();
        var rates = [this.single_middle_rate,this.single_high_rate,this.single_special_rate];
        var patterns = [middle_patterns,high_patterns,special_patterns];
        for(var i = 0 ; i < rates.length;i++){
            if(rand < rates[i]){
                return patterns[i][Math.floor(Math.random() * patterns[i].length)];
            }
            else{
                rand -= rates[i];
            }
        }
        
    },
    random_path_room_pattern:function()
    {
        var low_patterns = this.patterns.low;
        var middle_patterns = this.patterns.path_middle;
        var rand = Math.random();
        if(rand < this.path_low_rate){
            return low_patterns[Math.floor(Math.random() * low_patterns.length)];
        }
        else{
            return middle_patterns[Math.floor(Math.random() * middle_patterns.length)];
        }
    },
    init:function()
    {
        //pattern format: ['door state',(foe level,is guarding the door),'items' in room]

        var low = [
            ['null',[1,'rate'],'null'],
            ['null',[1,'certain'],'jar'],
        ];
        var path_middle = [
            ['null',[2,'rate'],'null'],
        ];
        var single_middle = [
            ['normal',[2,'certain'],'jar'],
            ['locked',[2,'rate'],'jar'],
            ['locked',[2,'certain'],'jar_2'],
        ]
        var high = [
            ['locked',[3,'certain'],'tool'],
            ['locked',[3,'rate'],'jar_3'],
        ];
        var special = [
            ['locked',[4,'certain'],'tool'],
            ['locked',[4,'rate'],'jar_3'],
        ];
        this.patterns = {
            "low":low,
            "path_middle":path_middle,
            "single_middle":single_middle,
            "high":high,
            "special":special
        };
        
    },


});

module.exports = ObjectManager;