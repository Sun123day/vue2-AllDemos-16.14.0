import request from "@/utils/request";

// 温湿度
export function getConfigurationTempHum(projectId) {
  return request({
    url: `/run/configuration/tempHum/${projectId}`,
    method: "GET",
  });
}

// 关键参数
export function getConfigurationKeyValue(projectId) {
  return request({
    url: `/run/configuration/keyValue/${projectId}`,
    method: "GET",
  });
}

// 功率曲线
export function getConfigurationPower(projectId) {
  return request({
    url: `/run/configuration/power/${projectId}`,
    method: "GET",
  });
}

// 获取配置测点下拉
export function getConfigurationPointsOptions(projectId) {
  return request({
    url: `/run/configuration/points/${projectId}`,
    method: "GET",
  });
}

// 组态位置测点匹配
export function findConfigurationSave(pramas) {
  return request({
    url: `/run/configuration/locatePoint/saveUpdate`,
    method: "POST",
    data: pramas,
  });
}

// 组态位置测点数据
export function findConfigurationDataList(projectId) {
  return request({
    url: `/run/configuration/locate/data/${projectId}`,
    method: "POST",
  });
}

// 组态位置测点查询
export function upDateConfigurationSearch(pramas) {
  return request({
    url: `/run/configuration/locatePoint`,
    method: "POST",
    data: pramas,
  });
}

// AI寻优控制
export function getLeftAIControl(projectId) {
  return request({
    url: `/run/configuration/ai/control/${projectId}`,
    method: "GET",
  });
}

// 右侧AI设定=》当前优化边界
export function rightAIBorder(pramas) {
  return request({
    url: `/run/configuration/ai/param`,
    method: "POST",
    data: pramas,
  });
}
// 查询右侧AI设定=》当前优化边界
export function getRightAIBorder(pramas) {
  return request({
    url: `/run/configuration/ai/getParam`,
    method: "POST",
    data: pramas,
  });
}

// 获取运行时长【含当前状态】
export function getLeftRunTimeLong(projectId) {
  return request({
    url: `/projectAIRun/runTime/${projectId}`,
    method: "GET",
  });
}

// 保存及更新项目AI切换信息【输入密码】
export function rightLoginForm(pramas) {
  return request({
    url: `/projectAIRun/saveUpdateInfo`,
    method: "POST",
    data: pramas,
  });
}

// 项目状态切换【保存策略】
export function rightChangeMoudle(pramas) {
  return request({
    url: `/projectAIRun/switchAi`,
    method: "POST",
    data: pramas,
  });
}