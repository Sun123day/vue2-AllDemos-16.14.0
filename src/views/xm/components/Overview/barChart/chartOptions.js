/**
 * 根据评分数据生成 ECharts 柱状图配置
 * 每个评分项作为一个独立的系列，可通过图例控制显示/隐藏
 * @param {Array} data - 评分数据数组，例如 [{name: '景色评分', value: 5}, ...]
 * @returns {Object} ECharts 的 option 配置对象
 */
export function getBarChartOption(data) {
  // 检查 data 是否存在且是数组
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { title: { text: '无有效数据', textStyle: { color: '#ccc' } } };
  }

  // 1. 提取 X 轴数据和图例数据
  // X 轴只有一个刻度，可以命名为“评分项目”或留空
  const xDataList = ['评分项目']; 
  // 图例数据就是每个评分项的 name
  const legendData = data.map(item => item.name);

  // 2. 动态创建 series 数组
  // 将每个数据项转换成一个独立的柱状图系列
  const series = data.map((item, index) => {
    // 为每个系列分配一个颜色，可以从一个预设的颜色数组中循环获取
    const colorPalette = ['#2B8EFF', '#56edf2', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452'];
    const color = colorPalette[index % colorPalette.length];

    return {
      name: item.name, // 系列名称，用于显示在图例中
      type: 'bar',
      // 每个系列只有一个数据点
      data: [parseFloat(item.value) || 0],
      itemStyle: {
        color: color // 为每个柱子设置不同的颜色
      }
    };
  });

  // 3. 计算统一的Y轴最大值
  // 从原始数据中找到最大值
  const maxOverallValue = Math.max(...data.map(item => parseFloat(item.value) || 0));

  let calcMax;
  if (maxOverallValue <= 0) {
    calcMax = 1;
  } else if (maxOverallValue <= 1) {
    calcMax = 1;
  } else if (maxOverallValue <= 5) {
    calcMax = 5;
  } else if (maxOverallValue <= 10) {
    calcMax = 10;
  } else {
    calcMax = Math.ceil(maxOverallValue / 50) * 50;
  }

  // 4. 构建 ECharts option 配置
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      // 自定义提示框内容，使其更清晰
      formatter: function (params) {
        let tooltipText = `${params[0].axisValueLabel}<br/>`;
        params.forEach(param => {
          tooltipText += `${param.marker}${param.seriesName}: ${param.value}<br/>`;
        });
        return tooltipText;
      }
    },
    legend: {
      // 图例数据现在是从原始数据中提取的 name 数组
      data: legendData,
      orient: 'horizontal',
      top: 'top',
      textStyle: {
        color: '#19272e'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '16',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xDataList, // X轴只有一个分类
      axisLabel: {
        color: '#19272e',
        interval: 0
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '分值',
        nameTextStyle: {
          color: '#19272e',
          fontSize: 14,
          padding: [0, 0, 0, 20]
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#19272e'
          }
        },
        axisLabel: {
          color: '#19272e'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          }
        },
        splitNumber: 5,
        min: 0,
        max: calcMax,
        interval: calcMax / 5
      }
    ],
    series: series // 将动态生成的 series 数组放入
  };

  return option;
}
