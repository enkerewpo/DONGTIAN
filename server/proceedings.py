import os
import json
import sqlite3
import requests
import bs4

# proceeding_input = [
#     "sosp_source.json"
# ]

# find all json files in the directory ending with _source.json
proceeding_input = []
for file in os.listdir():
    if file.endswith("_source.json"):
        proceeding_input.append(file)

print("proceeding_input: ", proceeding_input)

# sqlite3
db_file = "core.db"
db_table = "paper_entry"
full_path = os.path.join(os.getcwd(), db_file)
con = sqlite3.connect(full_path)
print("Database opened successfully, db file: ", full_path)


# crossref
# https://api.crossref.org/work/{doi}

# id - paper id
# title - paper title
# authors - paper authors
# doi - paper doi
# year - paper year
# parent - caption
# abstract - paper abstract
# reference_raw - paper reference
# text - paper text
# pdf - paper pdf blob


def insert_or_update(con, table, caption, year, ptitle, pdoi, authors, reference_raw, pdf=None):
    cur = con.cursor()
    # if exists, update it
    # if not, insert it
    cur.execute(
        f"SELECT * FROM {table} WHERE title = '{ptitle}' AND doi = '{pdoi}'")
    data = cur.fetchall()
    if len(data) == 0:
        cur.execute(
            f"INSERT INTO {table} (parent, year, title, doi, authors, reference_raw, pdf) VALUES (?, ?, ?, ?, ?, ?, ?)", (caption, year, ptitle, pdoi, authors, reference_raw, pdf))
    else:
        cur.execute(
            f"UPDATE {table} SET parent = ?, year = ?, authors = ?, reference_raw = ?, pdf = ? WHERE title = ? AND doi = ?", (caption, year, authors, reference_raw, pdf, ptitle, pdoi))
    con.commit()
    cur.close()


def generate_pdf_filename(title):
    title = title.replace(" ", "_")
    title = title.replace(":", "_")
    title = title.replace("/", "_")
    title = title.replace("\\", "_")
    title = title.replace("?", "_")
    title = title.replace("*", "_")
    title = title.replace("<", "_")
    title = title.replace(">", "_")
    title = title.replace("|", "_")
    title = title.replace("\"", "_")
    # append parent_year to the title
    title = f"{caption}_{year}_{title}"
    title = title.lower()
    title = title.replace(" ", "_")
    title = title.replace("__", "_")
    return title


