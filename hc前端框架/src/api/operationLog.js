import request from "@/utils/request";

// 查询
export function findLogPageList(params) {
  return request({
    url: "/operate/log/page",
    method: "POST",
    data: params || {}
  });
}
