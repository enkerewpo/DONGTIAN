import os
import json
import sqlite3
import requests
import sys
import bs4
import pymysql
from openai import OpenAI

# sqlite3
db_file = "core.db"
db_table = "paper_entry"
full_path = os.path.join(os.getcwd(), db_file)
# con = connect()
# print("Database opened successfully, db file: ", full_path)

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

def connect():
    con = pymysql.connect(host=mysql_db_url, port=mysql_db_port, user=mysql_db_user,
                          password=mysql_db_password, db=mysql_db_name, charset='utf8mb4')
    return con


OPENAI_URL = None
OPENAI_KEY = None
N = 3000

with open("openai.json", "r") as f:
    data = json.load(f)
    OPENAI_URL = data["url"]
    OPENAI_KEY = data["key"]

print("OpenAI URL: ", OPENAI_URL)
print("OpenAI Key: ", OPENAI_KEY)

client = OpenAI(api_key=OPENAI_KEY, base_url=OPENAI_URL)


def get_llm_response(prompt, history, config=None):
    """get response from the language model"""
    if config is None:
        # the normal case where we just need the dialog interaction
        history.append({"role": "user", "content": prompt})
        result = client.chat.completions.create(
            messages=history, model="gpt-4o")
        response = result.choices[0].message.content
        history.append({"role": "assistant", "content": response})
        return response
    else:
        pass


# filter all papers with pdf file
# parse the full text and send into GPT
# for generating abstract, keywords, problems, contributions, future work and discussion

def doi_url_to_num(doi_url):
    # https://doi.org/10.1145/3385412.3386011 to 3385412.3386011
    return doi_url.split("/")[-1]

def format_doi(doi):
    """ format a doi string """
    # if start with prefix like https://aa.bb.cc.dd/10.1145/1234567.8901234
    # then return 10.1145/1234567.8901234
    if doi.startswith("https://") or doi.startswith("http://"):
        last = doi.split("/")[-1]
        middle = doi.split("/")[-2]
        return middle + "/" + last
    return doi

def get_pdf_path(doi):
    num = doi_url_to_num(doi)
    return f"pdf/{num}.pdf"


def get_papers_with_pdf(con, table):
    cur = con.cursor()
    # cur.execute(f"SELECT id, doi FROM {table} WHERE pdf IS NOT NULL")
    # use mysql syntax
    cur.execute(f"SELECT id, doi FROM {table} WHERE pdf IS NOT NULL")
    data = cur.fetchall()
    cur.close()
    return data


def get_os_tmp_folder():
    # if windows, use C:\Windows\Temp
    # if linux, use /tmp
    if os.name == "nt":
        return os.path.join(os.environ["SystemRoot"], "Temp")
    else:
        return "/tmp"


def update_full_text_db(con, table, paper):
    # # if the db already has the full text, then skip
    cur = con.cursor()
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()
    assert text is not None
    text = text[0]
    if text is not None and text != "":
        # print(f"full text already exists for {paper[0]}, preview: {text[:20]}")
        return True
    # first check whether we have the blob in the database
    # cur.execute(f"SELECT pdf FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT pdf FROM {table} WHERE id = %s", (paper[0],))
    pdf = cur.fetchone()
    assert pdf is not None
    pdf = pdf[0]
    if pdf is None:
        print(f"pdf is None for {paper[0]}")
        return False

    # export the binary to systen tmp folder/tmp.pdf
    tmp_folder = get_os_tmp_folder()
    pdf_path = os.path.join(tmp_folder, "tmp.pdf")
    print("pdf path: ", pdf_path)
    with open(pdf_path, "wb") as f:
        f.write(pdf)
    # parse the pdf
    parsed_text = ""
    import pypdf
    pdf = pypdf.PdfReader(pdf_path)
    for page in pdf.pages:
        parsed_text += page.extract_text()
    # add the parsed text into the database column text
    print(f"parsed text: {parsed_text[:100]}")
    cur = con.cursor()
    # cur.execute(f"UPDATE {table} SET text = ? WHERE id = ?", (parsed_text, paper[0]))
    cur.execute(f"UPDATE {table} SET text = %s WHERE id = %s", (parsed_text, paper[0]))
    con.commit()
    cur.close()
    return True


