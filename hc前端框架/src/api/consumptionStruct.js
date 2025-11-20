import request from "@/utils/request";

// 查询用电结构
export function findConsumptionStruct(params) {
  return request({
    url: "/consumption/struct",
    method: "POST",
    data: params || {}
  });
}

// 查询占比趋势和表格
export function findConsumptionStructReport(params) {
  return request({
    url: "/consumption/struct/trend-report",
    method: "POST",
    data: params || {}
  });
}
