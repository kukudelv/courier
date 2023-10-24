<template>
    <div class="manageaside">
      <el-aside width="100%" height="700px"> 
        <el-menu router :default-openeds="['1']" :default-active="this.$route.path.slice(1)" background="white"
          text-color="rgb(190, 190, 190)" active-text-color="rgb(0, 90, 149)">
  
          <el-submenu index="1">
            <template slot="title">
              <span style="margin-left:20px; font-size: 18px;"><i class="el-icon-user-solid"></i>人员管理</span>
            </template>
            <el-menu-item index="AdminList">业务员管理</el-menu-item>
            <el-menu-item index="VipuserList">VIP客户管理</el-menu-item>
          </el-submenu> 
          <el-submenu index="2">
            <template slot="title">
              <span style="margin-left:20px; font-size: 18px;"><i class="el-icon-s-tools"></i>设备管理</span>
            </template>
            <el-menu-item index="CameraList">人脸识别摄像头</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span style="margin-left:20px; font-size: 18px;"><i class="el-icon-tickets"></i>业务管理</span>
            </template>
            <el-menu-item index="BusinessList">业务记录列表</el-menu-item>
            <el-menu-item index="FileList">业务文件列表</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
     
    </div>
  </template>
  
  <script>
    export default {
      name: "ManageAside",
      data() {
        return {
           messageValue:101,
        }
      },
      methods: {
  
      }
    }
  </script>
  
  <style scoped>
    .manageaside {
      height: 100%;
      width: 250px;
      font-size: large;
      font-weight: bolder;
    }
  
    .el-menu {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 700px;
      text-align: left;
      border-right: 0 !important;
    }
  
    .el-menu-item {
    margin-left: 5%;
    font-size: 18px;
  }
  </style>