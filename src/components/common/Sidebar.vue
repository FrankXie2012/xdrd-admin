<template>
<div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index">
                    <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
        </el-menu-item>
        </el-submenu>
        </template>
        <template v-else>
                <el-menu-item :index="item.index">
                    <i :class="item.icon"></i>{{ item.title }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    items() {
      const _newsList = {
        icon: "el-icon-menu",
        index: "newsList",
        title: "文章列表"
      };
      // const _images = {
      //   icon: "el-icon-picture",
      //   index: "images",
      //   title: "人大概览"
      // };
      const _news = {
        icon: "el-icon-edit",
        index: "news",
        title: "发布文章"
      };
      const _newsAudit = {
        icon: "el-icon-view",
        index: "newsAudit",
        title: "文章审阅"
      };
      const _links = {
        icon: "el-icon-more",
        index: "links",
        title: "友情链接"
      };
      const _users = {
        icon: "el-icon-star-off",
        index: "users",
        title: "用户管理"
      };
      const _person = {
        icon: "el-icon-setting",
        index: "person",
        title: "账号信息"
      };
      switch (this.$store.state.role) {
        case "admin":
          return [
            _newsList,
            // _images,
            _news,
            _newsAudit,
            _links,
            _users,
            _person
          ];
        case "audit":
          return [_newsList, _newsAudit, _person];
        case "publish":
          return [_newsList, _news, _person];
      }
    },
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 170px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}

.sidebar > ul {
  height: 100%;
}
</style>
