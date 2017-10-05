define([
    'subapp/adapters/coinmarketcapAdapter',
    'subapp/dictionaries/header_coin_dic',
    'underscore'],
    function(AdapterBase, header_coin_dic,_){

        var HeaderCoinmarketcapAdapter = AdapterBase.extend({
            _filter: function(entry){
                return  (_.contains(_.keys(header_coin_dic), entry['symbol']))
            },
            clean_entry:function(entry){
                var entry = this._super(entry);
                entry['element_id'] = 'header' + entry['symbol'];
                entry['title_text'] = entry['symbol']+'/CNY';
                return entry;
            }
        });

        return HeaderCoinmarketcapAdapter;
});