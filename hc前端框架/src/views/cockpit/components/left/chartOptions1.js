import * as echarts from 'echarts';

export function getChartOption(num) {
  const gaugeMax = 2000
  const option = {
    series: [
        // 不是数据
        {
          type: 'gauge',
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
    
        // 不是数据
        {
          type: 'gauge',
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
    
        // 不是数据
        {
          type: 'gauge',
        
          startAngle: 70,
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
                      [num / gaugeMax, new echarts.graphic.LinearGradient(0, 1, 0, 0, 
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
          startAngle: -135,
          endAngle: 315,
          min: 0,
          max: gaugeMax,
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
            offsetCenter: [0, '70px'],
            fontSize: 12,
            fontWeight: 'bolder',
            color: 'white',
            formatter: '{value}  Km/h'
          },
          data: [
            {
              value: num
            }
          ]
        }
        ]
  }
  
  return option;
}
