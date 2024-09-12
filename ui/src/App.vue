<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useGlobalConfig } from 'vuestic-ui';

// Define a reference for storing the paper entries data.
const paperEntries = ref([]);

let category_list = [];
let map_category_to_color = {};

function random_color(str) {
  // hash the string to a number, so that the color is determined by the string
  let hash = 0;
  if (str == null || str.length == 0) str = "default";
  let len = str.length;
  for (let i = 0; i < len; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // generate a random color
  let c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

function process(data) {
  console.log(data);
  let r = [];
  category_list = [];
  for (let i = 0; i < data.length; i++) {
    let entry = data[i];
    let authors = entry.authors;
    let keywords = entry.keywords;
    let authors_str = entry.authors;
    let keywords_str = entry.keywords;
    let has_pdf = entry.has_pdf;
    let pdf_open_url = "/api/get_pdf/" + entry.id;
    let abstract_open_url = "/api/get_abstract/" + entry.id;
    let category = entry.category;
    let ccs_concepts = entry.ccs;
    if (!category_list.includes(category)) {
      category_list.push(category);
      map_category_to_color[category] = random_color(category);
    }
    // https://doi.org/10.1145/3385412.3385980 to 10.1145/3385412.3385980
    let doi_num = entry.doi.split("/").slice(-1)[0];
    r.push({
      // id: entry.id,
      title: entry.title,
      parent: entry.parent,
      year: entry.year,
      doi: entry.doi,
      doi_num: doi_num,
      // authors: authors_str,
      keywords: keywords_str,
      has_pdf: has_pdf,
      category: category,
      category_color: map_category_to_color[category],
      ccs: ccs_concepts,
      pdf_open_url: pdf_open_url,
      abstract_open_url: abstract_open_url,
    });
  }

  // sort by has_pdf, then by year
  r.sort((a, b) => {
    if (a.has_pdf && !b.has_pdf) return -1;
    if (!a.has_pdf && b.has_pdf) return 1;
    if (a.year < b.year) return 1;
    if (a.year > b.year) return -1;
    return 0;
  });

  return r;
}

export default {
  setup() {
    const globalConfig = useGlobalConfig();

    // Fetch the paper entries data when the component is mounted.
    onMounted(async () => {
      try {
        axios.defaults.baseURL = '/api';
        const response = await axios.get('get_paper_entries');
        let r = process(response.data);
        paperEntries.value = r;
      } catch (error) {
        console.error("Error fetching paper entries:", error);
      }
    });

    return {
      globalConfig,
      paperEntries,
    };
  },
  data() {
    return {
      items: [
        { title: "主页", icon: "dashboard" },
        { title: "论文数据库", icon: "room", active: true },
      ],
      minimized: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.minimized = !this.minimized;
    },
    openPdf(pdf_open_url) {
      console.log(pdf_open_url);
      window.open(pdf_open_url, '_blank');
    },
    openAbstract(abstract_open_url) {
      console.log(abstract_open_url);
      window.open(abstract_open_url, '_blank');
    },
  }
};
</script>

<template>
  <VaNavbar color="#8B0012" id="navbar">
    <template #left>
      <VaNavbarItem class="logo">
        <!-- <img src="https://portal.pku.edu.cn/portal2017/img/pkulogo_white.svg" alt="PKU" class="h-8" height="64" /> -->
        &nbsp;&nbsp;&nbsp;
        洞天论文知识图谱系统
        &nbsp;&nbsp;&nbsp;
        <span style="font-size: 0.8rem; color: white;">powered by wheatfox(enkerewpo@hotmail.com)</span>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        使用说明
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <div class="app">

    <div class="sidebar-container">
      <VaSidebar :minimized="minimized" width="11rem" minimized-width="64px">
        <template v-for="item in items" :key="item.title">
          <VaSidebarItem :active="item.active">
            <VaSidebarItemContent>
              <VaIcon :name="item.icon" />
              <VaSidebarItemTitle>
                {{ item.title }}
              </VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </template>
      </VaSidebar>
    </div>

    <div class="content">
      <div class="table-container">
        <table class="va-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Parent</th>
              <th>Year</th>
              <th>DOI</th>
              <th>Category</th>
              <th>Keywords</th>
              <th>CCS</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in paperEntries" :key="p.id">
              <td>{{ p.title }}</td>
              <td>{{ p.parent }}</td>
              <td>{{ p.year }}</td>
              <td> <a :href="p.doi" target="_blank" class="va-link">{{ p.doi_num }}</a> </td>
              <td>
                <VaBadge :text="p.category" :color="p.category_color" />
              </td>
              <td>{{ p.keywords }}</td>
              <td>{{ p.ccs }}</td>
              <td>
                <!-- if has pdf, show the button -->
                <VaButton v-if="p.has_pdf" size="small" @click="openPdf(p.pdf_open_url)" color="primary">PDF
                </VaButton>
                <!-- if no pdf, show the disabled button -->
                <VaButton v-else size="small" disabled>PDF</VaButton>
              </td>
              <td>
                <VaButton size="small" @click="openAbstract(p.abstract_open_url)">Abstract</VaButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}

#navbar {
  height: 6rem;
}

.app {
  display: flex;
  /* Use flexbox to layout the main content area， app height + header height = 100vh */
  height: calc(100vh - 6rem);
  font-size: 14px;
}

.sidebar-container {
  flex-shrink: 0;
}

.sidebar {
  padding-top: .5rem;
  width: auto;
}

.table-container {
  padding: 1rem;
}

.content {
  flex-grow: 1;
  padding: .5rem;
  overflow-x: auto;
  overflow-y: auto;
  /* Allow vertical scrolling in the content area */
  max-width: 100%;
  /* Ensure the content doesn't exceed the available width */
}
</style>
