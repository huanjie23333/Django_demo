define(['libs/Class','jquery','highcharts'],function(Class,$,highcharts){
    var tokenlang = Class.extend({
        init:function(){
            if(!$('#tokenlang-charts-container').length){
                return;
            }
            this.isSend = false;
            this.keyword = '';
            this.loading_wrapper = $(".loading-wrapper");
            this.send_ajax();
            this.keydown_search();
            this.click_search();
        },
        keydown_search:function(){
            $(".tokenlang-search-input").on('keydown',this.do_search.bind(this));
        },
        click_search:function(){
            $(".tokenlang-search-button").on('click',this.do_click_search.bind(this));
        },
        do_search:function(e){
            if(e.which == 13 && !this.isSend){
                this.get_inputval();
                this.send_ajax();
            }
        },
        do_click_search:function(){
            if(!this.isSend){
                this.get_inputval();
                this.send_ajax();
            }
        },
        get_inputval:function(){
            this.keyword = $(".tokenlang-search-input").val();
        },
        send_ajax:function(){
            this.isSend = true;
            this.keyword = this.keyword || 'bitcoin';
            $.ajax({
                url:"https://api.github.com/search/repositories?q="+this.keyword+"&sort=forks&order=desc&per_page=100",
                type:'get',
                beforeSend:this.beforeSend.bind(this)
            })
            .done(this.get_data_success.bind(this))
            .fail(this.get_data_fail.bind(this));
        },
        beforeSend:function(){
            $("#tokenlang-charts-container").hide();
            this.loading_wrapper.show();
        },
        get_data_success:function(data){
            var cleanData = this.clean_date(data.items);
            this.generate_charts(cleanData);
            this.isSend = false;
        },
        get_data_fail:function(err){
            console.log(err);
        },
        clean_date:function(items){
            var tokenlangArr = [{Others:0}];
            var that = this;
            items.forEach(function(item){
                if(!item.language){
                    tokenlangArr.forEach(that.increase_others_count);
                }else{
                    var hasinarr = false;
                    tokenlangArr.forEach(function(val,index,arr){
                        for(var v in val){
                            if(v == item.language){
                                hasinarr = true;
                                arr[index][v] += 1;
                            }
                        }
                    });
                    if(!hasinarr){
                        var lang = {};
                        lang[item.language] = 1;
                        tokenlangArr.unshift(lang);
                    }
                }
            });
            var sortdata = this.sort_dic(tokenlangArr);
            return this.get_lang_obj(sortdata);
        },
        increase_others_count:function(val,index,arr){
            for(var v in val){
                if(v == 'Others'){
                    arr[index].Others +=1;
                }
            }
        },
        sort_dic:function(data){
            var obj = this.pop_others(data);
            var data = obj.langarr;
            var others = obj.others_obj;
            for(var i=0;i<data.length-1;i++){
                for(var j=0;j<data.length-1-i;j++){
                    for(var a in data[j]){
                        for(var b in data[j+1]){
                            if(data[j][a] < data[j+1][b]){
                                var tmp = data[j];
                                data[j] = data[j+1];
                                data[j+1] = tmp;
                            }
                        }
                    }
                }
            }
            data.push(others);
            return data;
        },
        pop_others:function(data){
            var arr = [];
            var others_obj = {};
            for(var i=0;i<data.length;i++){
                for(var v in data[i]){
                    if(v != 'Others'){
                        arr.push(data[i]);
                    }else{
                        others_obj = data[i];
                    }
                }
            }
            return {
                others_obj : others_obj,
                langarr : arr
            }
        },
        get_lang_obj:function(data){
            var obj={};
            obj.cate=[];
            obj.count=[];
            for(var i=0;i<data.length;i++){
                for(var v in data[i]){
                    obj.cate.push(v);
                    obj.count.push(data[i][v]);
                }
            }
            return obj;
        },
        formit_keyword:function(){
            this.keyword = this.keyword.slice(0,1).toUpperCase() + this.keyword.slice(1).toLowerCase();
        },
        generate_charts:function(langobj){
            this.formit_keyword();
            $('#tokenlang-charts-container').highcharts({
                chart: {
                    type: 'bar',
                    height:600
                },
                title: {
                    text: this.keyword
                },
                xAxis: {
                    categories: langobj.cate,
                    allowDecimals:false
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ""
                    },
                    allowDecimals: false
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        allowPointSelect: true
                    }
                },
                credits:{
                    enabled:false
                },
                series: [{
                    name: '数量',
                    data: langobj.count
                }]
            });
            this.loading_wrapper.hide();
            $("#tokenlang-charts-container").show();
        }
    });
    return tokenlang;
});