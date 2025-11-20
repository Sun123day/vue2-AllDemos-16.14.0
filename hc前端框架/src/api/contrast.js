

import request from "@/utils/request";


/**
 *能耗对比
 *
 * @export
 * @return {*} 
 */
export function consumptionCompare(data) {
  return request({
    url: "/compare/analysis/consumption-compare",
    method: "post",
    data
  });
}


export function consumptionPeriod(data) {
  return request({
    url: "/compare/analysis/period",
    method: "post",
    data
  });
}




/**
 * 环比数据
 *
 * @export
 * @return {*} 
 */
export function consumptionCycle(data) {
    return request({
      url: `/compare/analysis/cycle`,
      method: "post",
      data
    });
  }




