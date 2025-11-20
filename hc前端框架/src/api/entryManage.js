import request from "@/utils/request";

// 用电新增
export function addEntryElecInfo(params) {
  return request({
    url: "/supply/electricity",
    method: "POST",
    data: params || {}
  });
}

// 用电更新
export function updateEntryElecInfo(params) {
  return request({
    url: "/supply/electricity",
    method: "PUT",
    data: params || {}
  });
}

// 用电分页
export function findEntryElecPageList(params) {
  return request({
    url: "/supply/electricity/list-page",
    method: "POST",
    data: params || {}
  });
}
// 制冷新增
export function addEntryColdInfo(params) {
  return request({
    url: "/supply/area",
    method: "POST",
    data: params || {}
  });
}

// 制冷更新
export function updateEntryColdInfo(params) {
  return request({
    url: "/supply/area",
    method: "PUT",
    data: params || {}
  });
}

// 制冷详情
export function detailEntryColdInfo(id) {
  return request({
    url: `/supply/area/detail/${id}`,
    method: "GET"
  });
}

// 制冷分页
export function findEntryColdPageList(params) {
  return request({
    url: "/supply/area/list-page",
    method: "POST",
    data: params || {}
  });
}
