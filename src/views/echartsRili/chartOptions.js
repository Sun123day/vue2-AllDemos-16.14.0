import * as echarts from 'echarts'

// 生成虚拟数据的函数
export function getVirtualData() {
  const date = +echarts.time.parse('2025-01-01'); // 解析开始日期
  const end = +echarts.time.parse('2025-02-01'); // 解析结束日期
  const dayTime = 3600 * 24 * 1000; // 一天的毫秒数
  const data = []; // 初始化数据数组
  for (let time = date; time < end; time += dayTime) { // 循环每一天
    data.push([ // 添加日期和随机数到数据数组
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), // 格式化日期
      Math.floor(Math.random() * 10000) // 生成一个0到9999的随机数
    ]);
  }
  return data; // 返回数据数组
}

// export function getPieChartOption(data) {
export function getPieChartOption() {
  const cellSize = [80, 80]; // 设置日历单元格的宽度和高度
  const pieRadius = 30; // 设置饼图的半径

  const scatterData = getVirtualData(); // 获取虚拟数据

  // 生成饼图系列的函数
  const pieSeries = scatterData.map(function (item, index) {
    return { // 返回饼图配置对象
      type: 'pie', // 系列类型为饼图
      id: 'pie-' + index, // 设置饼图的id
      center: item[0], // 设置饼图的中心位置（这里使用日期字符串，但应该是坐标）
      radius: pieRadius, // 设置饼图的半径
      coordinateSystem: 'calendar', // 使用日历坐标系
      label: {
        show: false, // 不显示标签
      },
      data: [ // 饼图的数据
        { name: '牛马时间', value: Math.round(Math.random() * 24) }, // 工作时间
        { name: '好好休息', value: Math.round(Math.random() * 24) } // 睡眠时间
      ]
    };
  });

  // ECharts的配置对象
  const option = {
    tooltip: {}, // 提示框配置
    legend: { // 图例配置
      data: ['牛马时间', '好好休息'], // 图例数据
      bottom: 20 // 图例位置
    },
    calendar: { // 日历坐标系配置
      top: 'middle', // 位置
      left: 'center', // 位置
      orient: 'vertical', // 方向
      cellSize: cellSize, // 单元格大小
      yearLabel: { // 年份标签配置
        show: false, // 不显示年份标签
        fontSize: 30 // 字体大小
      },
      dayLabel: { // 日期标签配置
        margin: 20, // 边距
        // firstDay: 1, // 从周一开始
        firstDay: 7, // 从周天开始
        nameMap: ['日', '一', '二', '三', '四', '五', '六', '日'] // 日期名称映射
      },
      monthLabel: { // 月份标签配置
        show: false, // 不显示月份标签
      },
      range: ['2025-01'] // 设置日历范围
    },
    series: [ // 系列列表
      {
        id: 'label', // 系列id
        type: 'scatter', // 系列类型为散点图
        coordinateSystem: 'calendar', // 使用日历坐标系
        symbolSize: 0, // 散点大小为0（不显示散点）
        label: { // 标签配置
          show: true, // 显示标签
          formatter: function (params) { // 标签格式化函数
            return echarts.time.format(params.value[0], '{dd}', false); // 返回日期的日部分
          },
          offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10], // 标签偏移量
          fontSize: 14 // 字体大小
        },
        data: scatterData // 数据
      },
      ...pieSeries // 展开饼图系列
    ]
  };

  return option;
}
