<template>
    <div class="amdinlist-main">
        <div class="header" style="font-size: larger;"> <span>业务员列表 </span>
        </div>
        <div class="contain" style="margin-top: 20px; ">
            <el-input placeholder="请输入真实姓名" suffix-icon="el-icon-s-custom" v-model="input1" size="medium">
            </el-input>
            <el-select v-model="input2"  placeholder="请选择用户类型">
                <el-option label="普通业务员" value=2></el-option>
                <el-option label="部门管理员" value=1></el-option>
                <el-option label="超级管理员" value=0></el-option>
            </el-select>
            <el-input placeholder="请输入部门名称" suffix-icon="el-icon-menu" v-model="input3" size="medium">
            </el-input>
            <div style="margin-left:20px; display: inline;">
                <el-button type="primary" icon="el-icon-delete" @click="adminReset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="adminSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-download" @click="adminDownload">导出</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="adminAdd" circle></el-button>
            </div>
        </div>
        <!-- 主页表格 -->
        <div class="adminformtable">
            <!-- 业务员主表单 -->
            <el-table :data="adminList.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column prop="number" label="工号" width="110">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="130">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="160">
                </el-table-column>
                <el-table-column prop="userType" label="职务" width="130">
                    <template slot-scope="scope">
                        <span>{{turnType(scope.row.userType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="在岗" width="100">
                    <template slot-scope="scope">
                        <el-tooltip :content="(scope.row.status=='1')?'在职':'离职'" placement="top">
                            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"
                                active-value="1" inactive-value="0" @change="changeStatus(scope.row)"
                                :disabled="(scope.row.userType=='0')?true:false"
                                >
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="sector" label="所属部门" width="160">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="210">
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime.substring(0, 19)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="option" label="操作" width="260">
                    <template slot-scope="scope">
                        <div class="option-item" @click="handleSeemore(scope.row)">详情</div>
                        <div class="option-item" @click="changeAdmin(scope.row)">修改</div>
                        <div class="option-item" @click="resetAdmin(scope.row)">重置密码</div>
                        <div class="option-item2" @click="deleteAdmin(scope.row)">删除</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 管理员详情弹出框 -->
            <el-dialog :visible.sync="dialogVisible" width="65%" :modal="false" center>
                <span slot="title"> <span
                        style="margin-right:10px; font-weight: bold;">{{ passObject.username }}</span>的详细信息</span>
                <!--弹出框组件化  -->
                <ManageAdmindialogVue :msg="passObject"></ManageAdmindialogVue>
                <!-- 弹出框页脚 -->
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加或修改管理员弹出框 -->
            <el-dialog :title="title" :visible.sync="open" width="40%" append-to-body>
                <el-form ref="form" :model="form" label-width="80px" :rules="$rules.adminListCheck">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="工号" prop="number">
                                <el-input v-model="form.number" placeholder="请输入工号" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="username">
                                <el-input v-model="form.username" placeholder="请输入姓名" />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="职务" prop="userType">
                                <el-input v-model="form.userType" placeholder="请选择职务" maxlength="11" />
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="20" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="移动电话" prop="phone">
                                <el-input v-model="form.phone" placeholder="请输入你的电话" maxlength="20" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="出生日期" prop="birthday">
                                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属部门" prop="sector">
                                <el-input v-model="form.sector" placeholder="请输入所属部门" maxlength="50" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="在岗" prop="status">
                                <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949"
                                    active-value="1" inactive-value="0" active-text="在职" inactive-text="离职">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="sex">
                                <el-radio v-model="form.sex" label="0">男</el-radio>
                                <el-radio v-model="form.sex" label="1">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="业务员照片" prop="avatar">
                                <el-upload class="avatar-uploader" action="http://localhost:9090/File/uploadAvatar" 
                                :show-file-list="false"  :on-success="handleAvatarSuccess" >
                                    <!--  :before-upload="beforeAvatarUpload" -->
                                    <img v-if="form.avatar" :src="form.avatar" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                    <el-button @click="open=false;">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 分页 -->
            <div class="block">
                <el-pagination :current-page="currpage" @current-change="handleCurrentChange" :page-size="pagesize"
                    @size-change="handleSizeChange" layout="prev, pager, next,jumper" :total="adminList.length"
                    style="float:right;bottom:0;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        GetUserinfo,
        GetUserinfoList,
        DeleteUser,
        GetadminSearch,
        PostchangePassword,
        PostchangeStatus,
        PostsaveUserinfo,
        GetadminDownload
    } from "@/api/manage/manage";
    import ManageAdmindialogVue from '@/components/Manage/Managetable/ManageAdmindialog.vue';
    export default {
        components: {
            ManageAdmindialogVue
        },
        data() {
            return {
                // 输入姓名
                input1: this.input1,
                // 输入部门
                input3: this.input3,
                // 选择的用户类型
                input2: this.input2,
                // 当前页面
                currpage: 1,
                // 页面表格数
                pagesize: 10,
                // 当前超级管理员ID
                userId: this.$store.getters.userId,
                // 是否显示详情页面弹出框
                dialogVisible: false,
                // 传到详情页面的对象
                passObject: '',
                // 修改新添弹出层标题
                title: "123",
                // 是否显示弹出层
                open: false,
                // 是否展开，默认全部展开
                isExpandAll: true,
                // 表单参数
                form: {},
                adminList: [{
                    number: '1',
                    updateTime: '2016-05-02',
                    username: '王小虎',
                    sex: '男',
                    sector: 'ETC工作室',
                    status: 0,
                    phone: '13566941145',
                    userType: '管理员',
                    email: '261784848@qq.com',
                    avatar: require("@/assets/image/common/test-avatar.png"),
                }, {
                    number: '1',
                    updateTime: '2016-05-02',
                    username: '乐大虎',
                    sex: '男',
                    sector: 'ETC工作室',
                    status: 1,
                    phone: '13566941145',
                    birthday: '2022-01-31',
                    userType: '管理员',
                    email: '261784848@qq.com',
                    avatar: require("@/assets/image/common/test-avatar.png"),
                }]
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
            // 重置输入框
            adminReset() {
                this.input2 = '';
                this.input1 = '';
                this.input3 = '';
                this.reLoad();
            },
            // 表格数据转换
            turnType(type){
            if(type== '0'){type='超级管理员'}
          if( type== '1'){type='部门管理员'}
          if(type== '2' ){type='业务员'}
          return  type
          },
            // 搜索按钮绑定事件
            adminSearch() {
                let data = {
                    pageNum: this.currpage,
                    pageSize: this.pagesize,
                    username: this.input1,
                    userType: this.input2,
                    sector: this.input3,
                }
                // 分页查询接口
                GetadminSearch(data).then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.adminList = res.data.records;
                    }
                })
            },
            // 导出用户表
            adminDownload(){
                // GetadminDownload()
                window.open(`http://localhost:9090/User/export`);
            },
            // 用户详情点击事件
            handleSeemore(row) {
                this.dialogVisible = true;
                this.passObject = row; //传递给子组件的对象
            },
            // 重置表单内容
            reset() {
                this.form = {
                    number: '',
                    updateTime: '',
                    username: '',
                    sex: '',
                    sector: '',
                    status: '',
                    phone: '',
                    birthday: '',
                    userType: '',
                    email: '',
                    avatar: '',
                };
            },
            // 用户新增点击事件
            adminAdd() {
                this.open = true;
                this.title = '新增管理员用户'
                this.reset();
            },
            // 用户修改点击事件
            changeAdmin(row) {
                this.open = true;
                this.reset();
                this.title = '修改管理员"' + row.username + '"的信息';
                this.form = row;
            },
            // 更改用户状态
            changeStatus(row) {
                this.$confirm('是否确认更改业务员" ' + row.username + ' "的状态', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let data = {
                        id: row.id,
                        status: row.status
                    }
                    //  更改业务员的在职状态
                    PostchangeStatus(data).then((res) => {
                        if (res.data == true) {
                            this.$message({
                                type: 'success',
                                message: '设置业务员状态成功!'
                            });
                        }
                    })
                }).catch(() => {
                    // 取消更改时将按钮置为原位
                    if (row.status == '1') {
                        row.status = '0'
                    } else {
                        row.status = '1'
                    }
                })
            },
            // 用户重置密码点击事件
            resetAdmin(row) {
                this.$confirm('是否确认重置业务员" ' + row.username + ' "密码为root123@', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let data = {
                        id: row.id,
                        password: 'root123@'
                    }
                    //  重置管理员密码接口
                    PostchangePassword(data).then((res) => {
                        if (res.data == true) {
                            this.$message({
                                type: 'success',
                                message: '重置密码成功!'
                            });
                        }
                    })
                }).catch(()=>{})
            },
            // 获取管理员界面列表接口
           reLoad() {
            GetUserinfoList().then((res) => {
                console.log(res);
                if (res.code == "200") {
                    this.adminList = res.data;                
                }
            })
           },
            // 删除管理员点击事件
            deleteAdmin(row) {
                this.$confirm('是否确认删除业务员名为“ ' + row.username + ' ”的数据项', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let data = {
                        id: row.id
                    }
                    //  删除管理员接口
                    DeleteUser(data).then((res) => {
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


            // 提交新增修改表单
            submitForm(formName) {
                // 如果新增用户，设置密码为默认密码且默认信息完全
                if (this.title == '新增管理员用户') {
                    this.form.password = 'root123@';
                    this.form.infoSubmitted = 1;
                }
                // 校验成功以后提交请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验通过后提交修改请求
                        let data = JSON.stringify(this.form);
                        console.log(data);
                        PostsaveUserinfo(data).then((res) => {
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
            // 头像上传成功后赋值路劲给avatar
            handleAvatarSuccess(res) {
                this.form.avatar= res
              }
        },
        created() {
            this.reLoad();
        },
    };
</script>

<style scoped>
    .amdinlist-main {
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

    .adminformtable {
        margin-top: 20px;
    }

    .option-item {
        color: rgb(64, 158, 255);
        display: inline;
        margin-left: 15px;
        cursor: pointer;
    }

    .option-item:hover {
        border-bottom: 1px solid rgb(64, 158, 255);
    }

    .avatar {
        width: 130px;
        height: 180px;
        margin: 0 auto;
        display: block;
    }

    .avatar-uploader {
        font-size: 28px;
        color: #8c939d;
        width: 130px;
        height: 180px;
        margin: 0 auto;
        line-height: 180px;
        text-align: center;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        height: 180px;
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

    .el-col .el-input {
        width: 150px;
        border-radius: 20%;
    }
</style>