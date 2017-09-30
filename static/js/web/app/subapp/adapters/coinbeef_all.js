define([
    'subapp/adapters/coinbeef',
    'underscore'],

    function(Coinbeef24h, _){

        var CoinbeefAdapterAll = Coinbeef24h.extend({
            spit: function(){
              var result =  _.map(this.data['results'],
                             this.add_formatted_time.bind(this));

              return _.map(result, this.add_time_title.bind(this));

            },
            add_time_title: function(entry){
                var utc_fix = new Date().getTimezoneOffset();
                var local_timestamp = this.get_entry_date(entry) - 1000*60*utc_fix
                var dt = new Date(local_timestamp);
                var month = entry['month'] = dt.getMonth() + 1;
                var date = entry['date'] = dt.getDate();
                var year = entry['year'] = dt.getFullYear();

                if(this.last_show_date == date
                    && this.last_show_month == month
                ){
                    entry['show_time'] = false;
                } else{
                    entry['show_time'] = true;
                    this.last_show_date = date;
                    this.last_show_month = month;
                }

                if(this.last_show_year == year){
                    entry['show_year'] = false;
                }else{
                    entry['show_year'] = true;
                    this.last_show_year = year;
                }

                return entry ;
            }
        });

        return CoinbeefAdapterAll
});