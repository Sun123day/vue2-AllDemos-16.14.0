import * as echarts from 'echarts';
// 配置文件
export const barChart = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      return params[0].name + '：<br>' + params[0].value + 'kW·h';
    }
  },
  legend: {
    // data: ['实际能耗', '预测能耗'],
    data: [
      {name : '实际能耗', icon: 'pin', itemStyle: {color: '#0BC0FE'}},
      {name : '预测能耗', icon: 'pin', itemStyle: {color: '#FEA81D'}}
    ],
    show: false,
    right: 10,
    top: 10,
    itemGap: 10,
    textStyle: {
      fontSize: 12,
      color: '#fff'
    }
  },
  graphic: [
    {
      type: 'circle',
      right: 190,
      top: 10,
      shape: {
        r: 6, // 圆点的半径
      },
      style: {
        fill: '#0BC0FE', // 圆点颜色
      }
    },
    {
      type: 'text',
      right: 120, // 文字稍微偏右
      top: 10,
      style: {
        text: '实际能耗',
        fill: '#fff', // 文字颜色
        fontSize: 16,
      }
    },
    {
      type: 'circle',
      right: 80, // 第二个圆点位置，向右偏移
      top: 10, // 与第一个圆点对齐
      shape: {
        r: 6, // 圆点的半径
      },
      style: {
        fill: '#FEA81D', // 圆点颜色
      }
    },
    {
      type: 'text',
      right: 10, // 第二个文本位置，稍微偏右
      top: 10,
      style: {
        text: '预测能耗',
        fill: '#fff', // 文字颜色
        fontSize: 16,
      }
    }
  ],  
  xAxis: {
    type: 'category',
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  yAxis: {
    type: 'value',
    // min: 0,
    max: 5000,
    splitLine: { show: false }
  },
  series: [
    {
      // name: '能耗',
      type: 'pictorialBar',
      symbolRepeat: true,
      symbol: 'rich',
      symbolMargin: 1,
      symbolSize: [20, 10],
      symbolPosition: 'start',
      barWidth: '30%',
      itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
          [
            {
              offset: 0,
              color: '#0AFBFF'
            },
            {
              offset: 1,
              color: '#0CA3FE'
            }
          ]
          )
      },
      data: [
        {
          value: 1500,
        },
        {
          value: 2000,
        },
        {
          value: 1800,
        },
        {
          value: 2200,
        },
        {
          value: 2500,
        },
        {
          value: 3000,
        },
        {
          value: 2800,
        },
        {
          value: 3500,
        },
        {
          value: 3200,
        },
        {
          value: 2600,
        },
        {
          value: 2400,
        },
        {
          value: 3800,
          itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
              [
                {
                  offset: 0,
                  color: '#FE800C'
                },
                {
                  offset: 1,
                  color: '#FFF740'
                }
              ]
              )
          },
        }
      ]
    },
    {
      // 背景阴影
      type: 'bar',
      itemStyle: {
          color: 'rgba(7, 50, 108, 0.30)'
      },
      data: [
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
        {
          value: 5000,
        }, 
      ]
    }
  ]
};

