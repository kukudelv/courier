<template>
    <div>
    <el-container>
        <!-- 弹出框照片侧边栏 -->
        <el-aside>
            <!--头像盒子 -->
            <div style="width:130px;height:180px;  margin:0 auto; ">
            <img :src=this.msg.avatar class="img-avatar">
            </div>
             <div  style="width:100%; text-align:center; font-size: larger; margin-top:20px;">管理员照片</div>
        </el-aside>
        <el-main>
              <div>
                <table class="admin-table" >
                    <tr>
                        <th>工号</th> <td>{{this.msg.number}}</td>
                        <th>姓名</th> <td>{{this.msg.username}}</td>
                        <th>性别</th> <td>{{(this.msg.sex== '0')?'男':'女'}}</td>
                    </tr>
                    <tr>
                        <th>邮箱</th> <td>{{this.msg.email}}</td>
                        <th>联系方式</th> <td>{{this.msg.phone}}</td>
                        <th>所属部门</th> <td>{{this.msg.sector}}</td>
                    </tr>
                    <tr>
                        <th>出生日期</th> <td>{{this.msg.birthday}}</td>
                        <th>职务</th> <td >{{this.turnType(this.msg.userType)}}</td>
                        <th>状态</th> <td>{{(this.msg.status== '0')?'离职':'在职'}}</td>
                    </tr>
                </table>
              </div>
        </el-main>
    </el-container>  
</div>     
 </template>

<script>
  export default {
      name: "ManageAdmindialogVue",
      props:['msg'],
      data() {
        return {

        }
      },
      methods: {
          turnType(type){
            if(type== '0'){type='超级管理员'}
          if( type== '1'){type='部门管理员'}
          if(type== '2' ){type='业务员'}
          return  type
          }
      },
      created(){               
      }
    }
</script>

<style scoped>
     .el-aside {
    width:150px !important;
    height:250px;
   }
   .img-avatar {
     width:130px;
     height:180px;
   }
   .el-main {
    background-color: white;
   }
   .admin-table {
      border-collapse:collapse;
      border:px solid rgb(190, 190, 190);
   }
   .admin-table th {
    color:grey;
    height:50px;
    width:100px;
    padding-left: 10px;
     border: 2px solid rgb(190, 190, 190);
   }
   .admin-table td {
    color:grey;
    height:50px;
    width:150px;
    padding-left: 5px;
     border: 2px solid rgb(190, 190, 190);
   }
</style>

