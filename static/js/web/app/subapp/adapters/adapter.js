define(['libs/Class','underscore'],function(Class,_){
    var BaseAdapter = Class.extend({
        init: function(dictionary){
            this.dictionary = dictionary;
        },
        update: function(data){
            this.old = this.data;
            this.data = data;
            return this;
        },
        spit: function(){
            return _.map(this.data, this.handle_data.bind(this));

        },
        handle_data:function(single_entry){
            var new_entry = {}
            _.map(this.dictionary, function(key_right,key_left ){
                new_entry[key_right] = single_entry[key_left];
            });
            return new_entry
        }
    });

    return BaseAdapter;
});