def update_abstract_db(con, table, paper):
    cur = con.cursor()
    # if the db already has the abstract, then skip
    # cur.execute(f"SELECT abstract FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT abstract FROM {table} WHERE id = %s", (paper[0],))
    abstract = cur.fetchone()
    assert abstract is not None
    abstract = abstract[0]
    if abstract is not None and abstract != "":
        # print(f"abstract already exists for {
        #       paper[0]}, preview: {abstract[:20]}")
        return
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()[0]
    # get the abstract from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be the abstract of the paper, return in plain text"})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    response = response.replace("\n", "")
    response = response.replace("\r", "")
    print(f"abstract: {response}")
    # add the abstract into the database
    # cur.execute(f"UPDATE {table} SET abstract = ? WHERE id = ?", (response, paper[0]))
    cur.execute(f"UPDATE {table} SET abstract = %s WHERE id = %s", (response, paper[0]))
    con.commit()
    cur.close()


def update_category_db(con, table, paper):
    default_categories = [
        "Kernel Desgin and Testing",
        "Reliability and Fault Tolerance",
        "Storage",
        "Cloud",
        "Distributed Systems",
        "Machine Learning",
        "Security and Privacy",
        "Datacenter",
        "Databases",
        "Distributed Memory",
        "Non-Volatile Memory",
        "Flash Storage",
        "Scheduling",
        "Verification",
        "Serverless",
    ]
    # if the db already has the category, then skip
    cur = con.cursor()
    # cur.execute(f"SELECT gen_category FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT gen_category FROM {table} WHERE id = %s", (paper[0],))
    category = cur.fetchone()
    assert category is not None
    category = category[0]
    if category is not None and category != "" and category != "none":
        # print(f"category already exists for {
        #     paper[0]}, preview: {category[:20]}")
        return
    # get the full text
    cur = con.cursor()
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()[0]
    # get the one category from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be one category, available categories:" + ",".join(default_categories)})
    history.append(
        {"role": "user", "content": "strictly return the strings in my list, no extra words, no dialog, no extra spaces, no Category: prefix, no punctuation like : ; . ,"})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    response = response.replace("\n", "")
    response = response.replace("\r", "")
    print(f"category: {response}")
    # add the category into the database
    # cur.execute(f"UPDATE {table} SET gen_category = ? WHERE id = ?", (response, paper[0]))
    cur.execute(f"UPDATE {table} SET gen_category = %s WHERE id = %s", (response, paper[0]))
    con.commit()
    cur.close()


def update_ccs_db(con, table, paper):
    # if the db already has the ccs, then skip
    cur = con.cursor()
    # cur.execute(f"SELECT gen_ccs FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT gen_ccs FROM {table} WHERE id = %s", (paper[0],))
    ccs = cur.fetchone()
    assert ccs is not None
    ccs = ccs[0]
    if ccs is not None and ccs != "":
        # print(f"ccs already exists for {
        #     paper[0]}, preview: {ccs[0][:10]}")
        return
    cur = con.cursor()
    # get the full text
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()[0]
    # get the ccs from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be contents after \"CCS Concepts:\" in the text if available, return in plain text"})
    history.append(
        {"role": "user", "content": "for example, CCS Concepts: • Software and its engineering → Operating systems; Checkpoint / restart; • Computer systems organization → Reliability; Secondary storage organization. should return things afte CCS Concepts:"})
    history.append(
        {"role": "user", "content": "if the text does not have CCS Concepts, then create several CCS Concepts with ACM format, return in plain text, just return the CCS don't add your dialog"})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    response = response.replace("CCS Concepts:", "")
    response = response.replace("`", "")
    response = response.replace("\n", "")
    response = response.replace("\r", "")
    print(f"ccs: {response}")
    # add the ccs into the database
    # cur.execute(f"UPDATE {table} SET gen_ccs = ? WHERE id = ?", (response, paper[0]))
    cur.execute(f"UPDATE {table} SET gen_ccs = %s WHERE id = %s", (response, paper[0]))
    con.commit()
    cur.close()


def update_keywords_db(con, table, paper):
    # if the db already has the keywords, then skip
    cur = con.cursor()
    # cur.execute(f"SELECT gen_keywords FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT gen_keywords FROM {table} WHERE id = %s", (paper[0],))
    keywords = cur.fetchone()
    assert keywords is not None
    keywords = keywords[0]
    if keywords is not None and keywords != "":
        # print(f"keywords already exists for {
        #     paper[0]}, preview: {keywords[:20]}")
        return
    # get the full text
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()[0]
    # get the keywords from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be contents after \"Keywords:\" in the text if available, return in plain text, dont include \"Keywords:\""})
    history.append(
        {"role": "user", "content": "if the text does not have keywords, then summarize the text and return no more than 5 keywords, First letter of each keyword should be capitalized. just return the keywords don't add your dialog"})
    # only send the first N characters of the text
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    response = response.replace("\n", "")
    response = response.replace("\r", "")
    print(f"keywords: {response}")
    # add the keywords into the database
    # cur.execute(f"UPDATE {table} SET gen_keywords = ? WHERE id = ?", (response, paper[0]))
    cur.execute(f"UPDATE {table} SET gen_keywords = %s WHERE id = %s", (response, paper[0]))
    con.commit()
    cur.close()


