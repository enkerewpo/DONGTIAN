from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
import sqlite3
import os
import pymysql
import sys
from gen import *

# db_file = "core.db"
# db_table = "paper_entry"

# mysql
mysql_db_url = "www.oscommunity.cn"
mysql_db_port = 3306
mysql_db_name = "dongtian_db"
mysql_db_user = "dongtian_db"
mysql_db_table = "paper_entry"
mysql_db_password = None

if os.path.exists("db_passwd") is False:
    print("db_passwd file not found")
    exit(1)

with open("db_passwd", "r") as f:
    mysql_db_password = f.read()
    mysql_db_password = mysql_db_password.strip()

# con = pymysql.connect(host=mysql_db_url, port=mysql_db_port, user=mysql_db_user,
#                       password=mysql_db_password, db=mysql_db_name, charset='utf8mb4')


def hello_world(request):
    return Response('Hello World!')


def get_pdf(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT pdf FROM {db_table} WHERE id = ?", (id,))
    cur.execute(f"SELECT pdf FROM {mysql_db_table} WHERE id = %s", (id,))
    pdf = cur.fetchone()[0]
    con.close()
    return Response(pdf, content_type='application/pdf')


def get_abstract(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT abstract FROM {db_table} WHERE id = ?", (id,))
    cur.execute(f"SELECT abstract FROM {mysql_db_table} WHERE id = %s", (id,))
    abstract = cur.fetchone()[0]
    con.close()
    return Response(abstract)


def get_paper_entries(request):
    print("get_paper_entries")
    # open the database and get all the entries
    con = connect()
    cur = con.cursor()
    cur.execute(f"SELECT id, title, parent, year, doi, authors, gen_keywords, gen_category, gen_ccs, has_pdf, cited_count FROM {mysql_db_table}")
    print(f"selected {cur.rowcount} rows")
    json_data = []

    for row in cur.fetchall():
        id, title, parent, year, doi, authors, keywords, category, ccs, has_pdf, cited_count = row
        if category is None:
            category = "none"
        json_data.append({
            "id": id,
            "title": title,
            "parent": parent,
            "year": year,
            "doi": doi,
            "authors": authors,
            "keywords": keywords,
            "has_pdf": has_pdf,
            "category": category,
            "ccs": ccs,
            "cited_count": cited_count
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
    con = connect()
    cur = con.cursor()
    # cur.execute(f"UPDATE {db_table} SET pdf = ? WHERE id = ?", (pdf, id))
    # mysql syntax
    cur.execute(f"UPDATE {mysql_db_table} SET pdf = %s WHERE id = %s", (pdf, id))
    con.commit()
    con.close()
    return Response("pdf uploaded, id: " + id + ", size: " + str(len(pdf)) + " bytes")


def get_paper(request):
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = connect()
    cur = con.cursor()
    cur.execute(f"SELECT id, title, parent, year, doi, authors, gen_keywords, has_pdf, gen_category, gen_ccs, abstract FROM {mysql_db_table} WHERE id = %s", (id,))
    row = cur.fetchone()
    id, title, parent, year, doi, gen_authors, gen_keywords, has_pdf, gen_category, gen_ccs, abstract = row
    con.close()
    json_data = {
        "id": id,
        "title": title,
        "parent": parent,
        "year": year,
        "doi": doi,
        "authors": gen_authors,
        "keywords": gen_keywords,
        "has_pdf": has_pdf,
        "category": gen_category if gen_category is not None else "none",
        "ccs": gen_ccs,
        "abstract": abstract
    }
    return Response(json=json_data)


def post_rm_pdf(request):
    """ remove a pdf file """
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = connect()
    cur = con.cursor()
    # cur.execute(f"UPDATE {db_table} SET pdf = NULL WHERE id = ?", (id,))
    # mysql syntax
    cur.execute(f"UPDATE {mysql_db_table} SET pdf = NULL WHERE id = %s", (id,))
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


def post_add_one(request):
    """ add a paper entry """
    # insert a default empty entry
    con = connect()
    cur = con.cursor()
    title = "PLEASE EDIT THIS TITLE AND UPDATE METADATA"
    year = 2099
    # cur.execute(f"INSERT INTO {db_table} (title, year) VALUES (?, ?)", (title, year))
    cur.execute(f"INSERT INTO {mysql_db_table} (title, year) VALUES (%s, %s)", (title, year))
    con.commit()
    con.close()
    return Response(body=json.dumps({"id": cur.lastrowid}), content_type='application/json', charset='utf-8')


def post_rm_paper(request):
    """ remove a paper entry """
    # get the id of the paper
    id = request.matchdict['id']
    # open the database and get the entry
    con = connect()
    cur = con.cursor()
    # cur.execute(f"DELETE FROM {db_table} WHERE id = ?", (id,))
    cur.execute(f"DELETE FROM {mysql_db_table} WHERE id = %s", (id,))
    con.commit()
    con.close()
    return Response("paper removed, id: " + id)


def post_fetch_pdf(request):
    # use util_fetch_pdf_by_id(con, table, id) to fetch pdf from scihub
    id = request.matchdict['id']
    con = connect()
    ok = util_fetch_pdf_by_id(con, db_table, id)
    con.close()
    if ok:
        return Response("pdf fetched and uploaded, id: " + id)
    else:
        return Response("pdf not found on scihub", status=500)

def post_update_paper(request):
    """ update a paper entry """
    # get the id of the paper
    id = request.matchdict['id']
    id = int(id)
    # translate the POST data's json to a dictionary
    con = connect()
    data = request.json_body
    title = data["title"]
    if title is None:
        return Response("title is required")
    cur = con.cursor()
    # cur.execute(f"UPDATE {db_table} SET title = ? WHERE id = ?", (title, id))
    # mysql syntax
    cur.execute(f"UPDATE {mysql_db_table} SET title = %s WHERE id = %s", (title, id))
    parent = data["parent"]
    if parent is not None:
        # cur.execute(f"UPDATE {db_table} SET parent = ? WHERE id = ?", (parent, id))
        cur.execute(f"UPDATE {mysql_db_table} SET parent = %s WHERE id = %s", (parent, id))
    year = data["year"]
    if year is not None:
        # cur.execute(f"UPDATE {db_table} SET year = ? WHERE id = ?", (year, id))
        cur.execute(f"UPDATE {mysql_db_table} SET year = %s WHERE id = %s", (year, id))
    doi = data["doi"]
    if doi is not None:
        # cur.execute(f"UPDATE {db_table} SET doi = ? WHERE id = ?", (doi, id))
        cur.execute(f"UPDATE {mysql_db_table} SET doi = %s WHERE id = %s", (doi, id))
    authors = data["authors"]
    if authors is not None:
        # cur.execute(f"UPDATE {db_table} SET authors = ? WHERE id = ?", (authors, id))
        cur.execute(f"UPDATE {mysql_db_table} SET authors = %s WHERE id = %s", (authors, id))
    keywords = data["keywords"]
    if keywords is not None:
        # cur.execute(f"UPDATE {db_table} SET gen_keywords = ? WHERE id = ?", (keywords, id))
        cur.execute(f"UPDATE {mysql_db_table} SET gen_keywords = %s WHERE id = %s", (keywords, id))
    category = data["category"]
    if category is not None:
        # cur.execute(f"UPDATE {db_table} SET gen_category = ? WHERE id = ?", (category, id))
        cur.execute(f"UPDATE {mysql_db_table} SET gen_category = %s WHERE id = %s", (category, id))
    ccs = data["ccs"]
    if ccs is not None:
        # cur.execute(f"UPDATE {db_table} SET gen_ccs = ? WHERE id = ?", (ccs, id))
        cur.execute(f"UPDATE {mysql_db_table} SET gen_ccs = %s WHERE id = %s", (ccs, id))
    abstract = data["abstract"]
    if abstract is not None:
        # cur.execute(f"UPDATE {db_table} SET abstract = ? WHERE id = ?", (abstract, id))
        cur.execute(f"UPDATE {mysql_db_table} SET abstract = %s WHERE id = %s", (abstract, id))
    con.commit()
    con.close()
    return Response("paper updated")

def get_cateogry_and_count(request):
    # return [{name: "category", count: 123}, ...]
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT gen_category, COUNT(*) FROM {db_table} GROUP BY gen_category")
    cur.execute(f"SELECT gen_category, COUNT(*) FROM {mysql_db_table} GROUP BY gen_category")
    json_data = []
    for row in cur.fetchall():
        json_data.append({
            "name": row[0],
            "count": row[1]
        })
    con.close()
    return Response(json=json_data)

import threading

def post_update_all_metadata(request):
    # use another thread to do this asynchronizely!!!
    threading.Thread(target=api_update_all_metadata).start()
    return Response("update all metadata triggered")

def post_update_all_pdf(request):
    # use another thread to do this asynchronizely!!!
    threading.Thread(target=api_update_all_pdf).start()
    return Response("update all pdf triggered")

def post_update_all_gen(request):
    # use another thread to do this asynchronizely!!!
    threading.Thread(target=api_update_all_gen).start()
    return Response("update all gen triggered")

def post_transaction_has_pdf(request):
    # trigger server to run update_has_pdf routine
    con = connect()
    # call procedure
    cur = con.cursor()
    cur.callproc("update_has_pdf")
    con.commit()
    con.close()
    return Response("transaction has_pdf triggered")

def post_download_pdf(request):
    # api.post(`/download_pdf/${$route.params.id}`, { url: downloadUrl }).then(res => {
    # trigger a server download of the pdf file and automatically add it to the database
    form = request.json_body
    url = form["url"]
    print(f"downloading pdf from url: {url}")
    id = request.matchdict['id']
    # download the pdf file using requests
    import requests
    response = requests.get(url, stream=True)
    pdf_name = f"tmp.pdf"
    # dump response content to json
    json_debug = {
        "status_code": response.status_code,
        "headers": dict(response.headers),
        "content": str(response.content)
    }
    # print(json_debug)
    pdf_binary_data = response.content
    if response.status_code == 200:
        con = connect()
        cur = con.cursor()
        cur.execute(f"UPDATE {mysql_db_table} SET pdf = %s WHERE id = %s", (pdf_binary_data, id))
        con.commit()
        con.close()
        return Response("pdf downloaded and uploaded, id: " + id)
    else:
        return Response("pdf download failed, download url returned status code: " + str(response.status_code), status=500)
    
def post_gen_authors(request):
    # trigger the GEN process for the paper authors
    # api url: /api/post_gen_authors/{id}
    id = request.matchdict['id']
    api_gen_authors_by_id(id)
    return Response("gen triggered for authors of id: " + id)

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
        config.add_route('add_one', '/add_one')
        config.add_view(post_add_one, route_name='add_one')
        config.add_route('rm_paper', '/rm_paper/{id}')
        config.add_view(post_rm_paper, route_name='rm_paper')
        config.add_route('update_paper', '/update_paper/{id}')
        config.add_view(post_update_paper, route_name='update_paper')
        config.add_route('fetch_pdf', '/fetch_pdf/{id}')
        config.add_view(post_fetch_pdf, route_name='fetch_pdf')
        config.add_route('update_all_metadata', '/update_all_metadata')
        config.add_view(post_update_all_metadata, route_name='update_all_metadata')
        config.add_route('update_all_pdf', '/update_all_pdf')
        config.add_view(post_update_all_pdf, route_name='update_all_pdf')
        config.add_route('category_and_count', '/category_and_count')
        config.add_view(get_cateogry_and_count, route_name='category_and_count')
        config.add_route('update_all_gen', '/update_all_gen')
        config.add_view(post_update_all_gen, route_name='update_all_gen')
        config.add_route('transaction_has_pdf', '/transaction_has_pdf')
        config.add_view(post_transaction_has_pdf, route_name='transaction_has_pdf')
        config.add_route('download_pdf', '/download_pdf/{id}')
        config.add_view(post_download_pdf, route_name='download_pdf')
        config.add_route('gen_authors', '/gen_authors/{id}')
        config.add_view(post_gen_authors, route_name='gen_authors')

        app = config.make_wsgi_app()

    server = make_server('0.0.0.0', 3332, app)
    server.serve_forever()
