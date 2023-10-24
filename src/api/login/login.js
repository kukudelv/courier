import { Post } from "@/api/request";

  // 提交登录表单
  export function postLoginFormData (params)  {
    return Post("/User/login", params);
  }
  // 提交注册表单
  export function postRegisterFormData (params)  {
    return Post("/User/register", params);
  }
  //  找回密码，获取密保问题
  export function postfindpasswordFormData (params)  {
    return Post("/User/update", params);
  }
 
   //  找回密码，获取密保问题
   export function postfindpassword (params)  {
    return Post("/User/update", params);
  }