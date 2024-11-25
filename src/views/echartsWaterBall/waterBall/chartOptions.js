import 'echarts-liquidfill'

export function getPieChartOption(data) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: `${data[0].name}: ${data[0].value} (${data[0].ratePercent}%)`, // 显示名称、值和百分比
    },
    title: {
      // left: 'center',
      // top: 'center',
      text: data[0].ratePercent + '%',
      textStyle:{
        fontSize: 28,
        color:"#FFF"
      },
      subtext: data[0].name,
      subtextStyle: {
        fontSize: 24,
        color: '#fff',
      },
      textAlign:"center",
      x: '47%',
      y: '36%',
    },
    series: [
      {
        type: 'liquidFill',
        radius: '96%',
        center: ['50%', '50%'],
        waveAnimation: 10, // 动画时长
        amplitude: 20, // 波浪线的振幅
        data: [data[0].rate, data[0].rate],
        color: '#42b9fc',//设置波形颜色
        emphasis: {
          scale: false,
          label: {
            show: false,
          }
        },
        label: {
          show: false,
        },
        outline: { //外边框
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: '#87cbfa',
            borderWidth: 2
          }
        },
        backgroundStyle: { //水球背景色
          color: '#2dd594' //只通过了这处修改颜色
        }
      },
    ]
  };

  return option;
}
