import { Post,Get,Delete, } from "@/api/request";
// {{业务员接口}}
//  获取个人信息
export function GetUserinfo(params) {
  return Get("/User/getUser", params);
}
//  获取个人信息列表
export function GetUserinfoList(params) {
  return Get("/User/getUserList", params);
}
// 删除用户
export function DeleteUser(params) {
  return Delete("/User/delUser", params);
}
//  用户分页查询
export function GetadminSearch(params) {
  return Get("/User/pageSearch", params);
}
//  修改或重置用户密码
export function PostchangePassword(params) {
  return Post("/User/saveUser", params);
}
//  修改用户在职状态
export function PostchangeStatus(params) {
  return Post("/User/saveUser", params);
}
//  修改或新增用户个人信息
export function PostsaveUserinfo (params) {
  return Post("/User/saveUser", params);
}
//  导出excel用户表
export function GetadminDownload(params) {
  return Get("/User/export", params);
}

// {{设备列表接口}}

// 获取设备列表
export function GetCamerainfoList(params) {
  return Get("/Camera/getCameraList", params);
}
//  设备分页查询
export function GetcameraSearch(params) {
  return Get("/Camera/pageSearch", params);
}
//  修改或新增设备信息
export function PostsaveCamerainfo (params) {
  return Post("/Camera/saveCamera", params);
}
// 删除设备
export function DeleteCamerainfo(params) {
  return Delete("/Camera/delCamera", params);
}


//  {{VIP列表接口}}

// 获取VIP列表
export function GetVipinfoList(params) {
  return Get("/Vip/getVipList", params);
}
//  设备分页查询
export function GetvipSearch(params) {
  return Get("/Vip/pageSearch", params);
}
//  修改或新增VIP
export function PostsaveVipinfo (params) {
  return Post("/Vip/saveVip", params);
}
// 删除VIP
export function DeleteVipinfo(params) {
  return Delete("/Vip/delVip", params);
}
// 批量删除VIP
export function DeleteVipinfoList(params) {
  return Post("/Vip/delVipList", params);
}


//  {{业务列表接口}}

// 获取业务列表
export function GetBusinessinfoList(params) {
  return Get("/Business/getBusinessList", params);
}
//  业务分页查询
export function GetbusinessSearch(params) {
  return Get("/Business/pageSearch", params);
}
//  修改或新增业务
export function PostsaveBusinessinfo (params) {
  return Post("/Business/saveBusiness", params);
}
// 删除业务
export function DeleteBusinessinfo(params) {
  return Delete("/Business/delBusiness", params);
}
// 批量删除业务
export function DeleteBusinessinfoList(params) {
  return Post("/Business/delBusinessList", params);
}


//  {{文件管理}}

// 获取业务列表
export function GetfileList(params) {
  return Get("/File/getFileList", params);
}
//  文件分页查询
export function GetfileSearch(params) {
  return Get("/File/pageSearch", params);
}
// 删除文件
export function DeleteFile(params) {
  return Delete("/File/delFile", params);
}
// 批量删除文件
export function DeleteFileList(params) {
  return Post("/File/delFileList", params);
}
//  上传文件 
export function uploadFile (params) {
  return Post("/File/uploadFile", params,{
    headers: { "content-type": "multipart/form-data" },
  });
}
//  启用文件
export function changeFileEnable (params) {
  return Post("/File/update", params);
}