<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>  
    <el-menu-item index="0">
      <!-- <img src="../assets/logo.png" alt="Logo" /> -->
    </el-menu-item>
    <el-menu-item index="/user1">首页</el-menu-item>
    <el-menu-item index="/user1/postc" >寄快递</el-menu-item>
    <el-menu-item index="/user1/getc">取快递</el-menu-item>
  </el-menu>
  
  </template>
    
  <script>
    export default {
      data() {
        return {
          activeIndex: '/user1/getc'
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
  
  .logo {
    padding: 1px;
  }
  
  .logo img {
    width: 20px; /* 设置 Logo 图片的宽度 */
    height: 20px; /* 设置 Logo 图片的高度 */
  }
  </style>