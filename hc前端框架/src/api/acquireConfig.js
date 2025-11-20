import request from "@/utils/request";

// 新增
export function addAcquireConfigInfo(params) {
  return request({
    url: "/collect",
    method: "POST",
    data: params || {}
  });
}

// 更新
export function updateAcquireConfigInfo(params) {
  return request({
    url: "/collect",
    method: "PUT",
    data: params || {}
  });
}

// 删除
export function deleteAcquireConfigInfo(id) {
  return request({
    url: `/collect/${id}`,
    method: "DELETE"
  });
}

// 分页
export function findAcquireConfigList() {
  return request({
    url: "/collect/list",
    method: "POST",
  });
}
export function findAcquireConfigProjectOptions() {
  return request({
    url: "/collect/project/options",
    method: "GET",
  });
}