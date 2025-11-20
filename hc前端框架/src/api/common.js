/**
 * @description 公共接口
 */

import request from '@/utils/request'

// 获取华创跳转的url
export const getIframeUrl = (baseUrl, userId) =>
    request({ url: `/hmac?baseUrl=${baseUrl}&userId=${userId}`, method: 'get' })

//地区下拉列表
export const findAreaOptions = () => request({ url: `/area/areaOptions`, method: 'get' })

//字典
export const findComboOptions = (key) =>
    request({ url: `/dict/value/combo?dictCode=${key}`, method: 'get' })

//枚举
export const findEnumOptions = (key) => request({ url: `/common/combo?type=${key}`, method: 'get' })

// 项目分项树
export const findProjectSubitemTree = () => request({ url: `/subitem/tree`, method: 'get' })

// 分项树
export const findSubitemTree = (projectId) =>
    request({ url: `/subitem/tree/${projectId}`, method: 'get' })

// 按能源类型过滤分项树
export const findSubitemTreeByEnergyType = (data) =>
    request({ url: `/subitem/project-energy-type-tree`, method: 'post', data })

// 按能源类型过滤项目分项树
export const findProjectSubitemTreeByEnergyType = (data) =>
    request({ url: `/subitem/energy-type-tree`, method: 'post', data })

//城市下拉列表
export const findCityOptions = (areaCode) =>
    request({ url: `/area/cityOptions/${areaCode}`, method: 'get' })

//项目下拉列表
export const findProjectOptions = () => request({ url: `/project/options`, method: 'get' })

//根据项目id获取计量器具
export const findMeterOptions = (projectId) =>
    request({ url: `/meter/options/${projectId}`, method: 'get' })

//汉字转拼音
export const chineseToPinyin = (name) =>
    request({ url: `/common/chinese-to-pinyin/?chinese=${name}`, method: 'get' })

//  计量器具类型下拉选择
export const findMeterTypeOptions = () => request({ url: `/meter/type/options`, method: 'get' })

// 运维人员下拉选择
export const findOperatorOptions = (projectId) =>
    request({ url: `/operator/options/${projectId}`, method: 'get' })

// 根据项目id和能源类型查询计量器具
export const findMeterEnergyType = (data) =>
    request({ url: `/meter/list-energy-type`, method: 'post', data })

export const findMeterByMeterType = (projectId, typeId) =>
    request({ url: `/meter/options/type/${projectId}/${typeId}`, method: 'get' })

// 计量器具累计属性下拉信息
export const findPropertMeterType = (meterUtensilTypeId) =>
    request({ url: `/meter/type/property-accumulated/option/${meterUtensilTypeId}`, method: 'get' })
// 计量器具属性下拉信息
export const findPropertMeterTypeOption = (meterUtensilTypeId) =>
    request({ url: `/meter/type/property/option/${meterUtensilTypeId}`, method: 'get' })

/**
 * @function 户号下拉-根据能源类型获取户号;
 * @param {*} energyType
 * @returns
 */
export const findUserNumberCom = (energyType) =>
    request({ url: `/user/no/options/${energyType}`, method: 'get' })

//变压器下拉表
export const findDeviceTransformer = (data) =>
    request({ url: `/device/qryDevice`, method: 'post', data })

// 计量器具树
export const findMeterTree = (data) => request({ url: `/meter/tree`, method: 'post', data })

// 能源类型下拉
export const findEnergySelect = (projectId) =>
    request({ url: `/project/energy/${projectId}`, method: 'get' })

// 电网归属下拉
export const findElectricityGridOptions = () =>
    request({ url: `/electricity-grid/option`, method: 'get' })

// 根据电网ID获取用电类型下拉
export const findElectricityTypeGridOptions = (electricityGridId) =>
    request({ url: `/electricity-grid/use-type/option/${electricityGridId}`, method: 'get' })

// 根据用电类型获取电压等级下拉
export const findElectricityLevelGridOptions = (electricityTypeId) =>
    request({ url: `/electricity-grid/voltage-level/option/${electricityTypeId}`, method: 'get' })

//根据项目id获取项目信息，进而获取电网ID
export const findProjectInfoByProjectId = (projectId) =>
    request({ url: `/project/${projectId}`, method: 'get' })
