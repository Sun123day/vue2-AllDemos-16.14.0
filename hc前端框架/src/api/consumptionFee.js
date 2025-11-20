import request from "@/utils/request";

// 查询
export function findConsumptionFee(params) {
  return request({
    url: "/consumption/price",
    method: "POST",
    data: params || {}
  });
}
