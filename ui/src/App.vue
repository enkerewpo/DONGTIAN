<template>
  <!-- <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav> -->

  <VaNavbar color="#8B0012" id="navbar">
    <template #left>
      <VaNavbarItem class="logo noselect">
        &nbsp;&nbsp;&nbsp;
        <span class="navbar-title" @click="$router.push('/')">洞天论文知识图谱系统</span>
        &nbsp;&nbsp;&nbsp;
        <span class="navbar-subtitle">powered by wheatfox(enkerewpo@hotmail.com)</span>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem v-for="item in items" :key="item.url" :to="item.url" :active="item.active" class="mr-3">
        <template #default>
          <!-- clickable va-icon -->
          <router-link :to="item.url" tag="a" class="top-menu-item">
            <!-- {{ item.title }} -->
            <va-icon :name="item.icon" />
          </router-link>
        </template>
      </VaNavbarItem>
    </template>
  </VaNavbar>

  <main>
    <RouterView />
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { VaNavbar, VaNavbarItem } from 'vuestic-ui'

export default {
  components: {
    RouterLink,
    RouterView,
    VaNavbar,
    VaNavbarItem,
  },
  data() {
    return {
      items: [
        { title: "主页", icon: "dashboard", url: "/" },
        { title: "论文列表", icon: "book", active: true, url: "/papers" },
        { title: "关于", icon: "info", url: "/about" },
      ],
    };
  },
}

</script>

<style>
.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

/* top menu item */
/* hover is green, pressing is blue */
.top-menu-item {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.top-menu-item:hover {
  background-color: white;
  color: black;
}

.top-menu-item:active {
  background-color: black;
  color: white;
}

.router-link-exact-active {
  background-color: white;
  color: black;
}


/* 样式调整 */
.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 左对齐 */
  margin-left: 20px;
}

.navbar-title {
  color: white;
  font-size: 1.5rem;
  margin-top: -9px;
  /* 默认字体大小 */
  font-weight: bold;
  cursor: pointer;
}

.navbar-subtitle {
  font-size: 0.6rem;
  /* 字体更小 */
  color: white;
  text-align: left;
  /* 左对齐 */
  margin-left: 3px;
  margin-top: -12px;
  /* 与标题稍微间隔 */
}

/* 手机屏幕上的调整 */
@media (max-width: 768px) {
  .navbar-title {
    margin: auto;
    font-size: 1.4rem;
  }

  .navbar-subtitle {
    display: none;
  }

  .logo {
    padding: auto;
  }
}

.sidebar-container {
  flex-shrink: 0;
}

.sidebar {
  padding-top: .5rem;
  width: auto;
}
</style>