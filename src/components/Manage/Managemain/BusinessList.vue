<template>
    <div class="bunisessList-main">
        <div class="header" style="font-size: larger;">业务列表 </div>
        <div class="contain" style="margin-top: 20px; ">
            <el-input placeholder="请输入VIP客户姓名" suffix-icon="el-icon-user" v-model="input1" size="medium"></el-input>
            <el-input placeholder="请输入业务受理人" suffix-icon="el-icon-user-solid" v-model="input2" size="medium"></el-input>
            <!-- <el-date-picker v-model="input3" type="date" placeholder="选择日期">
            </el-date-picker> -->
            <div style="margin-left:20px; display: inline;">
                <el-button type="primary" icon="el-icon-delete" @click="businessReset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="businessSearch">搜索</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="businessDeleteBatch">批量删除</el-button>
                <el-button type="success" icon="el-icon-download" @click="businessDownload">导出</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="businessAdd" circle></el-button>

            </div>
        </div>
        <!-- 主页表格 -->
        <div class="businessformtable">
            <el-table :data="businessList.slice((currpage-1)*pagesize,currpage*pagesize)" border style="width: 100%"
                @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
                <el-table-column type="selection" width="53"></el-table-column>
                <el-table-column lable='序号' type="index" width="50" :index="indexMethod"> </el-table-column>
                <el-table-column prop="vipName" label="VIP姓名" width="110"></el-table-column>
                <el-table-column prop="businessName" label="办理业务" width="220"></el-table-column>
                <el-table-column prop="createTime" label="申请办理时间" width="190">
                    <template slot-scope="scope">
                        <div> {{scope.row.createTime.substring(0, 19)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="useTime" label="办理时长" width="120"></el-table-column>
                <el-table-column prop="username" label="办理人" width="120"></el-table-column>
                <el-table-column prop="businessFinish" label="完成度" width="120">
                    <template slot-scope="scope">
                        <div :style="funtColor(scope.row.businessFinish)">
                            {{turnBusinessFinishType(scope.row.businessFinish)}}
                        </div>
                    </template>
                </el-table-column>
                <!-- 满意度添加颜色判断 -->
                <el-table-column prop="satisfaction" label="满意度" width="140">
                    <template slot-scope="scope">
                        <div :style="funtColor(scope.row.satisfaction)">
                            {{turnSatisfactionType(scope.row.satisfaction)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="option" label="操作" width="140">
                    <template slot-scope="scope">
                        <div class="option-item" @click="handleSeemore(scope.row)">详情</div>
                        <div class="option-item" @click="businessChange(scope.row)">修改</div>
                        <div class="option-item2" @click="deleteBusiness(scope.row)">删除</div>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加或修改业务对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
                <el-form ref="form" :model="form" label-width="80px" :rules="$rules.businessListCheck">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="业务名称" prop="businessName">
                                <el-input v-model="form.businessName" placeholder="请输入业务名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP姓名" prop="vipName">
                                <el-input v-model="form.vipName" placeholder="请输入VIP用户姓名" maxlength="20" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP电话" prop="vipPhone">
                                <el-input v-model="form.vipPhone" placeholder="请输入VIP电话" maxlength="20" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="办理时长" prop="useTime">
                                <el-input v-model="form.useTime" placeholder="请输入办理时常" maxlength="50" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="完成度" prop="businessFinish">
                                <el-select v-model="form.businessFinish" placeholder="请选择完成度">
                                <el-option label="待完成" value=2></el-option>
                                <el-option label="进行中" value=1></el-option>
                                <el-option label="已完成" value=0></el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="满意度" prop="satisfaction">
                                <el-select v-model="form.satisfaction" placeholder="请选择完成度">
                                <el-option label="非常不满意" value=3></el-option>
                                <el-option label="不满意" value=2></el-option>
                                <el-option label="满意" value=1></el-option>
                                <el-option label="非常满意" value=0></el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="办理人" prop="username">
                                <el-input v-model="form.username" placeholder="请输入办理人姓名" maxlength="50" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="办理人手机号" prop="userPhone" style="width:90px">
                                <el-input v-model="form.userPhone" placeholder="请输入办理人手机号" maxlength="50" />
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="办理业务简介" prop="businessIntro">
                                <el-input type="textarea" style="width:85%" :rows="4" v-model="form.businessIntro"
                                    placeholder="请输入办理业务简介" maxlength="200" show-word-limit />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                    <el-button @click="open=false">取 消</el-button>
                </div>
            </el-dialog>

            <!-- 管理员详情弹出框 -->
            <el-dialog :visible.sync="dialogVisible" width="55%" :modal="false" center>
                <span slot="title"> <span
                        style="margin-right:10px; font-weight: bold;">{{ passObject.businessName }}</span>的详细信息</span>
                <!--弹出框组件化  -->
                <ManageBusinessdialogVue :msg="passObject"></ManageBusinessdialogVue>
                <!-- 弹出框页脚 -->
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分页 -->
            <div class="block">
                <el-pagination :current-page="currpage" @current-change="handleCurrentChange" :page-size="pagesize"
                    @size-change="handleSizeChange" layout="prev, pager, next,jumper" :total="businessList.length"
                    style="float:right;bottom:0;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import ManageBusinessdialogVue from '@/components/Manage/Managetable/ManageBusinessdialog.vue';
    import {
        GetBusinessinfoList,
        DeleteBusinessinfo,
        GetbusinessSearch,
        PostsaveBusinessinfo,
        DeleteBusinessinfoList,
    } from "@/api/manage/manage";
    export default {
        components: {
            ManageBusinessdialogVue
        },
        data() {
            return {
                // VIP客户姓名
                input1: this.input1,
                // 业务办理人姓名
                input2: this.input2,
                // 业务办理日期
                input3: this.input3,
                // 当前页
                currpage: 1,
                // 页面表格数
                pagesize: 10,
                // 当前超级管理员ID
                userId: this.$store.getters.userId,
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
                businessList: [{
                    vipName: '王虎',
                    businessName: '前端开发项目组VIP系统',
                    businessIntro: '这是一个非常牛逼的项目，集结了大家的智慧，为了搞定啥啥啥问题专门研发出来的什么什么项目为了',
                    satisfaction: '非常满意',
                    username: '张三',
                    useTime: '60min',
                    createTime: '2022-01-23',
                }]
            }
        }

        ,
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
            // 搜索按钮绑定事件
            businessSearch() {
                let data = {
                    pageNum: this.currpage,
                    pageSize: this.pagesize,
                    vipName: this.input1,
                    username: this.input2,
                    // createTime:this.input3
                }
                // 分页查询接口
                GetbusinessSearch(data).then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.businessList = res.data.records;
                    }
                })
            },
            // 重置搜索框点击事件
            businessReset() {
                this.input1 = '';
                this.input2 = '';
                this.input3 = '';
                this.reLoad();
            },
            // 导出业务列表为EXCEL文件
            businessDownload() {
                window.open(`http://localhost:9090/Business/export`);

            },
            // 重置表单
            reset() {
                this.form = {
                    vipName: '',
                    businessName: '',
                    businessIntro: '',
                    satisfaction: '',
                    username: '',
                    useTime: '',
                    createTime: '',
                };
            },
            // 获取业务界面列表接口
            reLoad() {
                GetBusinessinfoList().then((res) => {
                    console.log(res);
                    if (res.code == "200") {
                        this.businessList = res.data;
                    }
                })
            },
            // 多选选中的数据
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 批量删除业务
            businessDeleteBatch() {
                if (this.multipleSelection == '') {
                    this.$message({
                        type: 'error',
                        message: '请选择要删除的数据'
                    });
                    return;
                }
                this.$confirm('是否确认删除业务名为“' + this.multipleSelection.map(v => v.businessName) + '”的数据项',
                    'VIP客户识别系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                    //  删除管理员接口
                    let ids = this.multipleSelection.map(v => v.id)
                    DeleteBusinessinfoList(ids).then((res) => {
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
            // 新建业务 
            businessAdd() {
                this.reset();
                this.open = true;
                this.title = '增加新业务记录'
            },
            // 修改业务事件
            businessChange(row) {
                this.open = true;
                this.reset();
                this.title = '修改业务记录"' + row.businessName + '"的信息';
                this.form = row;
            },
            // 点击查看详情 
            handleSeemore(row) {
                this.passObject = row;
                this.dialogVisible = true;
            },
            // 删除业务记录
            deleteBusiness(row) {
                this.$confirm('是否确认删除业务名为“' + row.businessName + '”的数据项', 'VIP客户识别系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let data = {
                        id: row.id
                    }
                    //  删除管理员接口
                    DeleteBusinessinfo(data).then((res) => {
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
            // 提交表单
            submitForm(formName) {
                // 校验成功以后提交请求
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验通过后提交修改请求
                        let data = JSON.stringify(this.form);
                        console.log(data);
                        PostsaveBusinessinfo(data).then((res) => {
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

        },
        created() {
            this.reLoad();
        }
    }

    ;
</script>
<style scoped>
    .bunisessList-main {
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

    .businessformtable {
        margin-top: 20px;
    }

    .cellitem {
        text-align: center;
        width: 85px;
        height: 25px;
        font-weight: bolder;
        background-color: rgb(244, 244, 245);
        border: 1px solid rgb(244, 244, 245);
        border-radius: 6px;
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

    .el-col .el-select {
        margin-left:10px;
        width:300px;
    }
</style>