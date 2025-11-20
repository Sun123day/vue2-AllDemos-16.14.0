import request from "@/utils/request";

// 重计算
export function findIndicatorReCompute(params) {
  return request({
    url: "/energy/index/recalculate",
    method: "POST",
    data: params || {}
  });
}
// 总数据
export function findIndicatorTotal(params) {
  return request({
    url: "/energy/index/total",
    method: "POST",
    data: params || {}
  });
}
// 详细数据
export function findIndicatorDetail(params) {
  return request({
    url: "/energy/index/detail",
    method: "POST",
    data: params || {}
  });
}
