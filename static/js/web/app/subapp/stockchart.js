define(['jquery', 'highstock', 'libs/Class'], function($, HighStock, Class){

    var ChartApp = Class.extend({
        clear_data: function (data) {
            return data;
        },
        render_chart: function () {
            Highcharts.chart('chart_container')
        },
        dataload_sucess: function (data) {

            this.data = this.clear_data(data);
            this.render_chart();
        },
        dataload_fail:function () {

        },
        init: function () {
            this.element_id = 'chart_container'
            this.$el = $('#'+this.element_id);
            if (!this.$el.length) return ;

            $.when($.ajax(this.get_data_url)).
            then(
                this.dataload_sucess.bind(this),
                this.dataload_fail.bind(this)
            );

        }
    });
    return ChartApp;

});