<!-- 生成变化的日历 -->
<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1>生成变化的日历</h1>
    <el-date-picker
        v-model="monthValue"
        type="month"
        style="width: 180px; margin-bottom: 20px;"
        size="small"
        value-format="yyyy-MM"
        :picker-options="pickerOptions"
        :clearable="false"
        :editable="false"
    />
        <!-- @change="changeDate" -->
    <Calendar 
      class="calendar"
      :monthValue="monthValue"
      :source="computedSource"
    />
  </div>
</template>

<script>
import Calendar from './calendar.vue'
import dayjs from 'dayjs'
export default {
  components: { 
    Calendar,
  },
  data() {
    return {
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now()
            },
        },
        // monthValue: dayjs().format('YYYY-MM'),
        monthValue: '2025-03',
        source: {
            goodList: [],
            overList: [],
            noneList: [],
            normalList: [],
            nullList: [],
        },
        STATUS_MENU: ['good', 'normal', 'over', 'none'],
    }
  },
  computed: {
    computedSource() {
      const calendarDataList = 
      [
        {
            "time": "2025-03-01",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-02",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-03",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-04",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-05",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-06",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-07",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-08",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-09",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-10",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-11",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-12",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-13",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-14",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-15",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-16",
            "status": "normal",
            "rate": 0
        },
        {
            "time": "2025-03-17",
            "status": "normal",
            "rate": 0.5
        },
        {
            "time": "2025-03-18",
            "status": "over",
            "rate": 1.6
        },
        {
            "time": "2025-03-19",
            "status": "over",
            "rate": 1.8
        },
        {
            "time": "2025-03-20",
            "status": "over",
            "rate": 1.6
        },
        {
            "time": "2025-03-21",
            "status": "over",
            "rate": 4.6
        },
        {
            "time": "2025-03-22",
            "status": "over",
            "rate": 6.0
        },
        {
            "time": "2025-03-23",
            "status": "over",
            "rate": 5.9
        },
        {
            "time": "2025-03-24",
            "status": "over",
            "rate": 6.3
        },
        {
            "time": "2025-03-25",
            "status": "over",
            "rate": 7.0
        },
        {
            "time": "2025-03-26",
            "status": "over",
            "rate": 7.7
        },
        {
            "time": "2025-03-27",
            "status": "over",
            "rate": 10.0
        },
        {
            "time": "2025-03-28",
            "status": "over",
            "rate": 10.5
        },
        {
            "time": "2025-03-29",
            "status": "over",
            "rate": 5.9
        },
        {
            "time": "2025-03-30",
            "status": "over",
            "rate": 5.5
        },
        {
            "time": "2025-03-31",
            "status": "over",
            "rate": 4.9
        }
      ]
      this.source.goodList = calendarDataList
          .map((item) => {
              if (item.status === this.STATUS_MENU[0]) {
                  return item.time
              }
          })
          .filter((item) => {
              return item
          })
      this.source.normalList = calendarDataList
          .map((item) => {
              if (item.status === this.STATUS_MENU[1]) {
                  return item.time
              }
          })
          .filter((item) => {
              return item
          })
      this.source.overList = calendarDataList
          .map((item) => {
              if (item.status === this.STATUS_MENU[2]) {
                  return item.time
              }
          })
          .filter((item) => {
              return item
          })
      this.source.noneList = calendarDataList
          .map((item) => {
              if (item.status === this.STATUS_MENU[3]) {
                  return item.time
              }
          })
          .filter((item) => {
              return item
          })
      this.source.nullList = calendarDataList
          .map((item) => {
              if (!item.status) {
                  return item.time
              }
          })
          .filter((item) => {
              return item
          })
      return this.source
    } 
  }

}
</script>

<style lang="scss" scoped>
  .calendar {
    width: 380px;
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #001c4a;
    padding: 16px;
    flex-shrink: 2;
  }
</style>