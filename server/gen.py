import os
import json
import sqlite3
import requests
import bs4
from openai import OpenAI

# sqlite3
db_file = "core.db"
db_table = "paper_entry"
full_path = os.path.join(os.getcwd(), db_file)
con = sqlite3.connect(full_path)
print("Database opened successfully, db file: ", full_path)

OPENAI_URL = None
OPENAI_KEY = None
N = 2200

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


def get_pdf_path(doi):
    num = doi_url_to_num(doi)
    return f"pdf/{num}.pdf"


def get_papers_with_pdf(con, table):
    cur = con.cursor()
    cur.execute(f"SELECT id, doi FROM {table} WHERE pdf IS NOT NULL")
    data = cur.fetchall()
    cur.close()
    return data


def update_full_text_db(con, table, paper):
    # # if the db already has the full text, then skip
    # cur = con.cursor()
    # cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    # text = cur.fetchone()
    # if text is not None:
    #     return
    # first read the pdf file
    id, doi = paper
    pdf_path = get_pdf_path(doi)
    print(pdf_path)
    parsed_text = ""
    import pypdf
    pdf = pypdf.PdfReader(pdf_path)
    for page in pdf.pages:
        parsed_text += page.extract_text()
    # add the parsed text into the database column text
    cur = con.cursor()
    cur.execute(f"UPDATE {table} SET text = ? WHERE id = ?", (parsed_text, id))
    con.commit()
    cur.close()


def update_abstract_db(con, table, paper):
    cur = con.cursor()
    cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    text = cur.fetchone()[0]
    # get the abstract from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be the abstract of the paper, return in plain text"})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    print(f"abstract: {response}")
    # add the abstract into the database
    cur.execute(
        f"UPDATE {table} SET abstract = ? WHERE id = ?", (response, paper[0]))
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

    # get the full text
    cur = con.cursor()
    cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    text = cur.fetchone()[0]
    # get the one category from the full text by sending it to the GPT model
    history = []
    history.append(
        {"role": "user", "content": "response should be one category, available categories:" + ",".join(default_categories)})
    response = get_llm_response(text[:N], history)
    response = response.strip()
    response = response.replace("*", "")
    print(f"category: {response}")
    # add the category into the database
    cur.execute(
        f"UPDATE {table} SET gen_category = ? WHERE id = ?", (response, paper[0]))
    con.commit()
    cur.close()


def update_ccs_db(con, table, paper):
    cur = con.cursor()
    # get the full text
    cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
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
    print(f"ccs: {response}")
    # add the ccs into the database
    cur.execute(
        f"UPDATE {table} SET gen_ccs = ? WHERE id = ?", (response, paper[0]))


def update_keywords_db(con, table, paper):
    # if the db already has the keywords, then skip
    cur = con.cursor()
    # cur.execute(f"SELECT gen_keywords FROM {table} WHERE id = ?", (paper[0],))
    # keywords = cur.fetchone()
    # if keywords is not None:
    #     return
    # get the full text
    cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
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
    print(f"keywords: {response}")
    # add the keywords into the database
    cur.execute(
        f"UPDATE {table} SET gen_keywords = ? WHERE id = ?", (response, paper[0]))
    con.commit()
    cur.close()


def get_full_text_db(con, table, paper):
    cur = con.cursor()
    cur.execute(f"SELECT text FROM {table} WHERE id = ?", (paper[0],))
    text = cur.fetchone()[0]
    cur.close()
    return text


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
