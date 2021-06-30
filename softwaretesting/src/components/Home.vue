<template>
  <el-container class="home-container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '30px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-menu-item
            :index="'/' + pathList[index]"
            v-for="(item,index) in menuList"
            :key="index"
            @click="saveNavState('/'+pathList[index])"
          >
            <template slot="title">
              <!-- 文本 -->
              <span>{{ item }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
          <router-view :activePath="activePath"></router-view>
      </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menuList: ['三角形问题','电脑销售问题','电信收费问题','万年历问题'],
      //路径列表
      pathList:['triangle','commission','charge','calendar'],
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: "",
    };
  },
  created() {
  },
  updated () {
    console.log(this.activePath);  
  },
  methods: {
    //点击按钮，切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  transition: all 0.5s;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px; //在块元素中，当内容只有一行时，可以通过设置行高等于height实现垂直居中
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em; //文字水平间距 Xem是当前文字font-size的X倍
  cursor: pointer; //鼠标悬停变为手
}
</style>