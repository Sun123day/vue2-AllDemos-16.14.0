import request from "@/utils/request";

// 诊断分析
export function findDiagnosisAnalysisInfo(params) {
  return request({
    url: "/operate/analysis",
    method: "POST",
    data: params || {}
  });
}

// 获取设备下拉选项
export function findDiagnosisDeviceList(params) {
  return request({
    url: `/operate/analysis/meters`,
    method: "POST",
    data: params || {}
  });
}

