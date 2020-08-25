// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        arm_main_type_limit:1,
        arm_asis_type_limit:1,
        tool_type_limit:2,
        hp_type_limit:1,
        df_type_limit:1,
        lk_type_limit:1,
        sp_type_limit:1,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad:function()
    {
        this.tools = [];
    }

    // update (dt) {},
});
