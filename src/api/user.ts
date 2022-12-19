import {baseAxios } from "./base";

const api = {
  postReport: '/api/report/post',
  getReport: '/api/report/get',
  postLearn: '/api/learn/post',
  getLearn: '/api/learn/get',
}
export function getReport(param: any) {
  return baseAxios({
    url: api.getReport,
    method: 'get',
    params: param
  })
}

export function postReport(data: any) {
  return baseAxios({
    url: api.postReport,
    method: 'post',
    data: data
  })
}


export function getLearn(param: any) {
  return baseAxios({
    url: api.getLearn,
    method: 'get',
    params: param
  })
}

export function postLearn(data: any) {
  return baseAxios({
    url: api.postLearn,
    method: 'post',
    data: data
  })
}
