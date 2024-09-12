from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import sqlite3


db_file = "core.db"
db_table = "paper_entry"


def hello_world(request):
    return Response('Hello World!')


def get_pdf(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"SELECT pdf FROM {db_table} WHERE id = ?", (id,))
    pdf = cur.fetchone()[0]
    con.close()
    return Response(pdf, content_type='application/pdf')


def get_paper_entries(request):
    # open the database and get all the entries
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"SELECT id, title, parent, year, doi, authors, gen_keywords, pdf, gen_category FROM {db_table}")
    json_data = []

    for row in cur.fetchall():
        c = "none"
        if row[8] is not None:
            c = row[8]
        json_data.append({
            "id": row[0],
            "title": row[1],
            "parent": row[2],
            "year": row[3],
            "doi": row[4],
            # "authors": row[5],
            "keywords": row[6],
            "has_pdf": row[7] is not None,
            "category": c,
        })
    # default sorted by year in reverse order
    json_data = sorted(json_data, key=lambda x: x["year"], reverse=True)
    # then for each year, sort by category
    json_data = sorted(json_data, key=lambda x: x["category"])
    con.close()
    return Response(json=json_data)


if __name__ == '__main__':
    with Configurator() as config:

        config.add_route('hello', '/')
        config.add_view(hello_world, route_name='hello')

        config.add_route('get_paper_entries', '/get_paper_entries')
        config.add_view(get_paper_entries, route_name='get_paper_entries')

        config.add_route('get_pdf', '/get_pdf/{id}')
        config.add_view(get_pdf, route_name='get_pdf')

        app = config.make_wsgi_app()

    server = make_server('0.0.0.0', 3332, app)
    server.serve_forever()
