import request from "@/utils/request";

// 
export function getGateWayInfo(params) {
  return request({
    url: "/electric-meter/gateway",
    method: "POST",
    data: params || {}
  });
}
// 
export function getEnergyAmount(params) {
  return request({
    url: "/electric-meter/gateway",
    method: "POST",
    data: params || {}
  });
}
// 右下节能ai运行状态
export function getElectricAiStatus() {
  return request({
    url: "/largeScreen/aiRun",
    method: "GET",
  });
}
// 右下设备ai运行状态
export function getDeviceAiStatus() {
  return request({
    url: "/largeScreen/aiLog",
    method: "GET",
  });
}

// 左上空调节能效益
export function getSaveEnergy() {
  return request({
    url: "/largeScreen/saveEnergy",
    method: "GET",
  });
}
// 左下中近12月能耗
export function getEnergyMonths() {
  return request({
    url: "/largeScreen/months",
    method: "GET",
  });
}
// 左下能耗指标排名
export function getEnergyIndex() {
  return request({
    url: "/largeScreen/energyIndex",
    method: "GET",
  });
}

// 中上累计用能
export function getTotalEnergy() {
  return request({
    url: "/largeScreen/totalEnergy",
    method: "GET",
  });
}
// 中下地图数据
export function getMapData() {
  return request({
    url: "/largeScreen/map",
    method: "GET",
  });
}
// 右上冷站数据
export function getColdStation() {
  return request({
    url: "/largeScreen/coldStation",
    method: "GET",
  });
}