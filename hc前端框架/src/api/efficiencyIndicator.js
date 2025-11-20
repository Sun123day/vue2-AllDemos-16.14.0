import request from "@/utils/request";

// 分页
export function findEfficiencyIndicatorPageList(params) {
  return request({
    url: "/energy/efficiency/index",
    method: "POST",
    data: params || {}
  });
}