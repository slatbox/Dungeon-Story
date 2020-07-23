// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const TileManager = require("tile_manager");
const SubRoom = require("sub_room");
const Set = require("Set");
const DecorationTileManager = require("decoration_tile_manager");
const InteractionManager = require("interaction_manager");
const DataManager = require("DataManager");
const TileWidth = 72;
const TileHeight = 72;
const RoomWidth = 13;
const RoomHeight = 9;

const RoomType = cc.Enum({
    born_room:0,
    normal_room:1,
    reward_room:2,
    end_room:3,
    special_room:4
});

const SplitType = cc.Enum({
    column_type:0,
    row_type:1,
    null_type:2
});

const FillType = cc.Enum({
    spare:0,
    rooms:1,
    half_rooms:2,
    maze:3
});

const SubRoomType = cc.Enum({
    big_spare:0,
    path_room:1,
    spare_path:2,
    single_room:3
})

const Room = cc.Class({
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init_empty_room:function()
    {
        var wall_marks = [];
        var wall_sprites = [];
        var ground_sprites = [];
        var gate_sprites = [];
        var actors = [];
        var interaction_items = [];
        for(var i = 0 ; i < RoomHeight;i++)
        {
            wall_marks[i] = [];
            wall_sprites[i] = [];
            ground_sprites[i] = [];
            gate_sprites[i] = [];
            actors[i] = [];
            interaction_items[i] = [];

            for(var j = 0;j < RoomWidth;j++)
            {
                if(i == 0 || i == RoomHeight-1 || j == 0 || j == RoomWidth-1)
                {
                    wall_marks[i][j] = 1;
                }
                else
                {
                    wall_marks[i][j] = 0;
                }
            }
        }
        
        this.wall_marks = wall_marks;
        this.wall_sprites = wall_sprites;
        this.ground_sprites = ground_sprites;
        this.gate_sprites = gate_sprites;
        this.actors = actors;
        this.interaction_items = interaction_items;
        this.sub_rooms = [];

    },
    round_sub_room:function(sub_room)
    {
        if(sub_room.virtual == 1)
        {
            return;
        }
        var i_start = sub_room.right_up.y-1;
        var i_end = sub_room.left_down.y+1;
        var j_start = sub_room.left_down.x-1;
        var j_end = sub_room.right_up.x+1;
        for(var i = i_start;i<=i_end;i++)
        {
            this.wall_marks[i][j_start] = 1;
            this.wall_marks[i][j_end] = 1;
        }
        for(var j = j_start;j<=j_end;j++)
        {
            this.wall_marks[i_start][j] = 1;
            this.wall_marks[i_end][j] = 1;
        }
        for(var i = 0 ; i < sub_room.gate.length;i++)
        {
            this.wall_marks[sub_room.gate[i].y][sub_room.gate[i].x] = 0;
        }
            
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
    set_spare_layout:function()
    {
        var rand_split = Math.floor(Math.random()*3);
        var split_type = rand_split;
        var rand = Math.floor(Math.random()*3);
        if(split_type == SplitType.null_type)
        {

        }
        else if(split_type == SplitType.row_type)
        {
            var middle = Math.floor(RoomHeight/2);
            var wall_length = Math.floor(Math.random()*(RoomWidth/2));
            for(var i = 0;i < wall_length;i++)
            {
                this.wall_marks[middle][i] = 1;
            }
            for(var i = RoomWidth-1;i>=RoomWidth - wall_length;i--)
            {
                this.wall_marks[middle][i] = 1;
            }
        }
        else
        {
            var middle = Math.floor(RoomWidth/2);
            var wall_length = Math.floor(Math.random()*(RoomHeight/2));
            for(var i = 0;i < wall_length;i++)
            {
                this.wall_marks[i][middle] = 1;
            }
            for(var i = RoomHeight -1;i>=RoomHeight - wall_length;i--)
            {
                this.wall_marks[i][middle] = 1;
            }
        }
    },
    set_half_rooms_layout:function()
    {
        
        var split_type = Math.floor(Math.random()*2);
        this.sub_rooms = [];
        if(split_type == SplitType.row_type)
        {
            var sub_room_height = Math.floor(Math.random() *3)+2;
            var sub_rooms_rand = Math.random();
            var hall_room = new SubRoom;
            var is_down = Math.floor(Math.random() * 2);
            var down_y;
            var up_y;
            var gate_y;
            if(is_down)
            {
                down_y = RoomHeight-1-1;
                up_y = down_y-(sub_room_height-1);
                gate_y = up_y-1;
                hall_room.left_down = new cc.Vec2(1,up_y - 2);
                hall_room.right_up = new cc.Vec2(RoomWidth - 2,1);
            }
            else 
            {
                down_y = sub_room_height;
                up_y = 1;
                gate_y = down_y+1;
                hall_room.left_down = new cc.Vec2(1,RoomHeight - 2);
                hall_room.right_up = new cc.Vec2(RoomWidth-2,down_y + 2);
            }
            
            hall_room.virtual = true;
            hall_room.room_type = SubRoomType.big_spare;
            this.sub_rooms.push(hall_room);
            if(sub_rooms_rand <= 0.5)// three rooms
            {
                var sub_room_width = 3;
                var room1 = new SubRoom;
                var room2 = new SubRoom;
                var room3 = new SubRoom;

                var r1 = Math.random();
                var r2 = Math.random();
                var r3 = Math.random();
                if(r1 < 0.3)
                {
                    room1.virtual = 1;
                }
                if(r2 < 0.3)
                {
                    room2.virtual = 1;
                }
                if(r3 < 0.3)
                {
                    room3.virtual = 1;
                }

                hall_room.left_down = new cc.Vec2(1,)
                room1.left_down = new cc.Vec2(1,down_y);
                room1.right_up = new cc.Vec2(sub_room_width,up_y);
                room1.gate = [new cc.Vec2(2,gate_y)];
                room1.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room1);
                
                room2.left_down = new cc.Vec2(sub_room_width+2,down_y);
                room2.right_up = new cc.Vec2(2*sub_room_width+1,up_y);
                room2.gate = [new cc.Vec2(sub_room_width+3,gate_y)];
                room2.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room2);

                
                room3.left_down = new cc.Vec2(2*sub_room_width+3,down_y);
                room3.right_up = new cc.Vec2(3*sub_room_width+2,up_y);
                room3.gate = [new cc.Vec2(2*sub_room_width+4,gate_y)];
                room3.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room3);

            }
            else if(sub_rooms_rand <= 0.75)//two rooms
            {
                var sub_room1_width = Math.floor(Math.random() * 7)+2;
                var rest_width = RoomWidth - 3 - sub_room1_width;
                var room1 = new SubRoom;
                var room2 = new SubRoom;
                var r = Math.random();
                if(sub_room1_width >= rest_width)
                {
                    if(r>=0.7)
                    {
                        room1.virtual = 1;
                    }
                }
                else
                {
                    if(r>=0.7)
                    {
                        room2.virtual = 1;
                    }
                }
                
                room1.left_down = new cc.Vec2(1,down_y);
                room1.right_up = new cc.Vec2(sub_room1_width,up_y);
                var gate_pos1 = Math.floor(Math.random() * sub_room1_width) + 1;
                room1.gate = [new cc.Vec2(gate_pos1,gate_y)];
                room1.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room1);
                
                
                room2.left_down = new cc.Vec2(sub_room1_width+2,down_y);
                room2.right_up = new cc.Vec2(RoomWidth-2,up_y);
                var sub = RoomWidth-2 - sub_room1_width-2;
                var gate_pos2 = Math.floor(Math.random()*(sub))+sub_room1_width+2;
                room2.gate = [new cc.Vec2(gate_pos2,gate_y)];
                room2.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room2);
            }
            else //four rooms
            {
                var r1 = Math.random();
                var r2 = Math.random();
                var r3 = Math.random();
                var r4 = Math.random();

                var sub_room_width = 2;
                var room1 = new SubRoom;
                if(r1<0.2)
                {
                    room1.virtual = 1;
                }
                room1.left_down = new cc.Vec2(1,down_y);
                room1.right_up = new cc.Vec2(sub_room_width,up_y);
                room1.gate = [new cc.Vec2(1,gate_y)];
                room1.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room1);

                var room2 = new SubRoom;
                if(r2<0.2)
                {
                    room2.virtual = 1;
                }
                room2.left_down = new cc.Vec2(sub_room_width+2,down_y);
                room2.right_up = new cc.Vec2(2*sub_room_width+1,up_y);
                room2.gate = [new cc.Vec2(sub_room_width+2,gate_y)];
                room2.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room2);

                var room3 = new SubRoom;
                if(r3<0.2)
                {
                    room3.virtual = 1;
                }
                room3.left_down = new cc.Vec2(2*sub_room_width+3,down_y);
                room3.right_up = new cc.Vec2(3*sub_room_width+2,up_y);
                room3.gate = [new cc.Vec2(2*sub_room_width+3,gate_y)];
                room3.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room3);

                var room4 = new SubRoom;
                if(r4<0.2)
                {
                    room4.virtual = 1;
                }
                room4.left_down = new cc.Vec2(3*sub_room_width+4,down_y);
                room4.right_up = new cc.Vec2(4*sub_room_width+3,up_y);
                room4.gate = [new cc.Vec2(3*sub_room_width+4,gate_y)];
                room4.room_type = SubRoomType.single_room;
                this.sub_rooms.push(room4);

            }
        }
        else 
        {
            var sub_room_width = Math.floor(Math.random()*4)+2;
            var is_right = Math.floor(Math.random()*2);
            var hall_room = new SubRoom;
            var left_x;
            var right_x;
            var gate_x;
            if(is_right)
            {
                right_x = RoomWidth-2;
                left_x = right_x- sub_room_width+1;
                gate_x = left_x-1;
                hall_room.left_down = new cc.Vec2(1,RoomHeight - 2);
                hall_room.right_up = new cc.Vec2(left_x - 2,1);

            }
            else 
            {
                left_x = 1;
                right_x = left_x + sub_room_width-1;
                gate_x = right_x+1;
                hall_room.left_down = new cc.Vec2(right_x + 2,RoomHeight - 2);
                hall_room.right_up = new cc.Vec2(RoomWidth - 2,1);
            }
            hall_room.virtual = true;
            hall_room.room_type = SubRoomType.big_spare;
            this.sub_rooms.push(hall_room);
            
            var sub_room_height = Math.floor(Math.random() * 2) + 3;
            var room1 = new SubRoom;
            var room2 = new SubRoom;


            room1.left_down = new cc.Vec2(left_x, sub_room_height);
            room1.right_up = new cc.Vec2(right_x, 1);
            var y_pos = Math.floor(Math.random() * sub_room_height)+1;
            room1.gate = [new cc.Vec2(gate_x,y_pos)];
            room1.room_type = SubRoomType.single_room;
            this.sub_rooms.push(room1);


            room2.left_down = new cc.Vec2(left_x, RoomHeight - 2);
            room2.right_up = new cc.Vec2(right_x, sub_room_height + 2);
            var sub = RoomHeight-2- sub_room_height-2+1;
            var y_pos2 = Math.floor(Math.random()*sub)+sub_room_height+2;
            room2.gate = [new cc.Vec2(gate_x,y_pos2)];
            room2.room_type = SubRoomType.single_room;
            this.sub_rooms.push(room2);
        }
    
        for(var i = 0 ; i < this.sub_rooms.length;i++)
        {
            this.round_sub_room(this.sub_rooms[i]);
        }
    },
    set_rooms_layout:function()
    {

        var sub_room_height = Math.floor(Math.random() * 3) + 2;
        var sub_rooms_rand = 0.5;//Math.random();
        this.sub_rooms = [];
        var down_y;
        var up_y;
        var gate_y;

        down_y = RoomHeight - 1 - 1;
        up_y = down_y - (sub_room_height - 1);
        gate_y = up_y - 1;

        var sub_room_width = 3;
        var room1 = new SubRoom;
        var room2 = new SubRoom;
        var room3 = new SubRoom;

        var up_room1 = new SubRoom;
        var up_room2 = new SubRoom;
        var up_room3 = new SubRoom;

        var r1 = Math.random();
        var r2 = Math.random();
        var r3 = Math.random();

        var r4 = Math.random();
        var r5 = Math.random();
        var r6 = Math.random();

        var space_rate = 0.3;
        if (r1 < space_rate) {
            room1.virtual = 1;
        }
        if (r2 < space_rate) {
            room2.virtual = 1;
        }
        if (r3 < space_rate) {
            room3.virtual = 1;
        }
        if (r4 < space_rate) {
            up_room1.virtual = 1;
        }
        if (r5 < space_rate) {
            up_room2.virtual = 1;
        }
        if (r6 < space_rate) {
            up_room3.virtual = 1;
        }

        room1.left_down = new cc.Vec2(1, down_y);
        room1.right_up = new cc.Vec2(sub_room_width, up_y);
        this.sub_rooms.push(room1);

        up_room1.left_down = new cc.Vec2(1, up_y - 2);
        up_room1.right_up = new cc.Vec2(sub_room_width, 1);
        this.sub_rooms.push(up_room1);

        room2.left_down = new cc.Vec2(sub_room_width + 2, down_y);
        room2.right_up = new cc.Vec2(2 * sub_room_width + 1, up_y);
        this.sub_rooms.push(room2);

        up_room2.left_down = new cc.Vec2(sub_room_width + 2, up_y - 2);
        up_room2.right_up = new cc.Vec2(2 * sub_room_width + 1, 1);
        this.sub_rooms.push(up_room2);

        room3.left_down = new cc.Vec2(2 * sub_room_width + 3, down_y);
        room3.right_up = new cc.Vec2(3 * sub_room_width + 2, up_y);
        this.sub_rooms.push(room3);

        up_room3.left_down = new cc.Vec2(2 * sub_room_width + 3, up_y - 2);
        up_room3.right_up = new cc.Vec2(3 * sub_room_width + 2, 1);
        this.sub_rooms.push(up_room3);

        var up_gate_y = Math.floor(Math.random() * (up_y - 2 - 1 + 1)) + 1;
        var down_gate_y = Math.floor(Math.random() * (down_y - up_y + 1)) + up_y;
        var walls = [
            [0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 0, 1, 0]
        ];
        var gate_pos = [
            [0, new cc.Vec2(sub_room_width + 1, up_gate_y), 0, new cc.Vec2(2 * sub_room_width + 2, up_gate_y), 0],
            [new cc.Vec2(2, gate_y), 0, new cc.Vec2(sub_room_width + 3, gate_y), 0, new cc.Vec2(2 * sub_room_width + 4, gate_y)],
            [0, new cc.Vec2(sub_room_width + 1, down_gate_y), 0, new cc.Vec2(2 * sub_room_width + 2, down_gate_y), 0]
        ];
        var rooms = [
            [up_room1, 0, up_room2, 0, up_room3],
            [0, 0, 0, 0, 0],
            [room1, 0, room2, 0, room3]
        ]
        var rooms_pos = [new cc.Vec2(0, 0), new cc.Vec2(0, 2), new cc.Vec2(0, 4), new cc.Vec2(2, 0), new cc.Vec2(2, 2), new cc.Vec2(2, 4)];
        var sets = [];
        for (var i = 0; i < 6; i++) {
            sets[i] = new Set;
            sets[i].add_element(rooms_pos[i].clone());
        }
        this.paths = sets;
        var path_counter = 6;
        while (path_counter > 1) {
            var real_walls = [];
            var pos = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 5; j++) {
                    if (!(i == 1 && j == 1) && !(i == 1 && j == 3) && walls[i][j] == 1) {
                        real_walls[pos++] = new cc.Vec2(i, j);
                    }
                }
            }
            var rand = Math.floor(Math.random() * real_walls.length);
            var rand_wall = real_walls[rand];
            var rand_i = rand_wall.x;
            var rand_j = rand_wall.y;
            if (rand_j % 2 != 0)//左右墙
            {
                var left_point = this.search_path(new cc.Vec2(rand_i, rand_j - 1));
                var left_path = this.paths[left_point];
                var is_same = left_path.has_element(new cc.Vec2(rand_i, rand_j + 1));
                if (!is_same) {

                    var right_point = this.search_path(new cc.Vec2(rand_i, rand_j + 1));
                    var right_path = this.paths[right_point];
                    for (var i = 0; i < right_path.elements.length; i++) {
                        left_path.add_element(right_path.elements[i]);
                    }
                    this.paths[right_point] = null;
                    walls[rand_i][rand_j] = 0;
                    path_counter--;
                }
            }
            else {
                var up_point = this.search_path(new cc.Vec2(rand_i - 1, rand_j));
                var down_point = this.search_path(new cc.Vec2(rand_i + 1, rand_j));
                var up_path = this.paths[up_point];
                var is_same = up_path.has_element(new cc.Vec2(rand_i + 1, rand_j));
                if (!is_same) {
                    var down_path = this.paths[down_point];
                    for (var i = 0; i < down_path.elements.length; i++) {
                        up_path.add_element(down_path.elements[i]);
                    }
                    this.paths[down_point] = null;
                    walls[rand_i][rand_j] = 0;
                    path_counter--;
                }
            }
        }
        for (var i = 0; i < 3; i += 2) {
            for (var j = 1; j < 5; j += 2) {
                if (walls[i][j] == 0) {
                    rooms[i][j - 1].gate.push(gate_pos[i][j].clone());
                    rooms[i][j + 1].gate.push(gate_pos[i][j].clone());
                }
            }
        }
        for (var j = 0; j < 5; j += 2) {
            if (walls[1][j] == 0) {
                rooms[0][j].gate.push(gate_pos[1][j].clone());
                rooms[2][j].gate.push(gate_pos[1][j].clone());
            }
        }
        for(var i = 0; i < this.sub_rooms.length;i++){
            if(this.sub_rooms[i].gate.length > 1){
                this.sub_rooms[i].room_type = SubRoomType.path_room;
            }
            else{
                this.sub_rooms[i].room_type = SubRoomType.single_room;
            }
        }
        for(var i = 0 ; i < this.sub_rooms.length;i++){
            this.round_sub_room(this.sub_rooms[i]);
        }

    },
    set_maze_layout:function()
    {
        
        var walls = [];
        
        for(var i = 1;i <= 7;i++)
        {
            walls[i] = [];
            for(var j = 1;j<=11;j++)
            {
                walls[i][j] = 0;
            }
        }
       for(var i = 2; i <= 6;i+=2)
       {
           for(var j = 1; j <=11;j++)
           {
               walls[i][j] = 1;
           }
       }
       for(var j = 2; j <= 10;j+=2)
       {
           for(var i = 1;i <= 7;i++)
           {
               walls[i][j] = 1;
           }
       }
        this.paths = [];
        var path_counter = 24;
        var pos = 0;
        for(var i = 1;i <= 7;i+=2)
        {
            for(var j = 1;j<=11;j+=2)
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
            for(var i = 1;i <= 7;i+=2)
            {
                for(var j = 2;j<=10;j+=2)
                {
                    if(walls[i][j] == 1)
                    {
                        real_walls[num_of_walls++] = new cc.Vec2(i,j);
                    }
                }
            }
            for(var i = 2;i<=6;i+=2)
            {
                for(var j = 1;j<=11;j+=2)
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
            if(rand_j%2  == 0)//左右墙
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

        
        for(var i = 1;i <= 7;i++)
        {
            for(var j = 1;j<=11;j+=1)
            {
                if(walls[i][j] == 1)
                {
                    this.wall_marks[i][j] = 1;
                }
            }
        }
        this.paths = null;
    
    },
    create_normal_room:function()
    {
        this.init_empty_room();
        var type_rand = Math.random();
        if(type_rand <= 0.6)
        {
            this.set_rooms_layout()
        }
        else if(type_rand <= 0.8)
        {
            this.set_half_rooms_layout();
        }
        else if(type_rand <= 0.9)
        {
            this.set_spare_layout();
        }
        else 
        {
            this.set_maze_layout();
        }
        this.draw_room();
    },
    is_wall:function(i,j)
    {
        if(i < 0 || i > RoomHeight-1 || j < 0 || j > RoomWidth-1)
        {
            return 0;
        }
        if(this.wall_marks[i][j])
        {
            return 1;
        }
        else 
        {
            return 0;
        }
    },
    draw_wall:function(i,j)
    {
        var frame;
                    
        var up = this.is_wall(i-1,j);
        var down = this.is_wall(i+1,j);
        var left = this.is_wall(i,j-1);
        var right= this.is_wall(i,j+1);

        var middle_x = (!up && !down && left &&right);
        var middle_y =  (up && down && !left &&!right);
        var left_up = (!up && down && !left &&right);
        var right_up = (!up && down && left &&!right);
        var left_down = (up && !down && !left &&right);
        var right_down = (up && !down && left &&!right);
        var corss = (up && down && left &&right);
        var cross_up = (up && !down && left &&right);
        var cross_down = (!up && down && left &&right);
        var corss_left = (up && down && left &&!right);
        var corss_right = (up && down && !left &&right);
        
        var left_wall = (!up && !down && !left &&right);
        var right_wall = (!up && !down && left &&!right);
        var up_wall = (!up && down && !left &&!right);
        var down_wall = (up && !down && !left &&!right);

        var single = (!up && !down && !left &&!right);

        var frame;
        var break_rate = 0.1;
        if(middle_x)
        {
            frame = this.tile_set.middle_x;
            var rand = Math.random();
            if(rand < break_rate)
            {
                frame = this.tile_set.middle_x_break;
            }
        }
        else if(middle_y)
        {
            frame = this.tile_set.middle_y;
            var rand = Math.random();
            if(rand < break_rate)
            {
                frame = this.tile_set.middle_y_break;
            }
        }
        else if(left_up)
        {
            frame = this.tile_set.left_up;
        }
        else if(right_up)
        {
            frame = this.tile_set.right_up;
        }
        else if(left_down)
        {
            frame = this.tile_set.left_down;
        }
        else if(right_down)
        {
            frame = this.tile_set.right_down;
        }
        else if(corss)
        {
            frame = this.tile_set.cross;
        }
        else if(corss_left)
        {
            frame = this.tile_set.left_cross;
        }
        else if(corss_right)
        {
            frame = this.tile_set.right_cross;
        }
        else if(cross_up)
        {
            frame = this.tile_set.up_cross;
        }
        else if(cross_down)
        {
            frame = this.tile_set.down_cross;
        }
        else if(left_wall)
        {
            frame = this.tile_set.left;
        }
        else if(right_wall)
        {
            frame = this.tile_set.right;
        }
        else if(up_wall)
        {
            frame = this.tile_set.up;
        }
        else if(down_wall)
        {
            frame = this.tile_set.down;
        }
        else if(single)
        {
            frame = this.tile_set.single;
        }


        var wall = new cc.Node();
        wall.addComponent(cc.Sprite).spriteFrame = frame;
        wall.anchorX = 0;
        wall.anchorY = 1;
        wall.x = j * wall.width;
        wall.y = -i * wall.height;
        this.node.addChild(wall);
        this.wall_sprites[i][j] = wall;
    },
    is_gate:function(i,j)
    {
        for(var i = 0 ; i < this.gates;i++)
        {
            if(this.gates[i].x == j && this.gates[i].y == i)
            {
                return true;
            }
        }
        return false;
    },
    set_gates:function()
    {
        if(this.up_gate != null)
        {
            var pos = this.up_gate;
            if(this.wall_marks[pos.y+1][pos.x] == 1)
            {
                var rand = Math.random();
                if(rand < 0.5)
                {
                    this.up_gate = new cc.Vec2(pos.x + 1,pos.y);
                }
                else 
                {
                    this.up_gate = new cc.Vec2(pos.x - 1,pos.y);
                }
            }
            pos = this.up_gate;
            this.wall_marks[pos.y][pos.x] = 0;
        }
        if(this.down_gate != null)
        {
            var pos = this.down_gate;
            if(this.wall_marks[pos.y-1][pos.x] == 1)
            {
                var rand = Math.random();
                if(rand < 0.5)
                {
                    this.down_gate = new cc.Vec2(pos.x + 1,pos.y);
                }
                else 
                {
                    this.down_gate = new cc.Vec2(pos.x - 1,pos.y);
                }
            }
            pos = this.down_gate;
            this.wall_marks[pos.y][pos.x] = 0;
        }
        if(this.left_gate != null)
        {
            var pos = this.left_gate;
            if(this.wall_marks[pos.y][pos.x+1] == 1)
            {
                var rand = Math.random();
                if(rand < 0.5)
                {
                    this.left_gate = new cc.Vec2(pos.x,pos.y+1);
                }
                else 
                {
                    this.left_gate = new cc.Vec2(pos.x,pos.y-1);
                }
            }
            pos = this.left_gate;
            this.wall_marks[pos.y][pos.x] = 0;
        }
        if(this.right_gate != null)
        {
            var pos = this.right_gate;
            if(this.wall_marks[pos.y][pos.x-1] == 1)
            {
                var rand = Math.random();
                if(rand < 0.5)
                {
                    this.right_gate = new cc.Vec2(pos.x,pos.y+1);
                }
                else 
                {
                    this.right_gate = new cc.Vec2(pos.x,pos.y-1);
                }
            }
            pos = this.right_gate;
            this.wall_marks[pos.y][pos.x] = 0;
        }
    },
    draw_ground:function(i,j)
    {
        var grounds = [this.tile_set.ground1,this.tile_set.ground2,this.tile_set.ground3];
        var rand_gnd = Math.floor(Math.random()*grounds.length);
        var frame = grounds[rand_gnd];
    
        var gnd = new cc.Node();
        gnd.addComponent(cc.Sprite).spriteFrame = frame;
        
        gnd.anchorX = 0;
        gnd.anchorY = 1;
        gnd.x = j*gnd.width;
        gnd.y = -i*gnd.height;
        if(this.is_wall(i-1,j))
        {
            var shadow = new cc.Node();
            shadow.addComponent(cc.Sprite).spriteFrame = this.decoration_tile_set.up_shadow[1];
            shadow.anchorX = 0;
            shadow.anchorY = 1;
            shadow.x = 0;
            shadow.y = 0;
            gnd.addChild(shadow);
        }
        this.node.addChild(gnd);
        this.ground_sprites[i][j] = gnd;
    },
    draw_room:function()
    {
        
        //生成地砖
        for(var i = 0 ; i < RoomHeight;i++)
        {
            for(var j = 0;j < RoomWidth;j++)
            {
                this.draw_ground(i,j);
            }
        }
        //生成墙
        for(var i = 0;i < RoomHeight;i++)
        {
            for(var j = 0;j<RoomWidth;j++)
            {
                if(this.wall_marks[i][j] == 1)
                {
                    this.draw_wall(i,j);
                }
                
            }
        }
        
    },
    decorate_maze_room:function()
    {
        var i_start = 1;
        var i_end = RoomHeight - 2;
        var j_start = 1;
        var j_end = RoomWidth - 2;
        var decoration_num = 5;
        var blank = [];
        for(var i = i_start; i <= i_end; i++){
            for(var j = j_start;j <= j_end;j++){
                if(this.wall_marks[i][j] == 0){
                    blank.push(new cc.Vec2(i,j));
                }
            }
        }
        
        var bones = this.decoration_tile_set.bones;
        while(decoration_num--){
            var rand_index = Math.floor(Math.random() * blank.length);
            var bone = new cc.Node();
            bone.addComponent(cc.Sprite).spriteFrame = bones[Math.floor(Math.random() * bones.length)];
            bone.anchorX = 0;
            bone.anchorY = 1;
            bone.x = 0;
            bone.y = 0;
            var pos = blank[rand_index];
            this.ground_sprites[pos.x][pos.y].addChild(bone);
        }
    },
    decorate_single_room:function(sub_room)
    {
        // var front_gate = this.get_pos_in_front_gate(sub_room);
        var i_start = sub_room.right_up.y;
        var i_end = sub_room.left_down.y;
        var j_start = sub_room.left_down.x;
        var j_end = sub_room.right_up.x;
        //gnd
        if(sub_room.virtual == 0)
        {
            //装饰地面/地板
            for (var i = i_start; i <= i_end; i++) {
                for (var j = j_start; j <= j_end; j++) {
                    var gnd_frames = this.tile_set.small_room_gnd;
                    var rand_frame = gnd_frames[Math.floor(Math.random() * gnd_frames.length)];
                    var old_gnd = this.ground_sprites[i][j];
                    old_gnd.getComponent(cc.Sprite).spriteFrame = rand_frame;
                }
            }
            for(var i = 0 ; i < sub_room.gate.length;i++)
            {
                var gnd_frames = this.tile_set.small_room_gnd;
                var rand_frame = gnd_frames[Math.floor(Math.random() * gnd_frames.length)];
                var pos_i = sub_room.gate[i].y;
                var pos_j = sub_room.gate[i].x;
                var old_gnd = this.ground_sprites[pos_i][pos_j];
                old_gnd.getComponent(cc.Sprite).spriteFrame = rand_frame;
            }
            //地面装饰品
            var bones_min = 1;
            var bones_max = 4;
            var bones = this.decoration_tile_set.bones;
            var counter = Math.floor(Math.random() * (bones_max - bones_min + 1))+bones_min;
            while(counter-- >= bones_min)
            {
                var bone = new cc.Node();
                bone.addComponent(cc.Sprite).spriteFrame = bones[Math.floor(Math.random() * (bones_max - bones_min+1) )+bones_min];
                bone.anchorX = 0;
                bone.anchorY = 1;
                bone.x = 0;
                bone.y = 0;

                var rand_i = Math.floor(Math.random() * (i_end- i_start + 1))+i_start;
                var rand_j = Math.floor(Math.random() * (j_end - j_start + 1)) + j_start;
                this.ground_sprites[rand_i][rand_j].addChild(bone);
            }
            //torch
            var torch_rate = 0.5;
            var rand = Math.random();
            if(rand <= torch_rate)
            {
                var torch = cc.instantiate(this.decoration_tile_set.torch);
                torch.x = 0.5 * this.wall_sprites[0][0].width;
                torch.y = - torch.height - 15;
                torch.anchorX = 0.5;
                torch.anchorY = 0;
                var pos = sub_room.random_wall_place();
                if(this.wall_sprites[pos.x][pos.y]){
                    this.wall_sprites[pos.x][pos.y].addChild(torch);
                }
            }
            
        }
    },
    decorate_path_room:function(sub_room)
    {
        var i_start = sub_room.right_up.y;
        var i_end = sub_room.left_down.y;
        var j_start = sub_room.left_down.x;
        var j_end = sub_room.right_up.x;
        if(sub_room.virtual == 0)
        {
            //装饰地面/地板
            var rand = Math.random();
            if(rand < 0.5){
                for (var i = i_start; i <= i_end; i++) {
                    for (var j = j_start; j <= j_end; j++) {
                        var gnd_frames =this.tile_set.big_room_gnd;
                        var rand_frame = gnd_frames[Math.floor(Math.random() * gnd_frames.length)];
                        var old_gnd = this.ground_sprites[i][j];
                        old_gnd.getComponent(cc.Sprite).spriteFrame = rand_frame;
                    }
                }
                for(var i = 0 ; i < sub_room.gate.length;i++)
                {
                    var gnd_frames = this.tile_set.big_room_gnd;
                    var rand_frame = gnd_frames[Math.floor(Math.random() * gnd_frames.length)];
                    var pos_i = sub_room.gate[i].y;
                    var pos_j = sub_room.gate[i].x;
                    var old_gnd = this.ground_sprites[pos_i][pos_j];
                    old_gnd.getComponent(cc.Sprite).spriteFrame = rand_frame;
                }
            }
            
            //地面装饰品
            var bones_min = 1;
            var bones_max = 2;
            var bones = this.decoration_tile_set.bones;
            var counter = Math.floor(Math.random() * (bones_max - bones_min + 1))+bones_min;
            while(counter-- >= bones_min)
            {
                var bone = new cc.Node();
                bone.addComponent(cc.Sprite).spriteFrame = bones[Math.floor(Math.random() * (bones_max - bones_min+1) )+bones_min];
                bone.anchorX = 0;
                bone.anchorY = 1;
                bone.x = 0;
                bone.y = 0;

                var rand_i = Math.floor(Math.random() * (i_end- i_start + 1))+i_start;
                var rand_j = Math.floor(Math.random() * (j_end - j_start + 1)) + j_start;
                this.ground_sprites[rand_i][rand_j].addChild(bone);
            }
            
        }
    },
    decorate_big_spare_room:function(sub_room)
    {

    },
    decorate_sub_room:function(sub_room)
    {
        if(sub_room.room_type == SubRoomType.single_room)
        {
            this.decorate_single_room(sub_room);
        }
        else if(sub_room.room_type == SubRoomType.path_room)
        {
            this.decorate_path_room(sub_room);
        }
        else if(sub_room.room_type == SubRoomType.big_spare)
        {
            this.decorate_big_spare_room(sub_room);
        }
    },
    decorate_all_sub_rooms:function()
    {
        var rooms = this.sub_rooms;
        for(var i = 0 ; i < rooms.length;i++)
        {
            this.decorate_sub_room(rooms[i]);
        }
    },
    add_interaction_single_room:function(sub_room)
    {
        //add gates
        if (sub_room.virtual == 0) {
            for (var i = 0; i < sub_room.gate.length; i++) {
                var gate = cc.instantiate(this.interactions.wood_door);
                var x = sub_room.gate[i].x;
                var y = sub_room.gate[i].y;
                var abs_x = TileWidth * x;
                var abs_y = - TileHeight * y;
                gate.x = abs_x;
                gate.y = abs_y;
                this.node.addChild(gate);
                this.interaction_items[y][x] = gate;
            }
        }
    },
    add_interaction:function(sub_room)
    {
        if(sub_room.room_type == SubRoomType.single_room)
        {
            this.add_interaction_single_room(sub_room);
        }
    },
    add_interactions_to_all_sub_rooms:function()
    {
        var rooms = this.sub_rooms;
        for(var i = 0 ; i < rooms.length;i++)
        {
            this.add_interaction(rooms[i]);
        }
    },
    move_to:function(direction,hero)
    {
        var absolute_pos = hero.getComponent("hero").current_pos;
        var absolute_ij_pos = this.convertPos2IJ(absolute_pos);
        var final = new cc.Vec2(absolute_ij_pos.x - direction.y,absolute_ij_pos.y + direction.x);

        var i = final.x;
        var j = final.y;
        if(this.wall_marks[i][j] == 1)
        {
            hero.getComponent("hero").charge(direction);
        }
        else if(this.actors[i][j] != null)
        {

        }
        else if(this.interaction_items[i][j] != null)
        {
            
            this.interaction_items[i][j].getComponent(this.interaction_items[i][j].name).act(hero,direction);
        }
        else // empty
        {
            hero.getComponent("hero").move(direction);
        }
    },
    convertPos2IJ:function(pos)
    {
        var j = Math.floor((pos.x + 10)/TileWidth);
        var i = Math.floor((-pos.y - 10)/TileHeight);
        return new cc.Vec2(i,j);
    },
    convertIJ2Pos:function(ij_pos)
    {
        var i = ij_pos.x;
        var j = ij_pos.y;
        var x = j * TileWidth + 0.5 * TileWidth;
        var y = -((i + 1 ) * TileHeight);
        return new cc.Vec2(x,y);
    },
    convertDraw2IJ:function(pos)
    {
        return new cc.Vec2(pos.y,pos.x);
    },
    init_as_normal_room:function()
    {
        this.init_empty_room();
        this.set_rooms_layout();
        this.set_gates();
        this.draw_room();
        this.decorate_all_sub_rooms();
        this.add_interactions_to_all_sub_rooms();
    },
    init_as_born_room:function()
    {
        this.init_empty_room();
        this.set_rooms_layout();
        this.set_gates();
        this.draw_room();
        this.decorate_all_sub_rooms();
        //set random born place
        var rooms = this.sub_rooms;
        var born_sub_room;
        for(var i = 0 ; i < rooms.length;i++){
            if(rooms[i].room_type == SubRoomType.path_room || rooms[i].room_type == SubRoomType.big_spare)
            {
                born_sub_room = rooms[i];
                break;
            }
        }
        var i_start = born_sub_room.right_up.y; 
        var i_end = born_sub_room.left_down.y;
        var j_start = born_sub_room.left_down.x;
        var j_end = born_sub_room.right_up.x;
        var rand_i = Math.floor(Math.random() *(i_end - i_start + 1)) + i_start;
        var rand_j = Math.floor(Math.random() * (j_end - j_start + 1)) + j_start;
        var down_stair = cc.instantiate(this.tile_set.down_stair);
        down_stair.x = rand_j* TileWidth;
        down_stair.y = - rand_i * TileHeight;
        this.node.addChild(down_stair);
        this.interaction_items[rand_i][rand_j] = down_stair;
        //
        this.add_interactions_to_all_sub_rooms();
        this.born_ij_pos = new cc.Vec2(rand_i,rand_j);
    },
    init:function(up,down,left,right,is_new,tile_set,decoration_tile_set,interactions)
    {
        if (is_new) {
            var rand_i_left = Math.floor(Math.random() * (RoomHeight - 2)) + 1;
            var rand_i_right = Math.floor(Math.random() * (RoomHeight - 2)) + 1;
            var rand_j_up = Math.floor(Math.random() * (RoomWidth - 2)) + 1;
            var rand_j_down = Math.floor(Math.random() * (RoomWidth - 2)) + 1;

            if (up) {
                this.up_gate = new cc.Vec2(rand_j_up, 0);
            }
            if (down) {
                this.down_gate = new cc.Vec2(rand_j_down, RoomHeight - 1);
            }
            if (left) {
                this.left_gate = new cc.Vec2(0, rand_i_left);
            }
            if (right) {
                this.right_gate = new cc.Vec2(RoomWidth - 1, rand_i_right);
            }
        }
        this.tile_set = tile_set;
        this.decoration_tile_set = decoration_tile_set;
        this.interactions = interactions;

        this.init_as_born_room();
    },
    onLoad:function()
    {
        
    }

    
});

module.exports = Room;