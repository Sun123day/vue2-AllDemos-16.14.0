export function getPieChartOption(data) {
  const color = [
    '#20A8FF',
    '#FCD141',
    '#29C287',
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)', // 显示名称、值和百分比
    },
    title: [    
      {
          text: '预警',
          subtext: '类型',
          textStyle:{
              fontSize: 18,
              color:"#FFF"
          },
          subtextStyle: {
              fontSize: 18,
              color:"#FFF",
              fontWeight: 'bold'
          },
          textAlign:"center",
          x: '47%',
          y: '36%',
          zlevel: 10,
      }
      
    ],
    series: [
      {
        type: 'pie',
        radius: ['50%', '100%'],
        center: ['50%', '50%'],
        data: data.map((item, index) => ({
          name: item.name,
          value: item.carbon, // 使用 carbon 作为饼图的值
          rate: item.rate, // 保持原有的 rate
          itemStyle: {
            color: color[index % color.length]
          }
        })),
        emphasis: {
          scale: false,
          // label: {
          //   show: true,
          //   fontSize: 18,
          //   fontWeight: 'bold',
          //   formatter: '{b}', // 默认显示名称
          //   fontSize: 18, // 设置悬浮时显示名称的字体大小为36px
          //   fontWeight: 'bold',
          //   color: '#fff', // 设置悬浮时字体颜色
          // }
        },
        label: {
          show: false,
          // position: 'center',
        },
      },
    ]
  };

  return option;
}
