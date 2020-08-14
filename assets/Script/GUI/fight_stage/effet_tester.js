// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    change_effet:function()
    {
        var edit_box = this.node.getComponent(cc.EditBox);
        var stage = cc.find("Canvas/fight_stage").getComponent("fight_stage");
        var command = edit_box.string + "()";
        stage.testing_effect_command = command;
    }

    // update (dt) {},
});
