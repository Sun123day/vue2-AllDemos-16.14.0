import request from "@/utils/request";

// 新增
export function addProArchiveInfo(params) {
  return request({
    url: "/project",
    method: "POST",
    data: params || {}
  });
}

// 更新
export function updateProArchiveInfo(params) {
  return request({
    url: "/project",
    method: "PUT",
    data: params || {}
  });
}

// 删除
export function deleteProArchiveInfo(id) {
  return request({
    url: `/project/${id}`,
    method: "DELETE"
  });
}

// 分页
export function findProArchivePageList(params) {
  return request({
    url: "/project/list-page",
    method: "POST",
    data: params || {}
  });
}

//项目下拉列表
export function findProArchiveOptions() {
  return request({
    url: `/project/options`,
    method: "GET",
  });
}

//根据id获取详情
export function getProArchiveInfoById(id) {
  return request({
    url: `/project/${id}`,
    method: "GET",
  });
}

export function getPropertyOptions() {
  return request({
    url: `/property`,
    method: "GET",
  });
}