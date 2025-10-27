export function getPieChartOption(data) {
  
  if (!data || data.length === 0) {
    data = [
        ['好评', '0', '0'],
        ['中评', '0', '0'],
        ['差评', '0', '0'],
      ]
  }
  // 转换数据格式，将成本和占比从字符串转换为数字
  const formattedData = data.map((item, index) => ({
    // name: index == 0 ? '上网电量' : '自用电量',
    // value: parseInt(item[0], 10),
    name: item[0],
    value: parseInt(item[1] || 0, 10),
    rate: parseInt(item[2] || 0, 10)
  }));

  const maxRateIndex = formattedData.reduce((maxIndex, item, index) => 
    item.rate > formattedData[maxIndex].rate ? index : maxIndex, 0
  ); // 获取最大 rate 的索引

  const color = [
    '#409eff',
    '#67c23a',
    '#f56c6c',
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      // formatter: `{b}:{c}元({d}%)` // 显示名称、值和百分比
        formatter: function(params) {
          console.log(params);
          // params 是当前悬停项的数据对象
          // params.name: 名称 (例如: "产品1")
          // params.value: 值 (例如: 100)
          // params.percent: 百分比 (例如: 16.67)

          // 使用模板字符串和换行符 \n 来构建多行文本
          return `
          <div style="text-align: left;">
            名称：${params.name}<br>
            电量：${params.value}条<br>
            占比：${params.data.rate}%
          </div>
          `;
          
            // 占比：${params.percent}%
        }
    },
    legend: {
      orient: 'vertical',
      right: '0%',
      textStyle: {
        color: '#19272e', // 设置文字颜色为白色
      },
      icon: 'circle',
      formatter: function (name) {
        const item = formattedData.find(item => item.name === name);
        if (item) {
          return `${name}: ${item.value}(${item.rate}%)`;
        }
        return name;
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['40%', '50%'],
        data: formattedData.map((item, index) => ({
          name: item.name,
          value: item.value, // 使用成本作为饼图的值
          rate: item.rate,
          itemStyle: {
            color: color[index % color.length]
          }
        })),
        label: {
          show: true,
          position: 'center',
          fontSize: 26,
          // color: color[maxRateIndex % color.length],
          color: '#35495e',
          formatter: function () {
            return `${formattedData[maxRateIndex].rate}%`;
          },        
          emphasis: {
            label: {
              show: true,
              fontSize: 26,
              fontWeight: 'bold',
              formatter: function (params) {
                return `${params.data.rate}%`; // 悬停时显示当前悬停的内容
              },
              color: function (params) {
                return params.data.itemStyle.color; // 使用悬停项对应的颜色
              },
            },
          },
        },
      },
      {
        radius: ['0', '55%'],
        center: ['40%', '50%'],
        type: 'pie',
        z: 10,
        // color: 'rgba(255, 255, 255, .1)',
        // 使用最大值的颜色，并且其中的文字颜色为白色
        
        itemStyle: {
          color: color[maxRateIndex % color.length],
          opacity: 0.5,
        },
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        emphasis: {
          show: false,
        },
        animation: false,
        tooltip: {
          show: false,
        },
        data: [{ value: 1 }],
      },
    ]
  };
  return option;
}
