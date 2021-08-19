// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const NormalShortDagger = cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    statics:{
        commbo:0
    },
    before_attack: function (hero,enemy) {
        
    },
    during_attack: function (hero,enemy,values) {
        var effect_manager = window.Global.effect_manager;
        
        var original_pos = hero.position;
        
        
        var seq = cc.sequence(
            effect_manager.walk_to_enemy_action(enemy),
            // cc.delayTime(0.2),
            effect_manager.do_harm_to_action(enemy,effect_manager.small_chop_action(enemy),values,"small_chop_default_sound"),
            effect_manager.walk_back_action(original_pos)
        );

        hero.runAction(seq);
        this.using = true;
    },
    after_attack: function (hero,enemy) {
    
    },
    listen:function(event,data,emitter){
        
        if(event == "enemy_get_harm"){

            if(data.added_commbo)
                return;
            var fight_stage =  cc.find("Canvas/fight_stage").getComponent("fight_stage");
            var using_tool_name = fight_stage.doing_result_comp.node.name;
            if(using_tool_name == this.node.name)
                NormalShortDagger.commbo += 1;
            else
                NormalShortDagger.commbo = 0;
            data.added_commbo = 1;

            var color = cc.Color.WHITE;
            if(NormalShortDagger.commbo == 2){
                color = cc.Color.MAGENTA;
            }
            else if(NormalShortDagger.commbo >=3){
                color = cc.Color.RED;
            }
            fight_stage.show_hero_notice_label("Commbo " + NormalShortDagger.commbo,color);
            
            

            data.value = data.value * (1 + (NormalShortDagger.commbo - 1) * 0.5);
        }
        else if(event == "game_over"){
            NormalShortDagger.commbo = 0;
        }
        else if(event == "before_attack"){
            var fight_stage =  cc.find("Canvas/fight_stage").getComponent("fight_stage");
            var using_tool_name = fight_stage.doing_result_comp.node.name;
            if(using_tool_name != this.node.name)
                NormalShortDagger.commbo = 0;
        }
    }
    // update (dt) {},
});
