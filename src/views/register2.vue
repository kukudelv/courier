<template>
    <div class="register">
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="auto"
        class="register-form"
        size="medium"
        status-icon
      >
        <h2>快递配送系统注册</h2>
        <el-radio-group v-model="radio1" size="medium">
                <el-radio-button label="普通用户"></el-radio-button>
                <el-radio-button label="快递员" ></el-radio-button>
            </el-radio-group>
            <!-- 输入姓名 -->
        <el-form-item prop="username">
          <span style="color:red; font-size: large; font-weight: bolder;">*&nbsp;</span>
          <el-input
            type="text"
            v-model="registerForm.username"
            clearable
            placeholder="请输入姓名"
          >
          </el-input>
        </el-form-item>    
            <!-- 输入工号 -->
        <el-form-item prop="phone">
          <span style="color:red; font-size: large; font-weight: bolder;">*&nbsp;</span>
          <el-input
            type="text"
            v-model="registerForm.phone"
            clearable
            placeholder="请输入工号"
          >
          </el-input>
        </el-form-item>
            <!-- 输入密码 -->
        <el-form-item prop="password">
          <span style="color:red; font-size: large; font-weight: bolder;">*&nbsp;</span>
          <el-input
            type="password"
            v-model="registerForm.password"
            clearable
            placeholder="请输入密码"
          ></el-input>

          <span
            style="float: right; font-weight: bold; color: red; z-index: 20001;"
            v-if="passwordFlag >= 3"
            >极强</span
          >
          <span
            style="float: right; font-weight: bold; color: brown;z-index: 20001;"
            v-if="passwordFlag === 2"
            >中等</span
          >
          <span
            style="float: right; font-weight: bold; color: brown;z-index: 20001;"
            v-if="passwordFlag === 1"
            >极弱</span
          >
        </el-form-item>
        <!-- 密码确认 -->
        <el-form-item prop="checkpass">
          <span style="color:red; font-size: large; font-weight: bolder;">*&nbsp;</span>
          <el-input
            type="password"
            v-model="registerForm.checkpass"
            clearable
            placeholder="再次确认密码"
          >
          </el-input>
        </el-form-item>
