<template>

        <div class="fileList-main">
            <div class="header" style="font-size: larger;"> <span>业务文件列表 </span>
        </div>
          <div class="contain" style="margin-top: 20px;">
            <el-input placeholder="请输入文件名称" suffix-icon="el-icon-document" v-model="input1" size="medium">
            </el-input>
            <el-input placeholder="请输入文件后缀" suffix-icon="el-icon-folder-opened" v-model="input2" size="medium">
            </el-input>
            <div style="margin-left:20px; display: inline;">
              <el-button type="warning" icon="el-icon-delete" @click="fileReset">重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="fileSearch">搜索</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="fileDeleteBatch">批量删除</el-button>
              <el-upload action="" :http-request="uploadSectionFile" :auto-upload="true"
                 :show-file-list="false" ref="upload" 
                 style="display: inline-block; margin-left: 10px;">
                <el-button type="primary">上传文件 <i class="el-icon-top"></i></el-button>
              </el-upload>
            </div>
          </div>
          <div style="margin-top:20px;">
            <el-table :data="fileList.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
              @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column type="selection" width="80"></el-table-column>
              <el-table-column lable="序号" type="index" width="80" :index="indexMethod"> </el-table-column>
              <el-table-column prop="name" label="文件名称" width="200"></el-table-column>
              <el-table-column prop="type" label="文件类型" width="120"></el-table-column>
              <el-table-column prop="size" label="文件大小(kb)" width="140"></el-table-column>
              <el-table-column prop="username" label="上传人" width="120"></el-table-column>
              <el-table-column prop="userPhone" label="上传人手机号" width="170"></el-table-column>
              <el-table-column label="启用" width="100">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc"
                    @change="changeEnable(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="option" label="操作" width="200">
                <template slot-scope="scope">
                  <div class="option-item" @click="downloadFile(scope.row)">下载</div>
                  <div class="option-item2" @click="deleteFile(scope.row)">删除</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination :current-page="currpage" @current-change="handleCurrentChange" :page-size="pagesize"
              @size-change="handleSizeChange" layout="prev, pager, next,jumper" :total="fileList.length"
              style="float:right;bottom:0;">
            </el-pagination>
          </div>
        </div>
  </template>
  
  <script>
    import {
      GetfileList,
      GetfileSearch,
      DeleteFile,
      DeleteFileList,
      uploadFile,
      changeFileEnable,
    } from "@/api/manage/manage";
    import axios from "axios";
    export default {
      name: "File",
      data() {
        return {
          // tableData: [],
          // name: '',
          // multipleSelection: [],
          // pageNum: 1,
          // pageSize: 10,
          // total: 0
          // 文件名称
          input1: this.input1,
          // 文件后缀
          input2: this.input2,
          // 当前页
          currpage: 1,
          // 页面表格数
          pagesize: 10,
          // 当前管理员ID
          userId: this.$store.getters.userId,
          // 当前管理员姓名
          username: this.$store.getters.username,
          // 管理员电话
          userPhone: this.$store.getters.phone,
          // 传递给详情弹出框的对象
          passObject: '',
          // 弹出层标题
          title: "123",
          // 是否显示弹出层
          open: false,
          // 是否展开，默认全部展开
          isExpandAll: true,
          // 表单参数
          form: {},
          //  详情页面是否显示
          dialogVisible: false,
          //  单选多选框选中的对象
          multipleSelection: [],
          // 后端传过来的文件列表
          fileList: [],
          file:'',
        }
      },
      methods: {
        // 输入序号跳转
        handleSizeChange(val) {
          this.pagesize = val
        },
        //    页面切换
        handleCurrentChange(val) {
          this.currpage = val;
        },
        //   分页序号显示
        indexMethod(index) {
          return (index + (this.currpage - 1) * this.pagesize + 1);
        },
        // 获得该管理员上传的文件
        reLoad() {
          GetfileList().then((res) => {
            console.log(res);
            if (res.code == "200") {
              this.fileList=[]
              let list = res.data;
              for(let i=0; i<list.length; i++){
                if(list[i].username === null){
                  
                }else{
                  this.fileList.push(list[i])
                }
              }
              
            }
          })
        },
        // 搜索按钮绑定事件
        fileSearch() {
          let data = {
            pageNum: this.currpage,
            pageSize: this.pagesize,
            name: this.input1,
            type: this.input2,
            userPhone: this.userPhone
          }
          // 分页查询接口
          GetfileSearch(data).then((res) => {
            console.log(res);
            if (res.code == "200") {
              this.fileList = res.data.records;
            }
          })
        },
        // 重置搜索框点击事件
        fileReset() {
          this.input1 = '';
          this.input2 = '';
          this.reLoad();
        },
        // 是否启用文件
        changeEnable(row) {
          changeFileEnable(row).then(res => {
          if (res.code === '200') {
            this.$message.success("操作成功")
          }
        })
      },
        // 删除业务记录
        deleteFile(row) {
          this.$confirm('是否确认删除文件名为“' + row.name + '”的数据项', 'VIP客户识别系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            let data = {
              id: row.id
            }
            //  删除管理员接口
            DeleteFile(data).then((res) => {
              if (res.code == '200') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.reLoad();
              }
            })
          }).catch(() => {})
        },
  
        // 批量删除选中数据
        handleSelectionChange(val) {
          this.multipleSelection = val
        },
        // 批量删除事件
        fileDeleteBatch() {
          if (this.multipleSelection == '') {
            this.$message({
              type: 'error',
              message: '请选择要删除的数据'
            });
            return;
          }
          this.$confirm('是否确认删除文件名为“' + this.multipleSelection.map(v => v.name) + '”的数据项',
            'VIP客户识别系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
            //  删除文件员接口
            let ids = this.multipleSelection.map(v => v.id)
            DeleteFileList(ids).then((res) => {
              if (res.code == '200') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.reLoad();
              }
            })
          }).catch(() => {})
        },
        //  文件下载事件
        downloadFile(row) {
          this.$message.success('文件下载中，请稍后')
          window.open(row.url)
        },
        // 重写文件上传方法
      uploadSectionFile (params) {
        const that = this
        const _file = params.file
        const isLt2M = _file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          that.$message.error('请上传10M以下的图片,文件')
          return false
        }
        console.log(_file);
        let param = new FormData()
        param.append('file', _file)
        param.append('username', this.username)
        param.append('userPhone', this.userPhone)   
        console.log(param);
        axios({
              headers: {
                              'Content-Type': 'multipart/form-data',
                          },
                          method: 'post',
                          data: param,
                          url: 'http://localhost:9090/File/uploadFile',
                      }).then(res => {
                        that.$message.success('上传成功')
                        this.reLoad()
                      });
        // 上传文件接口
        // this.axios({
        //   url:'http://localhost:9090/File/upload',
        //   method:'post',
        //   data: param,
        //   headers: { "content-type": "multipart/form-data" },
        // }).then((res)=>{
        //   if (res.code == '200'){
        //     that.$message.success('上传成功')
        //   }else{
        //     that.$message.success('上传失败')
        //   }
        // })
        
      },
      },
      created() {
        this.reLoad()
      },
    }
  </script>
  
  <style scoped>
 
  
    .fileList-main {
        text-align: left;
        height: 100%;
        width: 100%;
        background-color: #fff;
    }

  
    .el-input {
      width: 200px;
      border-radius: 20%;
      margin: 0 10px;
    }
  
    .el-col .el-input {
      width: 300px;
    }
  
  
    .option-item {
      color: rgb(64, 158, 255);
      display: inline;
      margin-left: 10px;
      cursor: pointer;
    }
  
    .option-item:hover {
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