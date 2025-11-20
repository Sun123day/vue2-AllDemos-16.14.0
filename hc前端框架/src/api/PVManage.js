import request from "@/utils/request";

// 分页
export function findStationPageList() {
  return request({
    url: "/electricity-station/list",
    method: "GET",
  });
}

// 新增
export function addStationInfo(params) {
  return request({
    url: "/electricity-station",
    method: "POST",
    data: params || {}
  });
}

// 更新
export function updateStationInfo(params) {
  return request({
    url: "/electricity-station",
    method: "PUT",
    data: params || {}
  });
}

// 删除
export function deleteStationInfo(id) {
  return request({
    url: `/electricity-station/${id}`,
    method: "DELETE"
  });
}

// 逆变器列表
export function findInverterPageList(stationId) {
  return request({
    url: `/electricity-station/inverter-list/${stationId}`,
    method: "GET",
  });
}

// 删除逆变器
export function deleteInverterInfo(stationMeterUtensilId) {
  return request({
    url: `/electricity-station/unbind-inverter/${stationMeterUtensilId}`,
    method: "POST"
  });
}

//绑定逆变器
export function bindInverterInfo(params) {
  return request({
    url: "/electricity-station/binding-inverter",
    method: "POST",
    data: params || {}
  });
}
export function editInverterInfo(params) {
  return request({
    url: "/electricity-station/inverter-update",
    method: "POST",
    data: params || {}
  });
}
//逆变器绑定时计量器下拉
export function getInverterMeterOption(projectId) {
  return request({
    url: `/electricity-station/inverter-option/${projectId}`,
    method: "GET",
  });
}