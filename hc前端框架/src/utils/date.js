import dayjs from 'dayjs'

/**
 * 返回年月日
 * @export
 * @param {Date} date
 * @param {string} [splitor='-']
 * @returns
 */
export function getDate(date, splitor = '-') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
}

/**
 * 返回时分秒/时分
 * @export
 * @param {*} date
 * @param {boolean} [withSecond=false]
 * @returns
 */
export function getTime(date, withSecond = false) {
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return withSecond
        ? `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}:${addZeroPrefix(second)}`
        : `${addZeroPrefix(hour)}:${addZeroPrefix(minute)}`
}

export function getFullDate(date) {
    return `${getDate(date)} ${getTime(date)}`
}

export function isToday(date) {
    return date.toDateString() === new Date().toDateString()
}

/**
 * 个位数，加0前缀
 * @param {*} number
 * @returns
 */
function addZeroPrefix(number) {
    return number < 10 ? `0${number}` : number
}

export function formatTime(secondTime) {
    const time = secondTime
    let newTime, hour, minite, seconds
    if (time >= 3600) {
        hour = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600)
        minite =
            parseInt((time % 60) / 60) < 10
                ? '0' + parseInt((time % 60) / 60)
                : parseInt((time % 60) / 60)
        seconds = time % 3600 < 10 ? '0' + (time % 3600) : time % 3600
        if (seconds > 60) {
            minite =
                parseInt(seconds / 60) < 10 ? '0' + parseInt(seconds / 60) : parseInt(seconds / 60)
            seconds = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60
        }
        newTime = hour + ':' + minite + ':' + seconds
    } else if (time >= 60 && time < 3600) {
        minite = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)
        seconds = time % 60 < 10 ? '0' + (time % 60) : time % 60
        newTime = '00:' + minite + ':' + seconds
    } else if (time < 60) {
        seconds = time < 10 ? '0' + time : time
        newTime = '00:00:' + seconds
    }
    return newTime
}

/**
 * 传入时间以及类型返回对应开始/结束时间
 * @param {*} param
 * @returns
 */
export function transformDateCondition({ code, date }) {
    const result = { code, startDate: '', endDate: '' }

    if (['year', 'month'].includes(code)) {
        result.startDate = dayjs(date).startOf(code).format('YYYY-MM-DD 00:00:00')
        result.endDate = dayjs(date).endOf(code).format('YYYY-MM-DD 23:59:59')
    }
    if (code === 'month') {
        result.startDate = dayjs(date).startOf('month').format('YYYY-MM-DD 00:00:00')
        result.endDate = dayjs(date).endOf('month').format('YYYY-MM-DD 23:59:59')
    }
    if (code === 'day') {
        result.startDate = dayjs(date).format('YYYY-MM-DD 00:00:00')
        result.endDate = dayjs(date).format('YYYY-MM-DD 23:59:59')
    }
    if (code === 'week') {
        result.startDate = dayjs(date).startOf('week').format('YYYY-MM-DD 00:00:00')
        result.endDate = dayjs(date).endOf('week').format('YYYY-MM-DD 23:59:59')
    }
    if (code === 'custom') {
        const datesWithTime = date.map((item) =>
            dayjs(item).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        )
        result.startDate = datesWithTime[0]
        result.endDate = datesWithTime[1]
    }
    return result
}
