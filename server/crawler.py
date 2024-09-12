

# https://dl.acm.org/conference/sosp/proceedings will list all the proceedings of SOSP
# https://dl.acm.org/conference/osdi/proceedings
# find all links with caption SOSP 'xx

# https://api.crossref.org/swagger-ui/index.html

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import jsonpickle
import re
import os


class PaperEntry:
    def __init__(self, title, authors, abstract, url, doi):
        self.title = title
        self.authors = authors
        self.abstract = abstract
        self.url = url
        self.doi = doi


class ProceedingEntry:
    def __init__(self, title, year, url):
        self.title = title
        self.year = year
        self.url = url
        self.paper_entrys = []

    def add_paper_entry(self, paper_entry):
        self.paper_entrys.append(paper_entry)


class ProceedingSource:
    def __init__(self, url, caption):
        self.url = url
        self.caption = caption
        self.proceeding_entrys = []

    def add_proceeding_entry(self, proceeding_entry):
        self.proceeding_entrys.append(proceeding_entry)

    def get_base_url(self):
        # if url is http://www.example.com/something/somethingelse
        # return http://www.example.com
        return re.match(r'(https?://[^/]+)', self.url).group(1)


sosp_source = ProceedingSource(
    'https://dl.acm.org/conference/sosp/proceedings', 'SOSP')

# first get the proceeding entries


global_proceeding_source = [sosp_source]


def get_proceeding_entries(ps):
    page = requests.get(ps.url)
    soup = BeautifulSoup(page.content, 'html.parser')
    links = soup.find_all('a')
    for link in links:
        if re.match(r'SOSP \'\d\d:', link.text):
            title = link.text
            url = link['href']
            # if url is relative, make it absolute
            if url.startswith('/'):
                url = ps.get_base_url() + url
            ps.add_proceeding_entry(ProceedingEntry(title, 1900, url))


def get_paper_entries(pe):
    print(f'Getting paper entries for {pe.title} {pe.year} {pe.url}')
    driver = webdriver.Firefox()
    driver.get(pe.url)

    # wait for the page to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'issue-item')))

    # click id=CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll to accept cookies
    cb = driver.find_element(
        By.ID, 'CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
    cb.location_once_scrolled_into_view
    cb.click()

    # hide id=CybotCookiebotDialog
    driver.execute_script(
        'document.getElementById("CybotCookiebotDialog").style.display = "none";')
    # hide  <div class="responsive-menu-container">
    driver.execute_script(
        'document.getElementsByClassName("responsive-menu-container")[0].style.display = "none";')

    # click all <a> with id prefix "heading"
    session_links = driver.find_elements(
        By.XPATH, '//a[starts-with(@id, "heading")]')

    first = True

    for session_link in session_links:
        if first:
            first = False  # first section is automatically expanded by default
            continue
        print(f'Clicking {session_link.text}')
        session_link.location_once_scrolled_into_view
        # session_link.click()
        # inject js to click the link
        driver.execute_script('arguments[0].click();', session_link)
        # wait 3 seconds for the page to load, use python sleep instead of selenium wait
        import time
        time.sleep(3)

    issue_items = driver.find_elements(By.CLASS_NAME, 'issue-item')
    for issue_item in issue_items:
        title_h5 = issue_item.find_element(By.CLASS_NAME, 'issue-item__title')
        title_text = title_h5.text
        print(f'Found paper {title_text}, processing...', end='')
        detail = issue_item.find_element(By.CLASS_NAME, 'issue-item__detail')
        doi_url = detail.find_element(
            By.TAG_NAME, 'a').get_attribute('href')
        # inner we have <a> with href to the paper
        title_url = title_h5.find_element(
            By.TAG_NAME, 'a').get_attribute('href')
        # add paper entry
        pe.add_paper_entry(PaperEntry(title_text, '', '', title_url, doi_url))
        print(f' done, doi: {doi_url}')

    print(f'Found {len(pe.paper_entrys)} paper entries')
    driver.close()


# get_proceeding_entries(sosp_source)

# print(f'Found {len(sosp_source.proceeding_entrys)} proceeding entries')

# # get recent 5 proceeding entries
# for pe in sosp_source.proceeding_entrys[:4]:
#     get_paper_entries(pe)
#     # save the data with pretty print
#     with open('sosp_source.json', 'w') as f:
#         f.write(jsonpickle.dumps(sosp_source, indent=2))

for ps in global_proceeding_source:
    get_proceeding_entries(ps)
    print(f'Found {len(ps.proceeding_entrys)} proceeding entries')
    for pe in ps.proceeding_entrys:
        get_paper_entries(pe)
        # save the data with pretty print, caption to non-capitalize
        prefix = ps.caption.lower()
        with open(f'{prefix}_source.json', 'w') as f:
            f.write(jsonpickle.dumps(ps, indent=2))