export const meterOption = {
  series: [
  {
    type: 'gauge',
    // startAngle: -115,
    // endAngle: 295,
    startAngle: -135,
    endAngle: 315,
    splitNumber: 8,
    radius: '65%',
    axisLine: {
      lineStyle: {
        color: [[1, '#11A9C1']],
        width: 0.5
      }
    },
    splitLine: {
      distance: -6,
      length: 6,
      lineStyle: {
        color: '#11A9C1',
        width: 0.5
      }
    },
    axisTick: {
      distance: -5,
      length: 3,
      lineStyle: {
        color: '#11A9C1'
      }
    },
    axisLabel: {
      show: false,

    },
  },

  {
    type: 'gauge',
    // startAngle: -115,
    startAngle: -135,
    endAngle: 115,
    splitNumber: 6,
    radius: '90%',
    center: ['50%', '50%'],
    axisLine: {
      show: true,
      lineStyle: {
        width: 0,
        color: [
          [1, '#11A9C1']
        ]
      }
    },

    axisTick: {
      distance: 0,
      length: 5,
      lineStyle: {

        color: '#11A9C1',
        width: 1,

      }
    },
    axisLabel: {
      show: false,

    },
    splitLine: {
      show: false,

    },
  },

  {
    type: 'gauge',

    startAngle: 70,
    // endAngle: 295,
    endAngle: 315,
    splitNumber: 6,
    radius: '90%',
    center: ['50%', '50%'],
    axisLine: {
      show: true,
      lineStyle: {
        width: 0,
        color: [
          [1, '#11A9C1']
        ]
      }
    },

    axisTick: {
      distance: 0,
      length: 3,
      lineStyle: {

        color: '#11A9C1',
        width: 1,

      }
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,

    },
  },
  // 内部阴影
  {
    name: "内部阴影",
    type: "gauge",
    radius: '44%',
    splitNumber: 10,
    axisLine: {
        lineStyle: {
            color: [
                [1666.06 / 2000, new echarts.graphic.LinearGradient(0, 1, 0, 0, 
                  [
                    {
                        offset: 0,
                        color: 'rgba(13, 136, 163,0)',
                    }, {
                        offset: 0.5,
                        color: 'rgba(13, 136, 163,0.2)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(13, 136, 163,1)',
                    }
                  ]
                )],
                [
                    1, 'rgba(28,128,245,0)'
                ]
            ],
            width: 100

        },
    },
    axisLabel: {
        show: false,
    },
    axisTick: {
        show: false,

    },
    splitLine: {
        show: false,
    },
    itemStyle: {
        show: false,
    },

  },
  // 主要的仪表盘，带有渐变进度
  {
    type: 'gauge',
    center: ['50%', '50%'],
    radius: '55%',
    // startAngle: -115,
    // endAngle: 295,
    startAngle: -135,
    endAngle: 315,
    min: 0,
    max: 2000,
    splitNumber: 0,

    axisLine: {
      lineStyle: {
        width: 5,
        color: [

          [1, '#58D9F9']
        ]
      }
    },

    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      distance: 8,
      length: 0,
      lineStyle: {
        color: '#19EBFF'
      }
    },
    pointer: {
      show: true,
      length: '90%',
      width: 2,
      offsetCenter: [0, '-10%'],
      itemStyle: {
        color: '#3791A3'
      }
    },
    title: {
      show: false
    },
    detail: {
      // show: false,
      // offsetCenter: [0, '40%'],
      // offsetCenter: [0, '100%'],
      offsetCenter: [0, '70px'],
      fontSize: 12,
      fontWeight: 'bolder',
      color: 'white',
      formatter: '{value}  Km/h'
    },
    data: [
      {
        value: 1666.06
      }
    ]
  }
  ]
};

