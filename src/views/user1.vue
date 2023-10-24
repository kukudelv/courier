<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>  
  <div class="logo">
    <img src="../assets/logo.png" alt="Logo">
  </div>
  <div class="menu-interval">
    <el-menu-item index="/user1">首页</el-menu-item>
  </div>
  <div class="menu-interval">
    <el-menu-item index="/user1/postc" >寄快递</el-menu-item>
  </div>
  <div class="menu-interval">
    <el-menu-item index="/user1/getc">取快递</el-menu-item>
  </div>

  <div class="right-item">
      <el-menu-item index="/user1/getc"><i class="el-icon-user"></i>个人中心</el-menu-item>
    </div>
</el-menu>

</template>
  
<script>
  export default {
    data() {
      return {
        activeIndex: '/user1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.menu {
  background-color: #333; /* 设置菜单背景颜色 */
}
.el-menu-item{
  font-size: 20px;
}
.menu-interval{
  float: left;
  margin-left: 200px;
}
/* logo大小 */
.logo {
  float:left;
  margin-left: 150px;
  margin-right: 70px;
  position: relative;
  
}
.logo img{
  width: 50px;
  height: 50px;
}

.right-item {
  float: right;
  margin-right: 200px;
}
</style>