import {baseAxios } from "./base";

const api = {
  getJobList: '/api/model_job/get',
  postJob: '/api/model_job/get',
}
// 登录方法
export function user(param: any,) {
  return baseAxios({
    url: api.getJobList,
    method: 'get',
    params: param
  })
}

export function postJob(param: any){
  return baseAxios({
    url: api.postJob,
    method: 'post',
    data: param
  })
}