export const codeTable = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '71%'],
      radius: '10%',
      startAngle: 0,
      endAngle: 360,
      axisLine: {
        lineStyle: {
          width: 4,
          color: [
            [1, '#636F87']
          ]
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false,
      },
      pointer: {
        show: false,
      },
      title: {
        show: false
      },
      detail: {
        show: false,
      },
    },
    {
      type: 'gauge',
      center: ['50%', '70%'],
      radius: '40%',
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          width: 2,
          color: [
            [1, '#01455e']
          ]
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false,
      },
      pointer: {
        show: false,
      },
      title: {
        show: false
      },
      detail: {
        show: false,
      },
    },
    {
    center: ['50%', '70%'],
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    splitNumber: 9,
    radius: '95%',
    axisLine: {
      show:false,
      lineStyle: {
        color: [[1, '#2D4DEA']],
        width: 0
      }
    },
    splitLine: {
      distance: -6,
      length: 6,
      lineStyle: {
        color: '#11A9C1',
        width: 28
      }
    },
    axisTick: {
      distance: -5,
      length: 0,
      lineStyle: {
        color: '#11A9C1'
      }
    },
    axisLabel: {
      show: false,

    },
  },
  {
    type: 'gauge',
    center: ['50%', '70%'],
    startAngle: 180,
    endAngle: 0,
    splitNumber: 8,
    radius: '80%',
    axisLine: {
      lineStyle: {
        color: [[1, '#11A9C1']],
        width: 2
      }
    },
    splitLine: {
      distance: -6,
      length: 6,
      lineStyle: {
        color: '#11A9C1',
        width: 0.5
      }
    },
    axisTick: {
      distance: -5,
      length: 3,
      lineStyle: {
        color: '#11A9C1'
      }
    },
    axisLabel: {
      show: false,

    },
  },
  {
    type: 'gauge',
    center: ['50%', '70%'],
    radius: '90%',
    startAngle: 180,
    endAngle: 0,
    min: 0,
    max: 10000,
    splitNumber: 12,
    offsetCenter:{},
    itemStyle: {
      color: [
        [
          1, new echarts.graphic.LinearGradient(
          0, 1, 0, 0, [{
          offset: 0,
          color: '#ae3df6'
        },
          {
            offset: 1,
            color: '#53bef9'
          }
        ]
          )
        ],        
      ],
      // color: '#58D9F9',
      // shadowColor: 'rgba(0,138,255,0.45)',
      // shadowBlur: 10,
      // shadowOffsetX: 2,
      // shadowOffsetY: 2
    },
    progress: {
      show: true,
      roundCap: true,
      width: 6,
    },
    pointer: {
      icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
      length: '100%',
      width: 5,
      offsetCenter: [0, '5%']
    },
    axisLine: {
      // show:false,
      roundCap: true,
      lineStyle: {
        width: 6,
        dashArray: [5, 5],
        color: [
          [1, '#fff'],         
        ]
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      distance: -70,
      color: '#00F0FF',
      fontSize: 12,
      formatter: function (value) {
        return  value.toFixed(0);
      },
    },
    title: {
      show: false
    },
    detail: {
      color:'#00F0FF',
      formatter: function (value) {
        return '{value|' + value.toFixed(0) + '}KW';
      },
      rich: {
        value: {
          fontSize: 40,
          fontWeight: 'bolder',
          color: '#00F0FF'
        },
        unit: {
          fontSize: 20,
          color: '#00F0FF',
          padding: [0, 0, -20, 10]
        }
      }
    },
    data: [
      {
        value: 7000
      }
    ]
  }
  ]
};



export const map = {

  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c} (p / km2)'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  visualMap: {
    min: 800,
    max: 50000,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    }
  },
  series: [
    {
      type: 'map',
      mapType: 'HK', // 自定义扩展图表类型
      label: {
        show: true
      },
      data: [
        { name: '中西区', value: 20057.34 },
        { name: '湾仔', value: 15477.48 },
        { name: '东区', value: 31686.1 },
        { name: '南区', value: 6992.6 },
        { name: '油尖旺', value: 44045.49 },
        { name: '深水埗', value: 40689.64 },
        { name: '九龙城', value: 37659.78 },
        { name: '黄大仙', value: 45180.97 },
        { name: '观塘', value: 55204.26 },
        { name: '葵青', value: 21900.9 },
        { name: '荃湾', value: 4918.26 },
        { name: '屯门', value: 5881.84 },
        { name: '元朗', value: 4178.01 },
        { name: '北区', value: 2227.92 },
        { name: '大埔', value: 2180.98 },
        { name: '沙田', value: 9172.94 },
        { name: '西贡', value: 3368 },
        { name: '离岛', value: 806.98 }
      ],
      // 自定义名称映射
      nameMap: {
        'Central and Western': '中西区',
        'Eastern': '东区',
        'Islands': '离岛',
        'Kowloon City': '九龙城',
        'Kwai Tsing': '葵青',
        'Kwun Tong': '观塘',
        'North': '北区',
        'Sai Kung': '西贡',
        'Sha Tin': '沙田',
        'Sham Shui Po': '深水埗',
        'Southern': '南区',
        'Tai Po': '大埔',
        'Tsuen Wan': '荃湾',
        'Tuen Mun': '屯门',
        'Wan Chai': '湾仔',
        'Wong Tai Sin': '黄大仙',
        'Yau Tsim Mong': '油尖旺',
        'Yuen Long': '元朗'
      }
    }
  ]
}

