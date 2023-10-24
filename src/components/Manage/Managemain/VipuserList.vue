<template>
    <div class="vipuserList-main">
        <div class="header" style="font-size: larger;"> VIP用户列表</div>
        <div class="contain" style="margin-top: 20px; ">
            <el-input placeholder="请输入VIP姓名" suffix-icon="el-icon-s-custom" v-model="input1" size="medium">
            </el-input>
            <el-select v-model="input2" placeholder="请选择用户类型">
                <el-option label="一般VIP" value='0'></el-option>
                <el-option label="超级VIP" value='1'></el-option>
                <el-option label="至尊VIP" value='2'></el-option>
            </el-select>
            <div style="margin-left:20px; display: inline;">
                <el-button type="primary" icon="el-icon-delete" @click="vipuserReset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="vipuserSearch">搜索</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="vipDeleteBatch">批量删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="vipuserAdd" circle></el-button>
            </div>
        </div>
        <!-- 主页表格 -->
        <div class="vipuserformtable">
            <el-table :data="vipuserList.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
                @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
                <el-table-column type="selection" width="53"></el-table-column>
                <el-table-column lable='序号' type="index" width="55"></el-table-column>
                <el-table-column prop="vipUserId" label="VIP证件号" width="200">
                </el-table-column>
                <el-table-column prop="vipName" label="VIP姓名" width="120">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="80">
                    <template slot-scope="scope">
                        <span>{{(scope.row.sex=='0')?'男':'女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="VIP手机号码" width="160">
                </el-table-column>
                <el-table-column prop="vipUserClass" label="客户类型" width="120">
                    <template slot-scope="scope">
                        <span>{{turnType(scope.row.vipUserClass)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="业务员姓名" width="120">
                </el-table-column>
                <el-table-column prop="userPhone" label="业务员手机号" width="160">
                </el-table-column>
                <el-table-column prop="option" label="操作" width="180">
                    <template slot-scope="scope">
                        <div class="option-item" @click="handleSeemore(scope.row)">详情</div>
                        <div class="option-item" @click="changeVipuser(scope.row)">修改</div>
                        <div class="option-item2" @click="deleteVipuser(scope.row)">删除</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 管理员详情弹出框 -->
            <el-dialog :visible.sync="dialogVisible" width="65%" :modal="false" center>
                <span slot="title"> <span
                        style="margin-right:10px; font-weight: bold;">{{ passObject.vipName }}</span>的详细信息</span>
                <!--弹出框组件化  -->
                <ManageVipuserdialogVue :msg="passObject" :formdata="passObject2"></ManageVipuserdialogVue>
                <!-- 弹出框页脚 -->
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加或修改管理员弹出框 -->
            <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
                <el-form ref="form" :model="form" label-width="110px" :rules="$rules.vipListCheck">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP姓名" prop="vipName">
                                <el-input v-model="form.vipName" placeholder="请输入VIP姓名" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP证件号" prop="vipUserId">
                                <el-input v-model="form.vipUserId" placeholder="请输入VIP身份证号" />
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP邮箱" prop="email">
                                <el-input v-model="form.email" placeholder="请输入VIP邮箱" maxlength="20" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP手机号" prop="phone">
                                <div>
                                    <el-input v-model="form.phone" placeholder="请输入VIP电话" maxlength="20" />
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP家庭住址" prop="homeAddress">
                                <el-input v-model="form.homeAddress" placeholder="请输入VIP家庭住址" maxlength="20" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP出生日期" prop="birthday">
                                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="业务员姓名" prop="username">
                                <el-input v-model="form.username" placeholder="请输入业务员姓名" maxlength="20" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="业务员手机号" prop="userPhone">
                                <el-input v-model="form.userPhone" placeholder="请输入业务员手机号" maxlength="20" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="性别" prop="sex">
                                <el-radio v-model="form.sex" label="0">男</el-radio>
                                <el-radio v-model="form.sex" label="1">女</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户类型" prop="vipUserClass">
                                <el-select v-model="form.vipUserClass" placeholder="请选择用户类型">
                                    <el-option label="一般VIP" value='0'></el-option>
                                    <el-option label="超级VIP" value='1'></el-option>
                                    <el-option label="特种VIP" value='2'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="VIP客户照片">
                                <div>
                                    <el-upload accept=".jpg, .jpeg, .png, .PNG," :limit="7" action=''
                                        :auto-upload="false" :multiple=true list-type="picture-card"
                                        :with-credentials='true' :on-change="fileChange" :file-list="imgList"
                                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                        <i class="el-icon-plus">请上传7张VIP客户照片</i>
                                    </el-upload>
                                    <el-dialog :visible.sync="imgdialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                    <el-button @click="open=false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 分页页脚 -->
            <div class="block">
                <el-pagination :current-page="currpage" @current-change="handleCurrentChange" :page-size="pagesize"
                    @size-change="handleSizeChange" layout="prev, pager, next,jumper" :total="vipuserList.length"
                    style="float:right;bottom:0;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import ManageVipuserdialogVue from '@/components/Manage/Managetable/ManageVipuserdialog.vue';
    import {
        GetVipinfoList,
        DeleteVipinfo,
        GetvipSearch,
        PostsaveVipinfo,
        DeleteVipinfoList,
        GetbusinessSearch
    } from "@/api/manage/manage";
    import axios from "axios";
    export default {
        components: {
            ManageVipuserdialogVue
        },
        data() {
            return {
                // 图片上传
                imgList: [],
                dialogImageUrl: '',
                imgdialogVisible: false,
                // 输入的用户姓名
                input1: this.input1,
                // 选择用户的类型
                input2: this.input2,
                // 当前页
                currpage: 1,
                // 页面表格数
                pagesize: 10,
                // 当前超级管理员ID
                userId: this.$store.getters.userId,
                // 详情页弹出对话框
                dialogVisible: false,
                // 详情页组件间传递的对象
                passObject: '',
                passObject2: [],
                // 弹出层标题
                title: "123",
                // 是否显示弹出层
                open: false,
                // 是否展开，默认全部展开
                isExpandAll: true,
                // 表单参数
                form: {},
                //  单选多选框选中的对象
                multipleSelection: [],
                vipuserList: [{
                    vipUserId: '350824100015145475',
                    vipName: '王小虎',
                    sex: '男',
                    homeAddress: '上海市普陀区金沙江路 1518 弄',
                    email: '261784848@qq.com',
                    phone: '13599456147',
                    vipUserClass: '一般VIP',
                    birthday: '2022-10-11',
                    createTime: '2022-10-11',
                    updateTime: '2022-10-11',

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
            vipuserReset() {
                this.input2 = '';
                this.input1 = '';
                this.reLoad();
            },
            // 表格数据转换
            turnType(type) {
                if (type == '0') {
                    type = '一般VIP'
                }
                if (type == '1') {
                    type = '超级VIP'
                }
                if (type == '2') {
                    type = '至尊VIP'
                }
                return type
            },
            // 搜索按钮绑定事件
            vipuserSearch() {
                let data = {
                    pageNum: this.currpage,
                    pageSize: this.pagesize,
                    vipName: this.input1,
                    vipUserClass: this.input2,
                }
                // 分页查询接口
                GetvipSearch(data).then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.vipuserList = res.data.records;
                    }
                })
            },
            // 获取VIP界面列表接口
            reLoad() {
                GetVipinfoList().then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.vipuserList = res.data;
                    }
                })
            },
            // 多选选中的数据
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 批量删除
            vipDeleteBatch() {
                if (this.multipleSelection == '') {
                    this.$message({
                        type: 'error',
                        message: '请选择要删除的数据'
                    });
                    return;
                }
                this.$confirm('是否确认删除VIP客户名为“' + this.multipleSelection.map(v => v.vipName) + '”的数据项', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    //  删除管理员接口
                    let ids = this.multipleSelection.map(v => v.id)
                    DeleteVipinfoList(ids).then((res) => {
                        if (res.data == true) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.reLoad();
                        }
                    })
                }).catch(() => {})

            },
            // 用户新增点击事件
            vipuserAdd() {
                this.imgList = [];
                this.open = true;
                this.title = '新增VIP用户'
                this.reset();
            },
            // 用户详情点击事件
            handleSeemore(row) {
                // vip信息
                this.dialogVisible = true;
                this.passObject = row; //传递给子组件的工号
                console.log(row);
                //  办理业务表单记录请求
                let data = {
                    pageNum: 0,
                    pageSize: 1000,
                    vipPhone: row.phone
                }
                // 分页查询接口
                GetbusinessSearch(data).then((res) => {
                    if (res.code == "200") {
                        console.log(res);
                        this.passObject2 = res.data.records;
                    }
                })
            },
            // 重置表单内容
            reset() {
                this.form = {
                    avatar: '',
                    vipUserId: '',
                    vipName: '',
                    sex: '',
                    homeAddress: '',
                    email: '',
                    phone: '',
                    vipUserClass: '',
                    birthday: '',
                    createTime: '',
                    updateTime: '',
                };
            },
            // 用户修改点击事件
            changeVipuser(row) {
                this.open = true;
                this.reset();
                this.title = '修改VIP用户"' + row.vipName + '"的信息';
                this.form = row;
                //  图片显示
                this.imgList = [];
                if (this.form.avatar) {
                    let arr = this.form.avatar.split(',')
                    arr.forEach((cur, index, arr) => {
                        if (index == arr.length - 1) {} else {
                            var obj = {}
                            obj.url = cur
                            this.imgList.push(obj)
                        }
                    })
                }

            },
            // 删除事件
            deleteVipuser(row) {
                this.$confirm('是否确认删除VIP客户名为“' + row.vipName + '”的数据项', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let data = {
                        id: row.id
                    }
                    //  删除管理员接口
                    DeleteVipinfo(data).then((res) => {
                        if (res.data == true) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.reLoad();
                        }
                    })

                }).catch(() => {})
            },
            // 提交新增修改表单
            async submitForm(formName) {
                // 上传图片
                for (let i in this.imgList) {
                            if (!this.imgList[i].raw) {
                            } else {
                                let formData = new FormData(); //  将文件封装进FormData 
                                formData.append('file', this.imgList[i].raw)
                                formData.append('vipId', this.form.vipUserId)
                            await axios({
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    method: 'post',
                                    data: formData,
                                    url: 'http://localhost:9090/Img/uploadImg',
                                }).then(res => {
                                    this.form.avatar = this.form.avatar + res.data + ','
                                });
                            }
                        }
                    // 校验成功以后提交请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验通过后提交修改请求
                        // 上传表单事件
                        let data = JSON.stringify(this.form);
                        console.log(data);
                        PostsaveVipinfo(data).then((res) => {
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
                            message: '请填写正确完整的信息'
                        });
                        return false;
                    }
                });
            },
            //检测文件变动获取文件
            fileChange(file, fileList) {
                this.imgList = fileList;
            },
            handleRemove(file, fileList) { //移除
                console.log('删除')
                this.form.avatar = this.form.avatar.replace(file.url + ',', '')
            },
            handlePictureCardPreview(file) { //预览
                console.log(file)
                this.dialogImageUrl = file.url;
                this.imgdialogVisible = true;
            },
        },
        created() {
            this.reLoad();
        }
    };
</script>

<style scoped>
    .vipuserList-main {
        text-align: left;
        height: 100%;
        width: 100%;
        background-color: #fff;
    }

    .el-input {
        width: 300px;
        border-radius: 20%;
        margin: 0 10px;
    }

    .vipuserformtable {
        margin-top: 20px;
    }

    .avatarclass {
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

    .option-item {
        color: rgb(64, 158, 255);
        display: inline;
        margin-left: 15px;
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

    .el-col .el-input {
        width: 200px;
        border-radius: 20%;
    }
</style>