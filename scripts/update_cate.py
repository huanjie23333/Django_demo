from nav.models import Nav, Category

def run():
    navs = Nav.objects.all()
    for nav in navs:
        try:
            cate = Category.objects.get(cname=nav.category)
            nav.cate = cate
            nav.save()
        except Category.DoesNotExist:
            print('category name not exist: '+  nav.category)




if __name__ == '__main__':
    run()