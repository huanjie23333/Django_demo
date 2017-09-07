import csv
from nav.models import Nav

def run():

    with open('scripts/data/nav_final.csv','r') as csvfile:
        rows = csv.reader(csvfile)
        next(rows, None)
        for row in rows:
            cname = row[1]
            ename = row[0]
            location = row[3]
            alias = row[2]
            website = row[4]
            tags = row[5]

            try:
                score = int(row[6])
            except:
                score = 0

            category = row[7]
            try:
                the_nav = Nav.objects.get(ename=ename, cname=cname, category=category)
                the_nav.cname = cname
                the_nav.ename = ename
                the_nav.location = location
                the_nav.alias = alias
                the_nav.web_site = website
                the_nav.score = score
                the_nav.category = category
                the_nav.save()
                the_nav.tags.set(*tags.split(','))

            except Nav.MultipleObjectsReturned:
                raise Exception('multi entry for site : ' + cname)
            except Nav.DoesNotExist:
                site = Nav(cname=cname, ename=ename, location=location, \
                           alias=alias, web_site=website, score=score, category=category);
                site.save()
                if tags:
                    site.tags.set(*tags.split(','))
            except Exception as e :
                print('error')
                print(ename + '  ' + cname + ' ' + website)
                raise(Exception('error happend'))


if __name__ == '__main__':
    run()