import request from "@/utils/request";

// 指标概览
export function findAssessView(params) {
  return request({
    url: "/energy/assessment/view",
    method: "POST",
    data: params || {}
  });
}

// 指标对比
export function findAssessCompare(params) {
  return request({
    url: "/energy/assessment/compare",
    method: "POST",
    data: params || {}
  });
}

// 指标评价
export function findAssessEvaluate(params) {
  return request({
    url: "/energy/assessment/evaluate",
    method: "POST",
    data: params || {}
  });
}
