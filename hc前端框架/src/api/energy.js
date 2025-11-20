// 能耗分析模拟数据
// 生成模拟数据
/*
indexTypeOptions: [
                    { label: '制冷系统能耗强度指标', value: 'cooling' },
                    { label: '空调末端能耗指标', value: 'terminal' },
                ],
*/
const generateMockData = (timeGrain, dateRange, indexType = 'cooling') => {
    const records = []
    let startDate = new Date(dateRange[0])
    const endDate = new Date(dateRange[1])

    // 定义两种指标的基准值和约束值
    const indicators = {
        cooling: {
            name: '制冷系统能耗强度指标',
            unit: 'kWh/m²',
            benchmarkValue: 38.6,
            constraintValue: 44.6,
        },
        terminal: {
            name: '空调末端能耗指标',
            unit: 'kWh/m²',
            benchmarkValue: 8.7,
            constraintValue: 14.9,
        },
    }

    // 根据指标类型选择对应的基准值和约束值
    const selectedIndicator = indicators[indexType]
    const benchmarkValue = selectedIndicator.benchmarkValue
    const constraintValue = selectedIndicator.constraintValue

    console.log(indexType)

    console.log('benchmarkValue', benchmarkValue)
    console.log('constraintValue', constraintValue)

    while (startDate <= endDate) {
        // 生成在合理范围内的随机值（基准值上下浮动20%）
        const indexValue = (benchmarkValue * (0.8 + Math.random() * 0.4)).toFixed(2)

        records.push({
            date: startDate.toISOString().split('T')[0],
            indexValue: Number(indexValue),
            benchmarkValue,
            constraintValue,
            benchmarkDiff: (indexValue - benchmarkValue).toFixed(2),
            constraintDiff: (indexValue - constraintValue).toFixed(2),
        })

        // 根据时间粒度增加日期
        switch (timeGrain) {
            case 'day':
                startDate.setDate(startDate.getDate() + 1)
                break
            case 'month':
                startDate.setMonth(startDate.getMonth() + 1)
                break
            case 'year':
                startDate.setFullYear(startDate.getFullYear() + 1)
                break
        }
    }

    // 确保至少有一条记录
    if (records.length === 0) {
        const indexValue = (Math.random() * 20 + 10).toFixed(2)
        records.push({
            date: new Date().toISOString().split('T')[0],
            indexValue: Number(indexValue),
            benchmarkValue: benchmarkValue,
            constraintValue: constraintValue,
            benchmarkDiff: (indexValue - benchmarkValue).toFixed(2),
            constraintDiff: (indexValue - constraintValue).toFixed(2),
        })
    }

    // 计算统计数据
    const lastRecord = records[records.length - 1]
    const stats = {
        currentValue: lastRecord.indexValue,
        benchmarkValue: lastRecord.benchmarkValue,
        constraintValue: lastRecord.constraintValue,
        benchmarkDiff: lastRecord.benchmarkDiff,
        constraintDiff: lastRecord.constraintDiff,
    }

    // 生成图表数据
    const chartData = {
        dates: records.map((item) => item.date),
        values: records.map((item) => item.indexValue),
        benchmark: records.map(() => benchmarkValue),
        constraint: records.map(() => constraintValue),
    }

    return {
        tableData: records,
        total: records.length,
        stats,
        chartData,
    }
}

// 模拟接口
export function getEnergyData(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = generateMockData(data.timeGrain, data.dateRange, data.indexType)
            resolve({
                code: '200',
                data: mockData,
            })
        }, 500)
    })
}

// 模拟导出接口
export function exportEnergyData(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: '200',
                data: new Blob(['模拟的Excel文件内容'], { type: 'application/vnd.ms-excel' }),
            })
        }, 500)
    })
}
