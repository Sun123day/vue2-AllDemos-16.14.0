import request from "@/utils/request";

// 遥测分析
export function findTelemetryAnalysis(params) {
  return request({
    url: "/electric/telemetry/analysis",
    method: "POST",
    data: params || {}
  });
}

// 计量器具分项树
export function getRunHistoryTree() {
  return request({
    url: `/subitem/getMeterSumitemTree`,
    method: "GET",
  });
}

// 参量对比
export function findParameterContrast(params) {
  return request({
    url: "/energy/parameter/contrastive",
    method: "POST",
    data: params || {}
  });
}
// 属性下拉
export function findParameterProperty(params) {
  return request({
    url: "/energy/parameter/property",
    method: "POST",
    data: params || {}
  });
}