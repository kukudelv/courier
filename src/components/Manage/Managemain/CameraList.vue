<template>
  <div class="cameraList-main">
    <div class="header" style="font-size: larger;">人脸识别摄像头列表 </div>
    <div class="contain" style="margin-top: 20px; ">
      <el-input placeholder="请输入设备名称" suffix-icon="el-icon-monitor" v-model="input1" size="medium"></el-input>
      <el-input placeholder="请输入IP地址" suffix-icon="el-icon-key" v-model="input2" size="medium"></el-input>
      <el-input placeholder="请输入设备类型" suffix-icon="el-icon-key" v-model="input3" size="medium"></el-input>
      <div style="margin-left:20px; display: inline;">
        <el-button type="primary" icon="el-icon-delete" @click="cameraReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="cameraSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="cameraAdd" circle></el-button>
      </div>
    </div>
    <!-- 主页表格 -->
      <div class="cameraformtable">
        <el-table :data="cameraList.slice((currpage-1)*pagesize,currpage*pagesize)"  border style="width: 100%"
        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column lable='序号' type="index" width="50"></el-table-column>
          <el-table-column prop="cameraName" label="设备名称" width="140"></el-table-column>
          <el-table-column prop="cameraClass" label="品牌型号" width="120"></el-table-column>
          <el-table-column prop="cameraType" label="类型" width="110"></el-table-column>
          <el-table-column prop="identification" label="识别码" width="150"></el-table-column>
          <el-table-column prop="ipAddress" label="IP地址" width="170"></el-table-column>
          <el-table-column prop="installAddress" label="安装位置" width="130"></el-table-column>
          <el-table-column prop="sector" label="所属部门" width="130"></el-table-column>
          <!-- 状态加个颜色判断 -->
          <el-table-column prop="state" label="状态" width="100">
            <template slot-scope="scope">   
              <div class="cellitem" :style="funtColor(scope.row.state)" > {{turnState(scope.row.state)}}</div>
          </template>
          </el-table-column>
          <el-table-column prop="option" label="操作" width="150">
            <template slot-scope="scope">
              <div class="option-item1" @click="changeCamera(scope.row)">修改</div>
              <div class="option-item2" @click="deleteCamera(scope.row)">删除</div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加或修改设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="55%" append-to-body>
      <el-form ref="form" :model="form"  label-width="80px" :rules="$rules.cameraListCheck">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="cameraName">
              <el-input v-model="form.cameraName" placeholder="请输入设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌型号" prop="cameraClass">
              <el-input v-model="form.cameraClass" placeholder="请输入品牌型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="cameraType">
              <el-input v-model="form.cameraType" placeholder="请输入设备类型" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="识别码" prop="identification">
              <el-input v-model="form.identification" placeholder="请输入识别码" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="IP地址" prop="ipAddress">
              <el-input v-model="form.ipAddress" placeholder="请输入设备IP地址" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装位置" prop="installAddress">
              <el-input v-model="form.installAddress" placeholder="请输入安装位置" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="sector">
              <el-input v-model="form.sector" placeholder="请输入所属部门" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-select v-model="form.state"  placeholder="请选择设备状态">
                <el-option label="异常" value='2'></el-option>
                <el-option label="离线" value='1'></el-option>
                <el-option label="正常" value='0'></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="open = false;">取 消</el-button>
      </div>
    </el-dialog>
        <!-- 分页 -->
        <div class="block">
                <el-pagination :current-page="currpage" @current-change="handleCurrentChange" :page-size="pagesize" @size-change="handleSizeChange"
                    layout="prev, pager, next,jumper" :total="cameraList.length" style="float:right;bottom:0;">
                </el-pagination>
            </div>
      </div>
  </div>
