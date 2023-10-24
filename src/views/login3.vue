<template>
    <div class="login">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="auto" class="login-form" size="medium" status-icon>
        <div style="margin-bottom: 20px;margin-top: 20px;">
            <h1>快递配送系统</h1>
        </div>
            <el-radio-group v-model="radio1" size="medium">
                <el-radio-button label="普通用户"></el-radio-button>
                <el-radio-button label="快递员"></el-radio-button>
                <el-radio-button label="网点管理员"></el-radio-button>
            </el-radio-group>
            <!-- 表单校验功能 prop校验的字段名 -->
        <el-form-item prop="phone"> 
          <el-input
            v-model="loginForm.phone"
            type="text"
            auto-complete="off"
            placeholder="管理员账号"
          >
          </el-input>

        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin1"
          >
          </el-input>
        </el-form-item>

         <div  class = "findPassword" style="font-size:small">
          <router-link  :to="'/register1'" >没有账户？立即注册</router-link>
         </div>
         <el-form-item  style="  font-size: smaller;">
          <el-checkbox v-model="loginForm.rememberMe" >记住我</el-checkbox>
         </el-form-item>
        <el-form-item style="width:100%;">
          <div   style="width:100%;">
            <el-button
            size="medium"
            type="primary"
            @click.native.prevent="handleLogin1"
          >
            <span>登 录</span>
          </el-button>
          </div>         
        </el-form-item>          
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          phone: "",
          password: "",
          rememberMe: false,
          code: "",
        },
        loginRules: {
          phone: [
            { required: true, trigger: "blur", message: "请输入您的管理员账号" }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" }
          ],
        },
        radio1:'网点管理员',
      };
    },
    watch: {
    },
    
    methods: { 
        handleLogin1() {
        // 是否校验成功valid
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 记住密码的cookies设置
            if (this.loginForm.rememberMe) {
              this.setCookie(this.loginForm.phone, this.loginForm.password, 30);
            }else{
              this.clearCookie();
            }
            this.$router.push({name:'user1'});}
          else{
            let str="账号或密码不能为空";
            this.$alert(str, "", {type: "warning",})
          }}
            
        )  
      },


      handleLogin() {
        // 是否校验成功valid
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 记住密码的cookies设置
            // if (this.loginForm.rememberMe) {
            //   this.setCookie(this.loginForm.phone, this.loginForm.password, 30);
            // }else{
            //   this.clearCookie();
            // }
            // 提交表单数据处理
            let formData = {
              phone: this.loginForm.phone,
              password: this.loginForm.password
            }
           let data = JSON.stringify(formData);
            console.log(data);
            // 提交登录事件
           postLoginFormData(data)
            .then((res) => {
            if (res.code!== '200'){
               this.$message({
               message: '账号密码错误，请重新输入',
               type: 'warning'
                 });
            }else{
               //先清除本地存储
               localStorage.removeItem('userId');
               localStorage.removeItem('phone');
               localStorage.removeItem('avatar');
               localStorage.removeItem('username');
               localStorage.removeItem('userType');
              // 获取公共变量并存储
              this.$store.commit("setUserId",res.data.id)
              this.$store.commit("setAvatar",res.data.avatar)
              this.$store.commit("setPhone",res.data.phone)
              this.$store.commit("setUsername",res.data.username)
              this.$store.commit("setUserType",res.data.userType)
              // 设置本地存储信息
              localStorage.setItem("userId",JSON.stringify(res.data.id));
              localStorage.setItem("phone",JSON.stringify(res.data.phone));
              localStorage.setItem("avatar",JSON.stringify(res.data.avatar));
              localStorage.setItem("username",JSON.stringify(res.data.username));
              localStorage.setItem("userType",JSON.stringify(res.data.userType));
              // 路由跳转 如果信息完全跳到主页面，如果不完全跳到提交信息界面
              if (res.data.status=='1'){
                // 超管跳到超管界面， 普通管理员跳到普通界面
                   if(res.data.userType=='0' || res.data.userType=='1'){
                    this.$message({
                                  type: 'success',
                                  message: '登录成功'
                              });
                    this.$router.push("/manage");
                   }else {
                    if (res.data.infoSubmitted=='1'){
                      this.$message({
                                  type: 'success',
                                  message: '登录成功'
                              });
                      this.$router.push("/BusinessMana");
                    }else{
                      this.$message({
                                  type: 'success',
                                  message: '请完善信息'
                              });
                      this.$router.push("/refineinfo");
                    }    
                   }
              }else{
                      this.$message({
                                  type: 'error',
                                  message: '状态异常'
                              });
              }
            }
  
           }).catch(() => {
              
            });
          }
        });
      },
      setCookie(phone, password, exdays) {
        var exdate = new Date(); // 获取当前登录的时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 将当前登录的时间加上七天，就是cookie过期的时间，也就是保存的天数
        // 字符串拼接cookie,因为cookie存储的形式是name=value的形式
        window.document.cookie = "phone" + "=" + phone + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "password" + "=" + password + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "rememberMe" + "=" + this.loginForm.rememberMe + ";path=/;expires=" + exdate.toGMTString();
      },
      getCookie () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split("; "); //因为是数组所以要切割。
          // console.log(arr,"切割");
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("="); // 再次切割
            // console.log(arr2,"切割2");
            // // 判断查找相对应的值
            if (arr2[0] === "phone") {
              this.loginForm.phone = arr2[1]; // 转存一份保存用户名和密码
            } else if (arr2[0] === "password") {
              this.loginForm.password = arr2[1];//可解密
            } else if (arr2[0] === "rememberMe") {
              this.loginForm.rememberMe = Boolean(arr2[1]);
            }
          }
        }
      },
       // 清除cookie
       clearCookie(){
        this.setCookie("", "", -1); // 清空并设置天数为负1天
      },
  
      },

      watch: {     
      radio1(newOption, oldOption) {
      // 使用Vue Router进行路由跳转
      if (newOption === '普通用户') {
        this.$router.push({name:'login'}); // 替换成你的路由路径
      } else if (newOption === '快递员') {
        this.$router.push({name:'login2'});
      } else if (newOption === '网点管理员') {
        this.$router.push({name:'login3'});
      } 
    },
    },

     mounted() {
      // 第1步，在页面加载的时候，首先去查看一下cookie中有没有用户名和密码可以用
      this.getCookie();
    },
    };
  </script>
  
  <style  scoped>
  
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:0px;
    height: 100%;
    background-size: cover;
  }
  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: black;
  }
  a {
    text-decoration: none;
    color:rgb(2, 167, 240);
  }
  .user-Avater {
     display: block;
     margin: 10px  auto;
     border-radius : 50%;
     height:80px;
     width:80px;   
  }
  .introduction {
      margin: 10px auto 30px auto;
      text-align: center;
      color: rgb(85, 85, 85);
  }
  .login-form {
    border-radius: 5px;
    border: 1px solid  rgb(85, 85, 85);
    width: 450px;
    text-align: center;
    font-size: 15px;
    padding: 25px 25px 25px 25px;
  }
   .el-button {
         display:block;
          width:120px;
          height:35px; 
          margin:0 auto; 
          border-radius: 5px;
          background-color: rgb(2, 167, 240); 
          color: #fefefe; 
          border: 2px solid rgb(185, 180, 180);
    }
   .el-input {
      width:70%;  
    }
  .el-checkbox {
       display:block; 
       margin-left:45px;
       margin-top:0px;  
       width:100px; 
       font-size:smaller; 
    }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 10px;
    float: right;
  }
  img {
      cursor: pointer;
      vertical-align: middle;
    }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: black;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
  .el-radio-group {
    font-size: 0;
    margin-bottom: 20px;
}
  </style>
   
   <style>
   .el-form-item__error {
      margin-left:60px;
   }
   </style>