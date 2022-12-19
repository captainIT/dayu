import {baseAxios } from "./base";

const api = {
  postReport: '/api/report/post',
  getReport: '/api/report/get',
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


