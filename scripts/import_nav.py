import csv
from nav.models import Nav

def run():

    with open('scripts/data/Nav.csv','r') as csvfile:
        rows = csv.reader(csvfile)
        next(rows, None)
        for row in rows:
            try:
                Nav.objects.get()
            break

if __name__ == '__main__':
    run()