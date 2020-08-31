/*
 * @Author: your name
 * @Date: 2020-08-31 10:02:08
 * @LastEditTime: 2020-08-31 15:56:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\assets\Script\effect\buff_pool.js
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    update_buffs:function()
    {
        for(var i = 0 ; i < this.buffs.length;i++){
            this.buffs[i].time += 1;
            if(this.buffs[i].is_out_of_date()){
                this.buffs[i].destroy();
                delete this.buffs[i];
            }
        }
        var tem = [];
        for(var i = 0 ; i < this.buffs.length;i++){
            if(this.buffs[i]){
                tem.push(this.buffs[i]);
            }
        }
        this.buffs = tem;
        for(var i = 0 ; i < this.buffs.length;i++){
            this.buffs[i].y = i * -40;
        }
    },
    add_buff:function(new_buff)
    {
        this.buffs.push(new_buff);
        this.node.addChild(new_buff);
        new_buff.x = 0;
        new_buff.y = - 40 * (this.buffs.length - 1);
    },
    broadcast:function(event,data,emitter)
    {
        for(var i = 0 ; i < this.buffs.length;i++){
            if(this.buffs[i].listen){
                this.buffs[i].listen(event,data,emitter);
            }
        }
    },
    onLoad:function()
    {
        this.buffs = [];
    },
    clear:function()
    {
        for(var i = 0 ; i < this.buffs.length;i++){
           if(this.buffs[i]){
               this.buffs[i].destroy();
           }
        }
        this.buffs = [];
    }
    

    // update (dt) {},
});