<!-- 81   @click="submitForm('registerForm')" -->
        <el-form-item>
          <el-button
            class="registerSubmit"
            type="primary"
            @click="frontsubmitForm('registerForm')"
            size="medium"
            >注册</el-button>

          <div style=" width:100%; height: 40px;">
            <router-link style="float: right;" class="link-type" to="/">已有账户？返回登录</router-link>
          </div>          
        </el-form-item>
      </el-form>

      <!--底部-->     
    </div>
  </template>
  <script>
  import {postRegisterFormData,getDeptList} from "@/api/login/login";
  export default {
    data() {
      //工号检验
      var validateUser = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入工号"));
        } else {
          //后续可添加工号检验逻辑
          // 是否数字检验
          if (!/^[0-9]*$/.test(this.registerForm.phone)) {
            callback(new Error("请输入正确的工号"));
          }
          callback();
        }
      };
      //手机号码检验
      var validateMobile = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("手机号码不能为空"));
        } 
        else {
          var regMobile =
            /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
          if (!regMobile.test(this.registerForm.phone)) {
            callback(new Error("手机号码格式错误"));
            this.registerForm.phone = "";
          }
          callback();
        }
      };
      // 姓名校验
      var validateUsername = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("姓名不能为空"));
        } else {
          let regUsername =
            /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
          if (!regUsername.test(this.registerForm.username)) {
            callback(new Error("请输入正确的用户姓名"));
            this.registerForm.username = "";
          }
          callback();
        }
      };
      // 密码检验
      var validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("密码不能为空"));
        } else {
          var lv = 0;
          if (/[a-z]/g.test(this.registerForm.password)) {
            lv++;
          } //验证是否包含字母
          if (/[0-9]/g.test(this.registerForm.password)) {
            lv++;
          } // 验证是否包含数字
          if (/(.[^a-z0-9])/g.test(this.registerForm.password)) {
            lv++;
          } //验证是否包含字母，数字，字符
          if (this.registerForm.password.length < 6) {
            lv = 0;
          } //如果密码长度小于6位，提示消息为空
          if (lv < 3) {
            callback(
              new Error("请输入带字母，数字，特殊字符且长度大于6位的强密码")
            );
            this.registerForm.password = "";
          }
          callback();
        }
      };
      // 确认密码
      var validateCheckpass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else {
          if (value !== this.registerForm.password) {
            callback(new Error("两次密码不一致"));
            this.registerForm.checkpass = "";
          }
          callback();
        }
      }; 
      return {
        passwordFlag: "", ///密码强弱检验
        registerForm: {
          username:"",
          phone: "",
          password: "",
          checkpass: "",
        },
        radio1:'快递员',        
        registerRules: {
         
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateUsername,
            },
          ],
          phone: [
            {
              required: true,
              trigger: "blur",
              validator: validateUser,
            },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword,
            },
          ],
          checkpass: [
            {
              required: true,
              trigger: "blur",
              validator: validateCheckpass,
            },
          ],
        },
      };
    },
    methods: {     
      submitForm(formName) {
        // 注册事件,提交表单
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log("error submit!!");
            return false;
          } else {

            // 数据对接处理
            let formData = {
              password: this.registerForm.password,
              phone: this.registerForm.phone,
            };
            let data = JSON.stringify(formData);
            console.log(data);
            // 对服务器上传数据
           postRegisterFormData(data)
              .then((res) => {
                // 提交成功处理
                console.log(res);
                // 注册成功与否弹出框
                if (res.code ==="200") {
                  let str =
                    "恭喜您的账号已成功注册,待管理员审批后方可登录！";
                  this.$alert(str, "", {
                    confirmButtonText: "返回登录",
                    customClass: "checkMessageBox",
                  }).then(() => {
                    this.$router.push("/");
                  });
                } else {
                  let str = "您的手机号已经注册，请联系管理员重置密码密码";
                  this.$confirm(str, "", {
                    type: "warning",
                  }) }
              })
              .catch((err) => {
                // 提交失败处理
                console.log(err);
              });
          }
        });
      },
      frontsubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log("error submit!!");
            let str = "请按要求正确填写信息";
            this.$alert(str, "", {type: "warning",})
            return false;
          } 
          else {
            let str ="恭喜您的账号已成功注册,请回到登录界面进行登录";
            this.$alert(str, "", {confirmButtonText: "返回登录界面",customClass: "checkMessageBox",}).then(() => {
                    this.$router.push("/");
                  });
          }
        });
      },
    },
    watch: {
      registerForm: {
        deep: true,
        handler(newval) {
          var lv = 0;
          if (/[a-z]/g.test(newval.password)) {
            lv++;
          } //验证是否包含字母
          if (/[0-9]/g.test(newval.password)) {
            lv++;
          } // 验证是否包含数字
          if (/(.[^a-z0-9])/g.test(newval.password)) {
            lv++;
          } //验证是否包含字母，数字，字符
          if (newval.password.length < 6) {
            lv = 0;
          } //如果密码长度小于6位，提示消息为空
          this.passwordFlag = lv;
        },
      },
      radio1(newOption, oldOption) {
      // 使用Vue Router进行路由跳转
      if (newOption === '普通用户') {
        this.$router.push('/register1'); // 替换成你的路由路径
      } else if (newOption === '快递员') {
        this.$router.push('/register2');
      } 
    },
    },
    created() {
    },
  };
  </script>
  <style scoped>
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
    height: 100%;
    background-size: cover;
  }
  a {
    text-decoration: none;
    color:rgb(2, 167, 240);
  }
  .register-form {
    border-radius: 15px;
    border: 1px solid rgb(85, 85, 85);
    width: 450px;
    text-align: center;
    font-size: 15px;
    padding: 25px 25px 25px 25px;
  }
  
  .el-form-item {
    margin-top: 25px;
    width: 450px;
    text-align: center;
  }
  
  .el-input {
    width: 70%;
  }
   .registerSubmit {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    background-color: rgb(2, 167, 240);
    text-align: center;
    color: #fefefe;
    font-size: 15px;
  } 
  </style>
  
  <style>
  .el-form-item__error {
    margin-left: 60px;
  }
  </style>
  