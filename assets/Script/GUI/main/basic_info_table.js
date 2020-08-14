// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        current_hp_label:cc.Label,
        gold_label:cc.Label,
        normal_keys_label:cc.Label,
        gold_keys_label:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    set_label:function(label,value)
    {
        this[label + "_label"].string = String(value);
    },

    // update (dt) {},
});
