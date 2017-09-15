define(['subapp/adapters/adapter', 'subapp/dictionaries/coinmarketcap', 'underscore'],
    function(AdapterBase, coinmarketDictionary, _){


         var CoinDic = {
             BTC               :"比特币BTC",
             LTC               :"莱特币LTC",
             DOGE              :"狗狗币DOGE",
             ETH               :"以太币ETH",
             ETC               :"以太经典ETC",
             BCH                :"比特币现金",
             XRP               :"瑞波币XRP",
             BTS               :"比特股BTS",
             XLM               :"恒星币XLM",
             NXT               :"未来币NXT",
              ARDR             :"阿朵ARDR",
              BLK              :"黑币BLK",
             XEM               :"新经币XEM",
             EMC               :"崛起币EMC",
             DASH              :"达世币DASH",
              INF              :"讯链INF",
              XZC              :"零币XZC",
             SYS               :"系统币SYS",
              VASH             :"微币VASH",
             EAC               :"地球币EAC",
             XCN               :"氪石币XCN",
             PPC               :"点点币PPC",
             MGC               :"众合币MGC",
             HLB               :"活力币HLB",
             ZCC               :"招财币ZCC",
             XPM               :"质数币XPM",
             NCS               :"资产股NCS",
             YBC               :"元宝币YBC",
             MEC               :"美卡币MEC",
            WDC                :"世界币WDC",
            QRK                 :"夸克币QRK",
            RIC                :"黎曼币RIC",
            TAG                :"奖赏币TAG",
            TMC                :"时代币TMC",
            XMR                :"门罗币XMR",
             MIOTA            :"艾欧塔MIOTA",
             OMG               :"OMG",
             NEO                  :"小蚁股NEO",
             BCC                  :"比特币现金BCC",
             QTUM                  : "量子链QTUM",
             STRAT              :"斯特拉STRAT",
             ZEC                   :"Zcash(ZEC)",
             Bytecoin              :"Bytecoin(BCN)",
             MAID                   :"互联网币MAID",
             GNT                   :"Golem(GNT)",
             REP                   :"Augur(REP)",
             KMD                       :"Komodo(KMD)",
             DCR                  :"Decred(DCR)",
             FCT                   :"公证通(FCT)",
            };

        var CoinMarketAdapter = AdapterBase.extend({
            init:function(){
                this.dictionary = coinmarketDictionary;
            },

            filter_data: function(data){
                return _.filter(data, this._filter.bind(this));
            },
            _filter: function(entry){
                return !(_.contains(['BTC', 'ETH', 'LTC'], entry['symbol']));
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