for input_file in proceeding_input:
    print("processing: ", input_file)
    with open(input_file, "r") as f:
        data = json.load(f)
        caption = data["caption"]
        proceeding_entrys = data["proceeding_entrys"]
        for proceeding_entry in proceeding_entrys:
            title = proceeding_entry["title"]
            # if find '23 then its 2023, '22 then its 2022, etc
            prime_location = title.find("'")
            suffix = title[prime_location:prime_location+3]
            suffix = suffix.replace("'", "")
            suffix = int(suffix)
            if suffix >= 60:
                year = 1900 + suffix
            else:
                year = 2000 + suffix
            paper_entrys = proceeding_entry["paper_entrys"]
            for p in paper_entrys:

                ptitle = p["title"]
                pdoi = p["doi"]

                if pdoi == '' or pdoi is None:
                    print("no doi for paper: ", ptitle)
                    # /works?query.title=room+at+the+bottom
                    # ask crossref for the paper metadata using title words
                    # to lower case
                    title_words = ptitle.lower()
                    title_words = ptitle.split(" ")
                    for i in range(len(title_words)):
                        title_words[i] = title_words[i].lower()
                        title_words[i] = title_words[i].replace(":", "")
                        title_words[i] = title_words[i].replace("?", "")
                        title_words[i] = title_words[i].replace("!", "")
                    # just use first 5 words
                    title_words = title_words
                    title_words = "+".join(title_words)
                    # ask crossref for the paper metadata
                    request_url = f"https://api.crossref.org/works?query.title={
                        title_words}"
                    print("[DEBUG] request_url: ", request_url)
                    response = requests.get(request_url)
                else:
                    print("retrieving metadata for paper: ", ptitle)
                    request_url = f"https://api.crossref.org/works/{pdoi}"
                    # ask crossref for the paper metadata
                    response = requests.get(request_url)

                if response.status_code == 200:
                    data = response.json()
                    message_type = data["message-type"]
                    if message_type == "work-list":
                        data = data["message"]["items"][0]
                    else:
                        data = data["message"]
                    # print(f"[DEBUG] data: {data}")
                    # something like 10.1145/3447928.3456709
                    doi_crossref = data["DOI"]
                    doi_url_crossref = "https://doi.org/" + doi_crossref
                    if pdoi == '' or pdoi is None:
                        pdoi = doi_url_crossref
                        print(f"set pdoi to {pdoi}")
                    p_type = data["type"]
                    p_created = data["created"]
                    year = p_created["date-parts"][0][0]
                    authors = data["author"]
                    author_str = ""
                    for author in authors:
                        given = author["given"]
                        family = author["family"]
                        affiliations = author["affiliation"]
                        for affiliation in affiliations:
                            affiliation_name = affiliation["name"]
                        author_str += f"[{given} {family}@{affiliation_name}]"
                        author_str += ", "
                    # remove the last comma
                    author_str = author_str[:-2]
                    # check whether the paper has a reference
                    if "reference" in data:
                        reference_raw = data["reference"]
                        reference_raw_str = str(reference_raw)
                    else:
                        reference_raw_str = ""                     
                    # download the pdf
                    # doi like https://doi.org/10.1145/3447928.3456709
                    # doi nums are like 10.1145/3447928.3456709
                    doi_nums_raw = pdoi.replace("https://doi.org/", "")
                    doi_nums_suffix = doi_nums_raw.split("/")[1]
                    check_pdf_name = doi_nums_suffix + \
                        ".pdf"  # check ./pdf/{check_pdf_name}
                    check_pdf_path = f"pdf/{check_pdf_name}"

                    pdf_raw_blob = None

                    if os.path.exists(check_pdf_path):
                        print(f"pdf already exists: {check_pdf_name}")
                        with open(check_pdf_path, "rb") as f:
                            pdf_raw_blob = f.read()
                    else:
                        # first quick check whether it's on scihub
                        # url = https://www.wellesu.com/{doi}
                        url = f"https://www.wellesu.com/{doi_nums_raw}"
                        response = requests.get(url)
                        soup = bs4.BeautifulSoup(response.text, "html.parser")
                        # check if it's contains "Unfortunatly"
                        # print(soup.text)
                        if "Unfortunately" in soup.text or "不在" in soup.text:
                            print(f"paper with doi {
                                doi_nums_raw} not found on scihub")
                        else:
                            print(f"paper with doi {
                                doi_nums_raw} found on scihub")
                            # call cmd scihub -s {doi}
                            os.system(f"scihub -s {doi_nums_raw}")
                            # check the pdf/{check_pdf_name} again to see if downloaded
                            if os.path.exists(check_pdf_path):
                                print(f"pdf downloaded: {check_pdf_name}")
                                with open(check_pdf_path, "rb") as f:
                                    pdf_raw_blob = f.read()
                                # # zip the blob
                                # import zipfile
                                # with zipfile.ZipFile(f"pdf/{check_pdf_name}.zip", "w") as zf:
                                #     zf.write(check_pdf_path)
                                # zip_blob = None
                                # with open(f"pdf/{check_pdf_name}.zip", "rb") as f:
                                #     zip_blob = f.read()
                            else:
                                print(f"error downloading pdf: {
                                    check_pdf_name}")

                    insert_or_update(
                        con=con, table=db_table, caption=caption, year=year, ptitle=ptitle, pdoi=pdoi, authors=author_str, reference_raw=reference_raw_str, pdf=pdf_raw_blob)
                else:
                    print("error: ", response.status_code)

print("finished, goodbye!")
