/*
 * @Author: your name
 * @Date: 2020-08-18 16:29:39
 * @LastEditTime: 2020-08-22 16:46:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\main_game\room_types.js
 */


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
const TileWidth = 72;
const ToolTypes = cc.Enum({
    arm_main:0,
    arm_asis:1,
    tool:2,
    hp:3,
    df:4,
    lk:5,
    sp:6
});
module.exports = {
    RoomType,
    SplitType,
    FillType,
    SubRoomType,
    TileWidth,
    ToolTypes
}