from time import sleep
import bs4
# import lxml.html
# from lxml.cssselect import CSSSelector

# get some html
import requests

# from nav.models import Nav

list_url = "http://www.chaindh.com/api/nav/"

headers = {'Authorization': 'Token b248833e4b1327fa70824089669860ea93607851'}


class FetchDesc(object):
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Authorization': 'Token b248833e4b1327fa70824089669860ea93607851',
        }
        # self.id = id
        # self.web_site = web_site

    def __call__(self, id, web_site, *args, **kwargs):
        try:
            r = requests.get(web_site, headers=self.headers)
        except Exception as e:
            print (e)
        try:
            desc = self.process_text(text=r.content)

            self.update_web_site_desc(
                id=id,
                desc=desc,
            )
        except TypeError:
            pass

    def process_text(self, text):
        soup = bs4.BeautifulSoup(text, "lxml")
        desc = soup.find("meta", attrs={"name": "description"})
        return desc["content"]

    def update_web_site_desc(self, id, desc):
        url = "{list_url}{id}.json".format(
            list_url=list_url,
            id=id,
        )
        r = requests.put(url, data={
            "description": desc
        }, headers=self.headers)
        if r.status_code == 200:
            return r.json()
        else:
            print(r.text)


fetch_desc = FetchDesc()


def get_url(data):
    for row in data:
        yield row


def get_results(s, url):
    res = s.get(url, params={'size': 100}, headers=headers)
    data = res.json()
    next_url = data['next']
    data = res.json().get('results', None)
    return next_url, get_url(data)


def run():
    s = requests.session()
    # print(next_url, data)
    api_url = list_url
    while True:

        next_url, data = get_results(s, url=api_url)

        for row in data:
            # print (row["id"], row["web_site"])
            fetch_desc(id=row["id"], web_site=row["web_site"])
            sleep(5)

        if next_url is None:
            break

        api_url = next_url
        sleep(1)

        # for row in r["results"]:
        #     fetch_desc(id=row["id"], web_site=row["web_site"])
        #     sleep(5)
        # yield process_web_site(row["id"], web_site=row["web_site"])

        # next_url = r


if __name__ == '__main__':
    run()