</template>
<script>
import {
        GetCamerainfoList,
        DeleteCamerainfo,
        GetcameraSearch,
        PostsaveCamerainfo
    } from "@/api/manage/manage";
  export default {
    data() {
      return {
        // 设备名称
        input1: this.input1,
        // 设备IP地址
        input2: this.input2,
        // 设备类型
        input3: this.input3,
        // 当前页
        currpage: 1,
        // 页面表格数
        pagesize: 10,
        // 当前超级管理员ID
        userId: this.$store.getters.userId,
         // 弹出层标题
       title: "123",
      // 是否显示弹出层
       open: false,
      // 是否展开，默认全部展开
       isExpandAll: true,
        // 表单参数
       form: {},
        cameraList: [{
            cameraName: '404指纹机',
            sector: 'EIC研究室',
            cameraClass: 'ZKE',
            installAddress: '2#101后门',
            ipAddress: '192.196.12.1',
            identification: 'EIC-FP-001',
            state:'正常',
            cameraType: '指纹机'
          },{
            cameraName: '484指纹机',
            sector: 'EIC研究室',
            cameraClass: 'ZKE',
            installAddress: '2#101后门',
            ipAddress: '192.196.12.1',
            identification: 'EIC-FP-001',
            state:'异常',
            cameraType: '监控'
          },
          {
            cameraName: '405指纹机',
            sector: 'EIC研究室',
            cameraClass: 'ZKE',
            installAddress: '2#101后门',
            ipAddress: '192.196.12.1',
            identification: 'EIC-FP-001',
            state:'离线',
            cameraType: '密码机器'
          },

        ]
      }
    },
    methods: {
      // 输入序号跳转
      handleSizeChange(val) {
        this.pagesize=val
       },
    //    页面切换
      handleCurrentChange(val) {
        this.currpage = val;
      },
    //   分页序号显示
      indexMethod (index) {
        return (index+(this.currpage-1)*this.pagesize+1);
      },
      // 对在线状态转换
      turnState (state){
        if(state=='0') state='正常';
        if(state=='1') state='离线';
        if(state=='2') state='异常';
          return state
      },
      //  判断摄像头状态显示颜色
      funtColor(classify) {
        let classcolor = '';
        switch (classify) {
          case '1':
            classcolor = 'grey';
            break;
          case '2':
            classcolor = 'red';
            break;
          case '0':
            classcolor = 'green';
            break;
          default:
            classcolor = 'black';
            break;
        }
        return 'color:' + classcolor + ';' ;
      },
      // 搜索按钮绑定事件
      cameraSearch() {
        let data = {
                    pageNum: this.currpage,
                    pageSize: this.pagesize,
                    cameraName: this.input1,
                    ipAddress: this.input2,
                    cameraType: this.input3,
                }
                // 分页查询接口
                GetcameraSearch(data).then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.cameraList = res.data.records;
                    }
                })
      },   
      // 重置搜索框
      cameraReset  () {
          this.input1='';
          this.input2='';
          this.input3='';
          this.reLoad();
      },
      // 增加设备事件
      cameraAdd() {
        this.reset();
        this.open=true;
        this.title='增加新设备'
      },
      // 重置表单
      reset(){
        this.form = {
           cameraName: '',
            sector: '',
            cameraClass: '',
            installAddress: '',
            ipAddress: '',
            identification: '',
            state:'',
            cameraType: ''
             };
      },
      // 获取设备员界面列表接口
      reLoad(){
        GetCamerainfoList().then((res) => {
                console.log(res);
                if (res.code == "200") {
                    this.cameraList = res.data;                
                }
            })
         },
      //  修改设备信息事件
      changeCamera(row){
        this.open=true;
        this.reset();
        this.title='修改设备"'+row.cameraName+'"的信息';
        this.form = row;
      },
      // 删除设备点击事件
      deleteCamera(row){
        this.$confirm('是否确认删除设备名为“'+row.cameraName+'”的数据项', 'VIP客户识别系统提示', 
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
                    let data = {
                        id: row.id
                    }
                    //  删除管理员接口
                    DeleteCamerainfo(data).then((res) => {
                        if (res.data == true) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.reLoad();
                        }
                    })
                }).catch(()=>{})
      },
      // 提交表单
    submitForm(formName){            
                // 校验成功以后提交请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验通过后提交修改请求
                        let data = JSON.stringify(this.form);
                        console.log(data);
                        PostsaveCamerainfo(data).then((res) => {
                            if (res.code == "200") {
                                this.$message({
                                    type: 'success',
                                    message: this.title + '成功'
                                });
                                this.reLoad();
                            }
                        })
                        this.open = false;
                    } else {
                        this.$message({
                                    type: 'error',
                                    message:  '请填写正确完整的信息'
                                });
                        return false;
                    }
                });
    },
    } ,
    created(){
      this.reLoad();
    }
  }
        
  
   

</script>
<style scoped>
  .cameraList-main {
    text-align: left;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }

  .el-input {
    width: 250px;
    border-radius: 20%;
    margin: 0 10px;
  }

  .cameraformtable {
    margin-top: 20px;
  }
   
  .cellitem {
    text-align:center;
    width:60px;
    height:25px;
    font-weight: bolder;
    background-color: rgb(244, 244, 245);
    border: 1px solid rgb(244, 244, 245);
    border-radius: 6px;
  }
  .option-item1 {
    color: rgb(64, 158, 255);
    display: inline;
    margin-left: 10px;
    cursor: pointer;
  }

  .option-item1:hover {
    border-bottom: 1px solid rgb(64, 158, 255);
  }

  .option-item2 {
    color: red;
    display: inline;
    margin-left: 10px;
    cursor: pointer;
  }

  .option-item2:hover {
    border-bottom: 1px solid red;
  }
</style>