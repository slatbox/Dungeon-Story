// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const HeroDescription = require("hero_description");
const DataManager = require("DataManager");

const HeroStage = cc.Class({
    extends: cc.Component,

    properties: {
       gap:0,
       current_occupation_index:0,
       occupations:
       {
           default:[],
           type:cc.Prefab
       },
       name_label:cc.Label,
       description:
       {
           default:null,
           type: HeroDescription
       }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start:function()
    {
        var len = this.occupations.length;
        this.left = cc.instantiate(this.occupations[(this.current_occupation_index-1+len)%len]);
        this.middle = cc.instantiate(this.occupations[this.current_occupation_index]);
        this.right = cc.instantiate(this.occupations[(this.current_occupation_index+1)%len]);
        this.left.x = -this.gap;
        this.left.y = 0;
        this.right.x = this.gap;
        this.right.y = 0
        this.middle.scaleX = 2.5;
        this.middle.scaleY = 2.5;
        this.middle.x = 0;
        this.middle.y = 0;
        this.node.addChild(this.left);
        this.node.addChild(this.middle);
        this.node.addChild(this.right);
        this.name_label.string = this.middle.name;
        this.description.set_description(this.middle);

        // cc.director.preloadScene("main_game", function () {
        //     cc.log("preload main_game");
        // });
    },
    next_occupation:function()
    {
        var len = this.occupations.length;
        var left = this.left;
        var right = this.right;
        var middle = this.middle;
        var new_one = cc.instantiate(this.occupations[(this.current_occupation_index+2)%len]);
        new_one.opacity = 0;
        new_one.x = this.gap;
        new_one.y = 0;
        this.node.addChild(new_one);
        var middle_action = cc.spawn(
            cc.scaleTo(0.5,1,1),
            cc.moveTo(0.5,-this.gap,0).easing(cc.easeSineInOut())
        );
        var left_action = cc.sequence(
            cc.fadeOut(0.5),
            cc.destroySelf()
        );
        var right_action = cc.spawn(
            cc.scaleTo(0.5,2.5,2.5),
            cc.moveTo(0.5,0,0).easing(cc.easeSineInOut())
        );
        var new_action = cc.fadeIn(0.5);

        left.runAction(left_action);
        middle.runAction(middle_action);
        right.runAction(right_action);
        new_one.runAction(new_action);

        this.left = middle;
        this.middle = right;
        this.right = new_one;

        this.current_occupation_index = (this.current_occupation_index+1)%len;
        this.name_label.string = this.middle.name;
        this.description.set_description(this.middle);

    },
    back_to_main_menu:function()
    {
        this.node.parent.active = false;
    },
    pre_occupation:function()
    {
        var len = this.occupations.length;
        var left = this.left;
        var right = this.right;
        var middle = this.middle;
        var new_one = cc.instantiate(this.occupations[(this.current_occupation_index-2+len)%len]);
        new_one.opacity = 0;
        new_one.x = -this.gap;
        new_one.y = 0;
        this.node.addChild(new_one);
        var middle_action = cc.spawn(
            cc.scaleTo(0.5,1,1),
            cc.moveTo(0.5,this.gap,0).easing(cc.easeSineInOut())
        );
        var right_action = cc.sequence(
            cc.fadeOut(0.5),
            cc.destroySelf()
        );
        var left_action = cc.spawn(
            cc.scaleTo(0.5,2.5,2.5),
            cc.moveTo(0.5,0,0).easing(cc.easeSineInOut())
        );
        var new_action = cc.fadeIn(0.5);

        left.runAction(left_action);
        middle.runAction(middle_action);
        right.runAction(right_action);
        new_one.runAction(new_action);

        this.left = new_one
        this.middle = left;
        this.right = middle;

        this.current_occupation_index = (this.current_occupation_index-1+len)%len;

        this.name_label.string = this.middle.name;
        this.description.set_description(this.middle);
    },
    start_game:function()
    {
        var occupation = {"occupation":this.name_label.string};
        DataManager.save_obj(occupation,"occupation");
        DataManager.save_obj({"scene":"main_game"},"to_load");
        cc.director.loadScene("loading");
    }


    // update (dt) {},
});

module.exports = HeroStage;