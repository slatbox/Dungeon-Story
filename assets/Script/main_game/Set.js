// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const Set = cc.Class({

    properties: {
       elements:[]
    },

    has_element:function(search_element)
    {
        var len = this.elements.length;
        for(var i = 0;i < len;i++)
        {
            if(search_element.equals(this.elements[i]))
            {
                return true;
            }
        }
        return false;
    },
    remove_element:function(to_remove)
    {
        var len = this.elements.length;
        for(var i = 0;i < len;i++)
        {
            if(to_remove.equals(this.elements[i]))
            {
                delete this.elements[i];
            }
        }

    },
    add_element:function(to_add)
    {
        if(!this.has_element(to_add))
        {
            var len = this.elements.length;
            this.elements[len] = to_add.clone();
        }
    },
    get_length:function()
    {
        return this.elements.length;
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    
});

module.exports = Set;
