import request from "@/utils/request";

// 分页查询
export function findAlarmHistoryPageList(params) {
  return request({
    url: "/alarm/list-page",
    method: "POST",
    data: params || {}
  });
}

// 获取统计
export function getAlarmHistoryAccount() {
  return request({
    url: "/alarm/count",
    method: "GET",
  });
}

// 操作处理
export function handleAlarmHistory(id) {
  return request({
    url: `/alarm/handle/${id}`,
    method: "PUT"
  });
}
// 告警转工单
export function handleAlarmToTicket(id) {
  return request({
    url: `/alarm/toTicket/${id}`,
    method: "PUT"
  });
}

// 告警铃铛
export function getAlarmHistoryBell() {
  return request({
    url: "/alarm/bell",
    method: "GET",
  });
}

// 告警铃铛
export function getAlarmHistoryKnow(id) {
  return request({
    url: `/alarm/know/${id}`,
    method: "GET",
  });
}
// 全部知晓
export function getAlarmHistoryKnowAll(params) {
  return request({
    url: `/alarm/allKnow`,
    method: "POST",
    data: params
  });
}
