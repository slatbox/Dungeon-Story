// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Room = require("room");
const TileManager = require("tile_manager");
const Set = require("Set");
const DecorationTileManager = require("decoration_tile_manager");
const InteractionManager = require("interaction_manager");
const OccupationPrefabManager = require("occupation_prefab_manager");
const DataManager = require("DataManager");
const GameWorld = cc.Class({
    extends: cc.Component,

    properties: {
        tile_set:{
            default:null,
            type:TileManager
        },
        decoration_tile_set:{
            default:null,
            type:DecorationTileManager
        },
        interactions:{
            default:null,
            type:InteractionManager
        },
        occpation_set:{
            default:null,
            type:OccupationPrefabManager
        },

    },
    search_path:function(point)
    {
      for(var i = 0 ; i < this.paths.length;i++)
      {
          if(this.paths[i] == null)
            continue;
          if(this.paths[i].has_element(point))
          {
              return i;
          }
      }  
      return -1;
    },
    init_walls_between_rooms:function()
    {
        this.rooms_map = [];
        var walls = [];
        for(var i = 0; i < 5;i++)
        {
            walls[i] = [];
            for(var j = 0 ; j < 5; j++)
            {
                walls[i][j] = 0;
            }
        }
        for(var i = 1 ; i <= 3;i+=2)
        {
            
            for(var j = 0 ; j < 5;j++)
            {
                walls[i][j] = 1;
            }
        }
        for(var i = 0 ; i < 5;i++)
        {
            for(var j = 1; j <= 3;j+=2)
            {
                walls[i][j] = 1;
            }
        }
        this.paths = [];
        var path_counter = 9;
        var pos = 0;
        for(var i = 0;i <= 4;i+=2)
        {
            for(var j = 0;j<=4;j+=2)
            {
                this.paths[pos] = new Set;
                this.paths[pos++].add_element(new cc.Vec2(i,j)); 
            }
        }
        while(path_counter > 1)
        {
            // var all = [new cc.Vec2(1,2),new cc.Vec2(2,1),new cc.Vec2(2,3),new cc.Vec2(3,2)];
            var real_walls = [];
            var num_of_walls = 0;
            for(var i = 0;i < 5;i+=2)
            {
                for(var j = 1;j <= 3;j+=2)
                {
                    if(walls[i][j] == 1)
                    {
                        real_walls[num_of_walls++] = new cc.Vec2(i,j);
                    }
                }
            }
            for(var i = 1;i<=3;i+=2)
            {
                for(var j = 0;j < 5;j+=2)
                {
                    if(walls[i][j] == 1)
                    {
                        real_walls[num_of_walls++] = new cc.Vec2(i,j);
                    }
                }
            }

            var rand = Math.floor(Math.random() * real_walls.length);
            var rand_wall = real_walls[rand];
            var rand_i = rand_wall.x;
            var rand_j = rand_wall.y;
            if(rand_j%2  != 0)//左右墙
            {
                var left_point = this.search_path(new cc.Vec2(rand_i,rand_j-1));
                var left_path = this.paths[left_point];
                var is_same = left_path.has_element(new cc.Vec2(rand_i,rand_j+1));
                if (!is_same) {
                    
                   var right_point = this.search_path(new cc.Vec2(rand_i,rand_j+1));
                   var right_path = this.paths[right_point];
                   for(var i = 0 ; i < right_path.elements.length;i++)
                   {
                       left_path.add_element(right_path.elements[i]);
                   }
                   this.paths[right_point] = null;
                    walls[rand_i][rand_j] = 0;
                    path_counter--;
                }
            }
            else
            {
                var up_point = this.search_path(new cc.Vec2(rand_i-1,rand_j));
                var down_point = this.search_path(new cc.Vec2(rand_i+1,rand_j));
                var up_path = this.paths[up_point];
                var is_same = up_path.has_element(new cc.Vec2(rand_i+1,rand_j));
                if (!is_same) {
                    var down_path = this.paths[down_point];
                    for(var i = 0 ; i < down_path.elements.length;i++)
                    {
                       up_path.add_element(down_path.elements[i]);
                    }
                   this.paths[down_point] = null;
                    walls[rand_i][rand_j] = 0;
                    path_counter--;
                }
            }
        }
        this.walls = walls;
    },
    is_wall:function(i,j)
    {
        if(i < 0 || i > 4 || j < 0 || j > 4)
        {
            return 0;
        }
        return this.walls[i][j];
    },
    init_rooms:function()
    {
        var rooms_num = 3;

       this.init_walls_between_rooms();
       var rand_i = Math.floor(Math.random()*rooms_num) * 2;
       var rand_j = Math.floor(Math.random()*rooms_num) * 2;
       var up = !this.is_wall(rand_i-1,rand_j);
       var down = !this.is_wall(rand_i+1,rand_j);
       var left = !this.is_wall(rand_i,rand_j - 1);
       var right = !this.is_wall(rand_i,rand_j + 1);
       var start_room = new cc.Node();
       start_room.addComponent(Room).init(up,down,left,right,1,this.tile_set,this.decoration_tile_set,this.interactions);

       start_room.x = 0;
       start_room.y = 0;
       this.current_room = start_room;
       this.node.addChild(start_room);

    },
    init_hero:function()
    {
        var hero_occpation = DataManager.read_obj("occupation").occupation;
        var hero = cc.instantiate(this.occpation_set[hero_occpation]);
        var room = this.current_room.getComponent("room");
        var born_ij_pos = room.born_ij_pos;
        var real_pos = room.convertIJ2Pos(born_ij_pos);
        hero.x = real_pos.x;
        hero.y = real_pos.y;
        hero.getComponent("hero").current_pos = real_pos.clone();
        this.node.addChild(hero);
        this.hero = hero;
    },
    deal_with_touch:function(event_pos)
    {
        var hero = this.hero.getComponent("hero");
        if(this.is_moving == true)
        {
            return;
        }
        else
        {
            var change = function(dt)
            {
                this.is_moving = false;
            };
            this.scheduleOnce(change,hero.moving_time);
        }
        this.is_moving = true;

        var touch_pos = event_pos;
        var local_pos = this.node.convertToNodeSpaceAR(touch_pos);
        
        var current_pos = hero.current_pos;
        var sub_x = local_pos.x - current_pos.x;
        var sub_y = local_pos.y - current_pos.y;
        var current_room = this.current_room.getComponent("room");
        if(Math.abs(sub_x) > Math.abs(sub_y))
        {
            if(sub_x > 0 )
            {
                current_room.move_to(new cc.Vec2(1,0),this.hero);
            }
            else
            {
                current_room.move_to(new cc.Vec2(-1,0),this.hero)
            }
        }
        else 
        {
            if(sub_y > 0 )
            {
                current_room.move_to(new cc.Vec2(0,1),this.hero);
            }
            else
            {
                current_room.move_to(new cc.Vec2(0,-1),this.hero)
            }
        }
        
    },
    onLoad:function()
    {
        this.init_rooms();
        this.init_hero();
        
    },

    
});

module.exports = GameWorld;