import { color } from "echarts";

export function getGaugeChartOption(data) {

  const highlight = '#00F0FF'; // 定义高亮颜色
  const result = [];

  // 将单个对象 data 包装成数组进行处理
  const dataArray = [data];

  dataArray.forEach(item => {
    result.push(
      // 外围刻度
      {
        type: 'gauge',
        center: ['50%', '50%'], // 默认中心位置
        radius: '75%',
        splitNumber: 10,
        min: 0,
        max: item.value > 500 ? Math.ceil((item.value + 100) / 50) * 50 : 500,
        startAngle: 185,
        endAngle: -5,
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            shadowBlur: 0,
            color: [
              [1, highlight]
            ]
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: highlight,
            width: 1
          },
          length: -5,
          splitNumber: 10
        },
        splitLine: {
          show: true,
          length: -14,
          lineStyle: {
            color: highlight,
          }
        },
        axisLabel: {
          distance: -20,
          textStyle: {
            color: highlight,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        pointer: {
          show: false // 隐藏外侧指针
        },
        detail: {
          show: false // 隐藏外侧数值显示
        }
      },
      // 圆环
      {
        name: '小圆环',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['7%', '8%'],
        z: 0,
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 0,
        }, {
            value: 10,

            itemStyle: {
                normal: {
                    color: "#0BD9F6"
                },
                emphasis: {
                    color: "#0BD9F6"
                }
            }
        }]
      },
      // 指针末尾圆形
      {
        name: '小圆形',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        tooltip: {
          show: false
        },
        center: [ '50%', '50%' ],
        radius: [ '3%' ],
        z: 20,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        animation: false,
        data: [ {
          value: 0,
          name: '1',
          itemStyle: {
            normal: {
              color: "red"
            }
          }
        }, {
          value: 100,
          name: '2',
          itemStyle: {
            normal: {
              color: '#17324d'
            }
          }
        } ]
      },
      // 内侧指针、数值显示
      {
        type: 'gauge',
        center: ['50%', '50%'], // 默认中心位置
        radius: '45%',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: item.value > 500 ? Math.ceil((item.value + 100) / 50) * 50 : 500,
        axisLine: {
          show: true,
          lineStyle: {
            width: 16,
            color: [
              [1, 'rgba(255, 255, 255, .1)']
            ]
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: true,
          length: '105%'
        },
        detail: {
          show: true, // 设置为false后，可以隐藏数值显示
          offsetCenter: [0, '100%'],
          textStyle: {
            fontSize: 20,
            color: '#fff'
          },
          rich: {
            name: {
              fontSize: 14,
              lineHeight: 30,
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            color: highlight,
          }
        },
        data: [{
          value: item.value,
          name: '',
          // itemStyle: {
          //     color: 'red'
          // }
          detail: {
            show: false
          }
        }]
      }
    );
  });

  return {
    series: result
  };
}
