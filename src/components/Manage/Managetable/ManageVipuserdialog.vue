<template>
  <div class="app-container">
        <el-container>
           <el-aside class="vipmain-aside">
            <!--头像盒子 -->
            <div style="width:90px;height:90px;  margin:0 auto; "  v-for="item in turnAvatar(this.msg.avatar)">
            <img :src="item.url" style="width:90px;height:90px;">
            </div>
             <div  style="width:100%; text-align:center; font-size: larger; margin-top:20px;">VIP用户照片</div>
           </el-aside>
           <el-main >
            <!-- 头部VIP用户信息 -->
            <div>
            <el-row>
          <el-col :span="8">
            <span class="item-title">身份证号：</span> <span>{{ this.msg.vipUserId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">姓名：</span> <span>{{ this.msg.vipName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">性别：</span> <span>{{ (this.msg.sex=='0')?'男':'女' }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="item-title">邮箱：</span> <span>{{ this.msg.email }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">联系方式：</span> <span>{{ this.msg.phone }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">家庭住址：</span> <span>{{ this.msg.homeAddress }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="item-title">注册日期：</span> <span>{{ this.msg.createTime.substring(0, 19) }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">修改日期：</span> <span>{{ this.msg.updateTime.substring(0, 19) }}</span>
          </el-col>
          <el-col :span="8">
            <span class="item-title">办理业务员：</span> <span>{{ this.msg.username}}</span>
          </el-col>
        </el-row>
           </div>
        <el-container style="margin-top: 20px;">
            <el-aside  style="  width:120px !important; font-weight:bold;font-size:medium;">业务办理记录：</el-aside>
            <!-- VIP用户详情业务显示 -->
            <el-main style=" padding:0; height:300px;">
              <div class="businessformtable">
            <el-table :data="this.formdata" border style="width: 100%"
            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
              <el-table-column prop="businessName" label="办理业务" width="223"></el-table-column>
                <el-table-column prop="createTime" label="申请办理时间" width="170">
                  <template slot-scope="scope">
                     <span>{{scope.row.createTime.substring(0, 19) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="useTime" label="办理时长" width="120"></el-table-column>
                <el-table-column prop="username" label="办理人" width="110"></el-table-column>
                <!-- 满意度添加颜色判断 -->
                <el-table-column prop="satisfaction" label="满意度" width="110">
                    <template slot-scope="scope">
                        <div class="cellitem" :style="funtColor(scope.row.satisfaction)"> {{turnSatisfactionType(scope.row.satisfaction)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="businessFinish" label="办理人" width="120">
                     <template slot-scope="scope">
                        <div class="cellitem" :style="funtColor(scope.row.businessFinish)"> {{turnBusinessFinishType(scope.row.businessFinish)}}</div>
                      </template>
                </el-table-column>
            </el-table>
        </div>
            </el-main>
        </el-container>
           </el-main>
        </el-container> 
  </div>
</template>

<script>
export default {
  name: "ManageVipuserdialogVue",
  props:['msg','formdata'],
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
      turnSatisfactionType(type){
               if(type=='0'){type='非常满意'}
               if(type=='1'){type='满意'}
               if(type=='2'){type='不满意'}
               if(type=='3'){type='非常不满意'} 
               if(type=='4'){type=''}return type;
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
      turnAvatar(avatar){
        let imgList=[]
        if(avatar){
                    let arr = avatar.split(',')
                    arr.forEach((cur, index, arr) => {
                    if (index == arr.length - 1) {} else {
                        var obj = {}
                        obj.url = cur
                        imgList.push(obj)
                    }
                })
                }
        return imgList
      }
  },
  created() {
  },
};
</script>

<style>

   .vipmain-aside {
    width:150px !important;
    height:700px;
   }
   .el-row {
     margin:4px 2px;
     font-size: medium;
   }
   .item-title {
    display: block;
    font-weight: bold;
   }
  .img-avatar {
     width:130px;
     height:180px;
   }
</style>