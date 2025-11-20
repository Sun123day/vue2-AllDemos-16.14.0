//格式yyyy-mm
export function formatDateFun(time) {
  var timeArry = ['', ''];
  if (time.length == 4) {
    timeArry[0] = time + '-01-01';
    timeArry[1] = time + '-12-31';
  }
  if (time.length == 7) {
    var year = Number(time.substring(0, 4));
    var month = Number(time.substring(5, 7));
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      days[1] = 29;
    }
    timeArry[0] = time + '-01';
    timeArry[1] = time + '-' + days[month - 1];
  }
  if (time.length == 10) {
    var date = new Date(time);
    const nowTime = date.getTime();
    // getDay()返回0-6，其中0表示周日，需特殊处理
    const day = date.getDay() > 0 ? date.getDay() : 7; // 表示当前是周几
    const oneDayTime = 24 * 60 * 60 * 1000; // 一天的总ms
    // 本周一时间戳
    const mondayTime = nowTime - (day - 1) * oneDayTime;
    // 本周日时间戳
    const sundayTime = nowTime + (7 - day) * oneDayTime;
    // 可以通过自定义函数（format）格式化时间戳
    timeArry[0] = dateFormatFun(mondayTime, 'yyyy-mm-dd');
    timeArry[1] = dateFormatFun(sundayTime, 'yyyy-mm-dd');
  }
  return timeArry;
}
//时间戳格式化
export function dateFormatFun(value, type) {
  var dateVal = value + '';
  if (value != null) {
    var date = new Date(
      parseInt(dateVal.replace('/Date(', '').replace(')/', ''), 10)
    );
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var currentDate =
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (type == 'yyyy') {
      return date.getFullYear();
    } else if (type == 'yyyy-mm-dd') {
      return date.getFullYear() + '-' + month + '-' + currentDate;
    } else if (type == 'yyyy-mm-dd hh') {
      return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hours;
    } else if (type == 'yyyy-mm-dd hh:mm') {
      return (
        date.getFullYear() +
        '-' +
        month +
        '-' +
        currentDate +
        ' ' +
        hours +
        ':' +
        minutes
      );
    } else if (type == 'mm-dd hh:mm') {
      return month + '-' + currentDate + ' ' + hours + ':' + minutes;
    } else if (type == 'hh:mm') {
      return hours + ':' + minutes;
    } else {
      return (
        date.getFullYear() +
        '-' +
        month +
        '-' +
        currentDate +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      );
    }
  } else {
    return '';
  }
}

/** 时间格式转换
 * @param e 要转换的日期(如：Sat Nov 26 2022 21:37:29 GMT+0800 (中国标准时间))
 * @returns {string} 转换结果(如：2022-11-26 21:37:29)
 */
export function timeFormatConvert(e) {
  const Y = e.getFullYear(); // 年
  const M = prefixZero(e.getMonth() + 1); // 月
  const D = prefixZero(e.getDate()); // 日
  // const H = prefixZero(e.getHours()) // 时
  // const Mi = this.prefixZero(e.getMinutes()) // 分
  // const S = this.prefixZero(e.getSeconds()) // 秒
  return Y + '-' + M + '-' + D;
}
export function prefixZero(num = 0, n = 2) {
  // 数字位数不够，数字前面补零
  return (Array(n).join('0') + num).slice(-n);
}

/** 获取当前时间几周的周天时间
 * @param number 要获取几周前
 * @param today 今天日期
 * @returns {Array} ,0为几周前的日期，1为上周的周天日期
 */
//
export function lastWeekTimeFun(number, today) {
  var time = ['', ''];
  if (!number) {
    number = 1;
  }
  var year = today.getFullYear(); //本年
  var month = today.getMonth() + 1; //本月
  var day = today.getDate(); //本日
  var newDate = new Date(year + '-' + month + '-' + day + ' 00:00:00');
  var nowTime = newDate.getTime();
  var weekDay = newDate.getDay();
  var oneDayTime = 24 * 60 * 60 * 1000;
  //当前星期减去天数，如今天为周五，则本周一为周五的时间戳减去4天的时间戳。但周日特殊，周一至周六是周几的到的weekDay就是几，但是周日的到的为0，需特殊处理
  var thisWeekMondayTime = (1 - weekDay) * oneDayTime + nowTime; //本周一的时间戳
  if (weekDay == 0) {
    // weekDay = 0 为周日，此时本周一时间为周日减去6天的时间
    thisWeekMondayTime = nowTime - 6 * oneDayTime;
  }
  var lastWeekMondayTime = thisWeekMondayTime - 7 * oneDayTime * number;
  var lastWeekSundayTime = thisWeekMondayTime - oneDayTime; // 上周日
  time[0] = lastWeekMondayTime;
  time[1] = lastWeekSundayTime;
  return time;
}

//计算本年的周数
export function getYearWeek(endDate) {
    //本年的第一天
    var beginDate = new Date(endDate.getFullYear(), 0, 1);
    //星期从0-6,0代表星期天，6代表星期六
    var endWeek = endDate.getDay();
    if (endWeek == 0) endWeek = 7;
    var beginWeek = beginDate.getDay();
    if (beginWeek == 0) beginWeek = 7;
    //计算两个日期的天数差
    var millisDiff = endDate.getTime() - beginDate.getTime();
    var dayDiff = Math.floor(( millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(dayDiff / 7);
}
// //时间戳格式化
// export function dateFormatFun(value, type) {
//   var dateVal = value + '';
//   if (value != null) {
//     var date = new Date(
//       parseInt(dateVal.replace('/Date(', '').replace(')/', ''), 10)
//     );
//     var month =
//       date.getMonth() + 1 < 10
//         ? '0' + (date.getMonth() + 1)
//         : date.getMonth() + 1;
//     var currentDate =
//       date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

//     var hours =
//       date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
//     var minutes =
//       date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
//     var seconds =
//       date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
//     if (type == 'yyyy') {
//       return date.getFullYear();
//     } else if (type == 'yyyy-mm-dd') {
//       return date.getFullYear() + '-' + month + '-' + currentDate;
//     } else if (type == 'yyyy-mm-dd hh') {
//       return (
//         date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hours
//       );
//     } else if (type == 'yyyy-mm-dd hh:mm') {
//       return (
//         date.getFullYear() +
//         '-' +
//         month +
//         '-' +
//         currentDate +
//         ' ' +
//         hours +
//         ':' +
//         minutes
//       );
//     } else if (type == 'mm-dd hh:mm') {
//       return month + '-' + currentDate + ' ' + hours + ':' + minutes;
//     } else if (type == 'hh:mm') {
//       return hours + ':' + minutes;
//     } else {
//       return (
//         date.getFullYear() +
//         '-' +
//         month +
//         '-' +
//         currentDate +
//         ' ' +
//         hours +
//         ':' +
//         minutes +
//         ':' +
//         seconds
//       );
//     }
//   } else {
//     return '';
//   }
// }