def get_full_text_db(con, table, paper):
    cur = con.cursor()
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    cur.execute(f"SELECT text FROM {table} WHERE id = %s", (paper[0],))
    text = cur.fetchone()[0]
    cur.close()
    return text


def api_gen_by_id(id):
    """run the generation pipeline for a paper by id"""
    print("running generation pipeline for paper id: ", id)
    paper = (id, "")
    con = connect()
    ok = update_full_text_db(con, db_table, paper)
    if not ok:
        return False
    update_abstract_db(con, db_table, paper)
    update_keywords_db(con, db_table, paper)
    update_category_db(con, db_table, paper)
    update_ccs_db(con, db_table, paper)
    con.close()
    return True


def api_rm_gen_by_id(id):
    """clear the generated fields for a paper by id"""
    print("clearing generated fields for paper id: ", id)
    con = connect()
    cur = con.cursor()
    # cur.execute(f"UPDATE {db_table} SET abstract = NULL, gen_keywords = NULL, gen_category = NULL, gen_ccs = NULL WHERE id = ?", (id,))
    cur.execute(f"UPDATE {db_table} SET abstract = NULL, gen_keywords = NULL, gen_category = NULL, gen_ccs = NULL WHERE id = %s", (id,))
    con.commit()
    con.close()
    return True

def util_update_metadata_by_id(con, table, id):
    cur = con.cursor()
    # cur.execute(f"SELECT doi FROM {table} WHERE id = ?", (id,))
    cur.execute(f"SELECT doi FROM {table} WHERE id = %s", (id,))
    doi = cur.fetchone()[0]
    cur.close()
    if doi is None or doi == "":
        print(f"doi is None for {id}")
        return False
    doi = format_doi(doi)
    url = f"https://api.crossref.org/works/{doi}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()["message"]
        title = data["title"][0]
        subtitle = ""
        if "subtitle" in data:
            if len(data["subtitle"]) > 0:
                subtitle = data["subtitle"][0]
        if title is None or title == "":
            print(f"title is None for {id}")
            return False
        if subtitle is not None and subtitle != "":
            title += ": " + subtitle
        authors_raw = data["author"]
        authors = ""
        for author in authors_raw:
            if len(author["affiliation"]) == 0:
                authors += "[" + author["given"] + " " + author["family"] + "@none]"
            else:
                authors += "[" + author["given"] + " " + author["family"] + "@" + author["affiliation"][0]["name"] + "]"
        year = data["created"]["date-parts"][0][0]
        doi = "https://doi.org/" + data["DOI"]
        parent = data["container-title"][0]
        reference_count = data["reference-count"]
        if reference_count == None:
            cited_count = 0
        else:
            cited_count = data["reference-count"]
        cur = con.cursor()
        cur.execute(f"UPDATE {table} SET title = %s, authors = %s, year = %s, doi = %s, parent = %s, cited_count = %s WHERE id = %s", (title, authors, year, doi, parent, cited_count, id))
        con.commit()
        cur.close()
        print(f"updated metadata for {id}, title: {title}, year: {year}, doi: {doi}, parent: {parent}, cited_count: {cited_count}")
        return True
    else:
        print(f"failed to fetch paper data from CrossRef for {id}")
        return False

