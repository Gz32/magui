<template>
  <div class="app">
    <el-container>
      <!-- 左右结构 -->
      <!--
      <el-aside class="app-aside app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img :width="isCollapse ? '60' : '60'" height="60" src="@/assets/logo.png"/>
        </div>
        <div>
          <el-menu class="el-menu-vertical" router :default-active="$route.path" :collapse="isCollapse" @open="handleOpen">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            
            <el-menu-item index="live">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">实时监控</span>
            </el-menu-item>
            <el-menu-item index="live2x2">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">实时监控分屏</span>
            </el-menu-item>
            <el-menu-item index="playback">
              <i class="el-icon-menu"></i>
              <span slot="title">录像回放</span>
            </el-menu-item>
            <el-menu-item index="playback4">
              <i class="el-icon-menu"></i>
              <span slot="title">录像回放分屏</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      -->
      <!-- 上下结构 -->
      <el-container>
        <el-header class="app-header">
          <div style="width: 48px;cursor:pointer;" @click.prevent="toggleSideBar">
            <i class="el-icon-d-arrow-left" v-show="!isCollapse"></i>
            <i class="el-icon-d-arrow-right" v-show="isCollapse"></i>
          </div>
          <el-menu class="el-menu-horizontal tab-page" mode="horizontal" router :default-active="$route.path" active-text-color="#409EFF" @select="handleSelect">
            <el-menu-item index="1">
              <a href="#">订单管理</a>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>           

            <el-menu-item index="live">
              <i class="el-icon-video-camera-solid"></i>
              <span slot="title">实时监控</span>
            </el-menu-item>
            <el-menu-item index="playback">
              <i class="el-icon-video-camera"></i>
              <span slot="title">录像回放</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-info"></i>
              <span slot="title">电子地图</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统管理</span>
            </el-menu-item>
          </el-menu>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">{{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view />
          </template>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'container-app',
  data() {
    return {
      username: '',
      isCollapse: false
    }
  },
  components: {
  },
  mounted: function () {
    let user = sessionStorage.getItem('username');
    if (user) {
      this.username = user;
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {}).then((result) => {
        sessionStorage.removeItem('username');
        this.$router.push('/login');
      }).catch((err) => {
      });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
</style>
