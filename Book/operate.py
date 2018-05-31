from django.shortcuts import render
from Model.models import Article
from Model.models import Writer


# 查找书籍数据
def search_post(request):
    ctx={}
    if request.POST:
        ctx['res'] = Article.objects.get(name=request.POST['q'])
    return render(request, "searchBook.html", ctx)

# 添加书籍数据
def addBook(request):
    ctx={}
    if request.POST:
        writer = Writer.objects.get(name=request.POST['p'])
        Article.objects.create(name=request.POST['q'] , writer=writer)
        ctx['str'] = 'OK!'
    return render(request, "addBook.html", ctx)

# 删除书籍数据
def deleteBook(request):
    ctx={}
    if request.POST:
        Article.objects.filter(name=request.POST['q']).delete()
        ctx['str'] = 'OK!'
    return render(request, "deleteBook.html", ctx)

# 修改书籍数据
def modifyBook(request):
    ctx={}
    if request.POST:
        writer = Writer.objects.get(name=request.POST['p1'])
        Article.objects.filter(name=request.POST['q']).update(name=request.POST['q1'],writer=writer)
        ctx['str'] = 'OK!'
    return render(request, "modifyBook.html", ctx)

#展示书籍数据
def show(request):
    ctx1 = Article.objects.all()
    return render(request, "showall.html", {'li':ctx1})

#显示作者信息
def showWriter(request):
    ctx1 = Writer.objects.all()
    return render(request, "showWriter.html", {'li':ctx1})

#修改作者数据
def modifyWriter(request):
    ctx={}
    if request.POST:
        writer = Writer.objects.get(name=request.POST['q'])
        Writer.objects.filter(name=writer).update(name=request.POST['q1'],sex=request.POST['p1'],age=request.POST['k1'])
        ctx['str'] = 'OK!'
    return render(request, "modifyWriter.html", ctx)

def showWriterBook(request):
    ctx1={}
    if request.POST:
        writer = Writer.objects.get(name=request.POST['q'])
        ctx1 = writer.writers.all()
    return render(request, "showWriterBook.html", {'li':ctx1})