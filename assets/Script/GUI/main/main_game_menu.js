
const MainHeroStage = require("main_hero_stage");

cc.Class({
    extends: cc.Component,

    properties: {
        hero_stage:
        {
            default:null,
            type:MainHeroStage
        },
    },

    back_to_game:function()
    {
        this.node.active = false;
    },
    show:function()
    {
        this.node.active = true;
    },
    exit_game:function()
    {

    },
    // update (dt) {},
});
