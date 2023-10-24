<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <span class="item-title">业务名称：</span> <span>{{this.msg.businessName}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">VIP姓名：</span> <span>{{this.msg.vipName}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">VIP电话：</span> <span>{{this.msg.vipPhone}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="item-title">办理人：</span> <span>{{this.msg.username}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">完成度：</span> <span
          :style="funtColor(this.msg.businessFinish)">{{turnBusinessFinishType(this.msg.businessFinish)}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">满意度：</span> <span
          :style="funtColor(this.msg.satisfaction)">{{turnSatisfactionType(this.msg.satisfaction)}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="item-title">申请办理时间：</span> <span>{{this.msg.createTime.substring(0, 19)}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">办理时长：</span> <span>{{this.msg.useTime}}</span>
      </el-col>
      <el-col :span="8">
        <span class="item-title">更新时间：</span> <span>{{this.msg.updateTime.substring(0, 19)}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="item-title">业务简介：</span> <span>{{this.msg.businessIntro}}</span>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "ManageBusinessdialogVue",
    props: ['msg'],
    data() {
      return {

      };
    },
    methods: {
      //  判断满意程度显示颜色
      funtColor(classify) {
        let classcolor = '';
        switch (classify) {
          case '2':
            classcolor = 'grey';
            break;
          case '3':
            classcolor = 'red';
            break;
          case '0':
            classcolor = 'green';
            break;
          case '1':
            classcolor = 'skyblue';
            break;
          default:
            classcolor = 'black';
            break;
        }
        return 'color:' + classcolor + ';';
      },
      // 满意度 字符转换
      turnSatisfactionType(type) {
        if (type == '0') {
          type = '非常满意'
        }
        if (type == '1') {
          type = '满意'
        }
        if (type == '2') {
          type = '不满意'
        }
        if (type == '3') {
          type = '非常不满意'
        }
        if (type == '4') {
          type = ''
        }
        return type;
      },
      //  完成度 字符转换
      turnBusinessFinishType(type) {
        if (type == '0') {
          type = '已完成'
        }
        if (type == '1') {
          type = '进行中'
        }
        if (type == '2') {
          type = '待完成'
        }
        return type;
      },
    },
    created() {},
  };
</script>

<style scoped>
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 3px 25px 30px;
  }

  .main-aside {
    width: 150px !important;
    height: 300px;
  }

  .el-row {
    margin: 20px 2px;
    font-size: medium;
  }

  .item-title {
    display: block;
    font-weight: bold;
  }
</style>