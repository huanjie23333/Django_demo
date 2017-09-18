define([
    'subapp/adapters/adapter',
    'subapp/dictionaries/coinmarketcap',
    'subapp/dictionaries/coin_dic',
    'underscore'],
    function(AdapterBase, coinmarketDictionary,
             CoinDic
             ,_){

        var CoinMarketAdapter = AdapterBase.extend({
            init:function(){
                this.dictionary = coinmarketDictionary;
            },

            filter_data: function(data){
                return _.filter(data, this._filter.bind(this));
            },
            _filter: function(entry){
                return  (_.contains(_.keys(CoinDic), entry['symbol']))
            },
            get_change_class: function (entry) {
                var change = 0 ;
                try{
                    change = parseFloat(entry['change']);
                    if(NaN == change){
                        change = 0 ;
                    }
                }
                catch(error){

                }
                return change<0 ? 'fall': 'raise';

            },
            get_cnname: function (entry) {
                 return CoinDic[entry['symbol']]? CoinDic[entry['symbol']] :entry['symbol'];
            },
            clean_entry: function(entry){
                entry['change_class'] = this.get_change_class(entry);
                entry['name_cn'] = this.get_cnname(entry);
                entry['change_percent'] = entry['change'] + '%';
                entry['price_cny'] = Math.round(parseFloat(entry['price_cny'] * 10000))/10000.00;
                return entry;
            }
        });

        return CoinMarketAdapter
});