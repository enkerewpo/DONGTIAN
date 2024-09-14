from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import sqlite3
from gen import *

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


def get_abstract(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"SELECT abstract FROM {db_table} WHERE id = ?", (id,))
    abstract = cur.fetchone()[0]
    con.close()
    return Response(abstract)


def get_paper_entries(request):
    # open the database and get all the entries
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"SELECT id, title, parent, year, doi, authors, gen_keywords, pdf, gen_category, gen_ccs FROM {db_table}")
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
            "authors": row[5],
            "keywords": row[6],
            "has_pdf": row[7] is not None,
            "category": c,
            "ccs": row[9]
        })
    # default sorted by year in reverse order
    json_data = sorted(json_data, key=lambda x: x["year"], reverse=True)
    # # then for each year, sort by category
    # json_data = sorted(json_data, key=lambda x: x["category"])
    con.close()
    return Response(json=json_data)


def post_pdf(request):
    """ upload a pdf file """
    # get the id of the paper
    id = request.matchdict['id']
    # get the pdf file
    pdf = request.POST['pdf'].file.read()
    # open the database and get the entry
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"UPDATE {db_table} SET pdf = ? WHERE id = ?", (pdf, id))
    con.commit()
    con.close()
    return Response("pdf uploaded, id: " + id + ", size: " + str(len(pdf)) + " bytes")


def get_paper(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"SELECT id, title, parent, year, doi, authors, gen_keywords, pdf, gen_category, gen_ccs, abstract FROM {db_table} WHERE id = ?", (id,))
    row = cur.fetchone()
    con.close()
    c = "none"
    if row[8] is not None:
        c = row[8]
    json_data = {
        "id": row[0],
        "title": row[1],
        "parent": row[2],
        "year": row[3],
        "doi": row[4],
        "authors": row[5],
        "keywords": row[6],
        "has_pdf": row[7] is not None,
        "category": c,
        "ccs": row[9],
        "abstract": row[10]
    }
    return Response(json=json_data)

def post_rm_pdf(request):
    """ remove a pdf file """
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = sqlite3.connect(db_file)
    cur = con.cursor()
    cur.execute(
        f"UPDATE {db_table} SET pdf = NULL WHERE id = ?", (id,))
    con.commit()
    con.close()
    return Response("pdf removed, id: " + id)


def post_gen(request):
    """ trigger to generate keywords, category, css, etc using GPT for paper with id """
    id = request.matchdict['id']
    api_gen_by_id(id)
    return Response("gen triggered for id: " + id)


def post_rm_gen(request):
    """ remove the generated keywords, category, css, etc for paper with id """
    id = request.matchdict['id']
    api_rm_gen_by_id(id)
    return Response("gen removed for id: " + id)


if __name__ == '__main__':
    with Configurator() as config:

        config.add_route('hello', '/')
        config.add_view(hello_world, route_name='hello')

        config.add_route('get_paper_entries', '/get_paper_entries')
        config.add_view(get_paper_entries, route_name='get_paper_entries')

        config.add_route('get_pdf', '/get_pdf/{id}')
        config.add_view(get_pdf, route_name='get_pdf')

        config.add_route('get_abstract', '/get_abstract/{id}')
        config.add_view(get_abstract, route_name='get_abstract')

        config.add_route('post_pdf', '/post_pdf/{id}')
        config.add_view(post_pdf, route_name='post_pdf')

        config.add_route('post_gen', '/post_gen/{id}')
        config.add_view(post_gen, route_name='post_gen')

        config.add_route('post_rm_pdf', '/post_rm_pdf/{id}')
        config.add_view(post_rm_pdf, route_name='post_rm_pdf')

        config.add_route('post_rm_gen', '/post_rm_gen/{id}')
        config.add_view(post_rm_gen, route_name='post_rm_gen')

        config.add_route('get_paper', '/get_paper/{id}')
        config.add_view(get_paper, route_name='get_paper')

        app = config.make_wsgi_app()

    server = make_server('0.0.0.0', 3332, app)
    server.serve_forever()