def util_fetch_pdf_by_id(con, table, id):
    cur = con.cursor()
    # cur.execute(f"SELECT doi FROM {table} WHERE id = ?", (id,))
    cur.execute(f"SELECT doi FROM {table} WHERE id = %s", (id,))
    doi = cur.fetchone()[0]
    cur.close()
    if doi is None or doi == "":
        print(f"doi is None for {id}")
        return False
    doi = format_doi(doi)
    # if on windows, use the python script
    if os.name == "nt":
        cmd_dir = os.path.dirname(sys.executable) + "/" + "Scripts/"
    else:
        cmd_dir = ""

    program = "scihub"
    args = f"-s {doi}"
    cmd = cmd_dir + program + " " + args
    
    print(f"triggered pdf fetch for id: {id}, doi: {doi}, cmd: {cmd}")
    last = doi.split("/")[-1]
    pdf_path = "pdf/" + last + ".pdf"
    if os.path.exists(pdf_path):
        print("pdf already fetched, replacing it in db")
        with open(pdf_path, "rb") as f:
            pdf = f.read()
            cur = con.cursor()
            # cur.execute(f"UPDATE {table} SET pdf = ? WHERE id = ?", (pdf, id))
            cur.execute(f"UPDATE {table} SET pdf = %s WHERE id = %s", (pdf, id))
            con.commit()
            print("pdf fetched and uploaded, id: " + str(id) +
                  ", size: " + str(len(pdf)) + " bytes")
            return True
    cmd_ret = os.system(cmd)
    print(f"cmd return = {cmd_ret}")
    if os.path.exists(pdf_path):
        with open(pdf_path, "rb") as f:
            if f is None:
                print("pdf not found on scihub")
                return False
            pdf = f.read()
            cur = con.cursor()
            # cur.execute(f"UPDATE {table} SET pdf = ? WHERE id = ?", (pdf, id))
            cur.execute(f"UPDATE {table} SET pdf = %s WHERE id = %s", (pdf, id))
            con.commit()
            print("pdf fetched and uploaded, id: " + str(id) +
                  ", size: " + str(len(pdf)) + " bytes")
            return True
    else:
        print("pdf not found on scihub")
        return False

def api_update_all_metadata():
    # get authors, title, ... from crossref
    print("updating all metadata...")
    # iterate over all papers
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT id, doi FROM {db_table}")
    cur.execute(f"SELECT id, doi FROM {db_table}")
    papers = cur.fetchall()
    cur.close()
    for paper in papers:
        id, doi = paper
        if doi is None or doi == "":
            print(f"doi is None for {id}")
            continue
        ok = util_update_metadata_by_id(con, db_table, id)
        if not ok:
            print(f"failed to update metadata for {id}")
    print("metadata update done")
    con.close()


def api_update_all_pdf():
    # get pdf from crossref
    print("updating all pdf...")
    # iterate over all papers
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT id, doi FROM {db_table}")
    cur.execute(f"SELECT id, doi FROM {db_table}")
    papers = cur.fetchall()
    cur.close()
    for paper in papers:
        id, doi = paper
        if doi is None or doi == "":
            print(f"doi is None for {id}")
            continue
        ok = util_fetch_pdf_by_id(con, db_table, id)
        if not ok:
            print(f"failed to fetch pdf for {id}")
    print("pdf update done")
    con.close()

def api_update_all_gen():
    # run the generation pipeline for all papers
    print("running generation pipeline for all papers...")
    con = connect()
    cur = con.cursor()
    # cur.execute(f"SELECT id FROM {db_table}")
    cur.execute(f"SELECT id FROM {db_table}")
    papers = cur.fetchall()
    cur.close()
    for paper in papers:
        id = paper[0]
        ok = api_gen_by_id(id)
        if not ok:
            print(f"failed to run generation pipeline for {id}")
    print("generation pipeline done")
    con.close()

def api_gen_authors_by_id(id):
    """run the generation pipeline for authors for a paper by id"""
    print("running generation pipeline for authors for paper id: ", id)
    con = connect()
    cur = con.cursor()
    cur.execute(f"SELECT authors FROM {db_table} WHERE id = %s", (id,))
    authors = cur.fetchone()[0]
    cur.close()
    if authors is not None and authors != "":
        print(f"authors already exists for {id}")
        return False
    # get the authors from the full text by sending it to the GPT model
    text = get_full_text_db(con, db_table, (id, ""))
    history = []
    history.append(
        {"role": "user", "content": "response should be the authors and his/her affiliation, return in format like [John Doe@MIT][Jane Doe@Harvard][Alice Doe@none]"})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    response = response.replace("\n", "")
    response = response.replace("\r", "")
    print(f"authors: {response}")
    cur = con.cursor()
    cur.execute(f"UPDATE {db_table} SET authors = %s WHERE id = %s", (response, id))
    con.commit()
    cur.close()
    con.close()
    return True

if __name__ == "__main__":
    papers = get_papers_with_pdf(con, db_table)
    for paper in papers:
        print(paper)
        update_full_text_db(con, db_table, paper)
        text = get_full_text_db(con, db_table, paper)
        # print(text[:N])
        update_abstract_db(con, db_table, paper)
        update_keywords_db(con, db_table, paper)
        update_category_db(con, db_table, paper)
        update_ccs_db(con, db_table, paper)
    con.close()
