import request from "@/utils/request";

// 新增
export function addGateWayInfo(params) {
  return request({
    url: "/electric-meter/gateway",
    method: "POST",
    data: params || {}
  });
}

// 更新
export function updateGateWayInfo(params) {
  return request({
    url: "/electric-meter/gateway",
    method: "PUT",
    data: params || {}
  });
}

// 删除
export function deleteGateWayInfo(id) {
  return request({
    url: `/electric-meter/gateway/${id}`,
    method: "DELETE"
  });
}

// 分页
export function findGateWayPageList(params) {
  return request({
    url: "/electric-meter/gateway/list-page",
    method: "POST",
    data: params || {}
  });
}

//电表网关下拉列表
export function findGateWayOptions(projectId) {
  return request({
    url: `/electric-meter/gateway/options/${projectId}`,
    method: "GET",
  });
}