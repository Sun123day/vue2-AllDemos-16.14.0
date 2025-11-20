import request from "@/utils/request";

// 新增
export function addAreaCarbonInfo(params) {
  return request({
    url: "/area-carbon",
    method: "POST",
    data: params || {}
  });
}

// 更新
export function updateAreaCarbonInfo(params) {
  return request({
    url: "/area-carbon",
    method: "PUT",
    data: params || {}
  });
}

// 删除
export function deleteAreaCarbonInfo(id) {
  return request({
    url: `/area-carbon/${id}`,
    method: "DELETE"
  });
}

// 分页
export function findAreaCarbonPageList(params) {
  return request({
    url: "/area-carbon/list",
    method: "POST",
    data: params || {}
  });
}