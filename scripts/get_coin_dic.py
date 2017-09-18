from nav.models import Nav

def run():
    out_put_file = 'static/js/web/app/subapp/dictionaries/coin_dic.js'
    coins = Nav.objects.filter(cate_id=1)

    with open(out_put_file,'w') as dic_file:
        dic_file.write('define([],function(){\n')
        dic_file.write('var CoinDic = {\n')

        for coin in coins:
            if not coin.alias:
                continue
            if coin.cname:
                dic_file.write('%s : \"%s%s\",\n' %(coin.alias, coin.cname, coin.alias))
                continue
            if coin.ename:
                dic_file.write('%s : \"%s %s\",\n' %(coin.alias, coin.ename, coin.alias ))

        dic_file.write('};\n')
        dic_file.write('return CoinDic;\n')
        dic_file.write(               '});\n')