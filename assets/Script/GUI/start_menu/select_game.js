// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SelectGame = cc.Class({
    extends: cc.Component,

    properties: {
        current_select_index:0,
        all_selections:{
            default:[],
            type:cc.Label
        }
    },

    next:function()
    {
        this.all_selections[this.current_select_index].node.active = false;
        this.current_select_index = (this.current_select_index+1)%this.all_selections.length;
        this.all_selections[this.current_select_index].node.active = true;
    },
    pre:function()
    {
        this.all_selections[this.current_select_index].node.active = false;
        this.current_select_index = (this.current_select_index-1+this.all_selections.length)%this.all_selections.length;
        this.all_selections[this.current_select_index].node.active = true;
    },
    onEnable:function()
    {
        this.node.runAction(cc.fadeIn(1));
    }
});

module.exports=SelectGame;