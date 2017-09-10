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
        filter_data: function (data) {
            return data;
        },
        spit: function(){
             var data = this.filter_data(this.data);
             return _.map(data, this.handle_data.bind(this));

        },
        clean_entry: function (new_entry) {
            return new_entry;
        },
        handle_data:function(single_entry){
            var new_entry = {}
            _.map(this.dictionary, function(key_right,key_left ){
                new_entry[key_right] = single_entry[key_left];
            });


            return this.clean_entry(new_entry);
        }
    });

    return BaseAdapter;
});