// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const InteractionManager = cc.Class({
    extends: cc.Component,

    properties: {
        unlocked_door:cc.Prefab,
        room_door:cc.Prefab
    },


});

module.exports = InteractionManager;