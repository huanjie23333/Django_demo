define([
    'subapp/adapters/adapter',
    'underscore'],
    function(AdapterBase, _){

        var CoinbeefAdapter = AdapterBase.extend({

            is_in_24h: function(entry){
                var entry_date = this.get_entry_date(entry);
                return this.first_date - entry_date <= 1000*60*60*16;
            },

            get_24h_entry: function (results) {
               this.first_date = this.get_entry_date(results[0]);
               return _.filter(results, this.is_in_24h.bind(this));
            },

            get_entry_date: function (entry) {
                return entry['published_at'] * 1000;
            },

            spit: function(){
                var  news_list = this.get_24h_entry(this.data['results']);
                return _.map(news_list, this.add_formatted_time.bind(this));
            },

            format_time: function (time_diff) {
                var sec_diff = Math.ceil(time_diff/1000.0);
                if(sec_diff <= 60){
                    return  sec_diff + '秒前';
                }

                var min_diff = Math.ceil(sec_diff/60.0) - 1;
                if(sec_diff > 60 && sec_diff <= 3600){
                    return  min_diff + '分钟前';
                }

                var hour_diff = Math.ceil(min_diff/60.0) -1;
                if(hour_diff <= 24){
                    return hour_diff + '小时前';
                }

                var day_diff = Math.ceil(hour_diff/24.0) -1;
                if( day_diff <= 7){
                    return day_diff + '天前';
                }

                var week_diff = Math.ceil(day_diff/7.0) ;
                if(day_diff <= 31){
                    return week_diff + '周前';
                }

                var mon_diff = Math.ceil(day_diff/30) ;
                if(day_diff<=365){
                    return mon_diff +'月前';
                }

                var year_diff = Math.ceil(day_diff/365);
                if(day_diff >=366){
                    return year_diff + '年前';
                }
            },
            add_formatted_time: function(entry){
                var utc_fix = new Date().getTimezoneOffset();
                var time_diff = Date.now() + 1000*60*utc_fix - this.get_entry_date(entry);
                entry['time_diff'] = this.format_time(time_diff);
                return entry;
            }

        });

        return CoinbeefAdapter
});