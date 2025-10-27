<template>
  <div class="overviewPage">
    <Header class="overviewHeader"/>
    <div class="overviewContainer">
      <div class="title-header">
        <p>景区总评</p>
        <img src="../../assets/close.png" alt="" @click="goBack"/>
      </div>
      <div class="search-box">
        <el-form class="form" inline>
          <el-form-item label="所在省份">
            <el-select
                v-model="provinceId"
                :clearable="false"
                filterable
                placeholder="请选择"
                size="small"
                style="width: 100%"
                @change="handleProvinceChange"
            >
                <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                />
            </el-select>
          </el-form-item>
          <el-form-item label="所在景区">
            <el-select
                v-model="scenicId"
                clearable
                filterable
                placeholder="请选择"
                size="small"
                style="width: 100%"
            >
                <el-option
                    v-for="item in computedScenicList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">查询景区</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main-box">
        <div class="left-box">
          <div class="chart">
            <PieChart 
              class="pieChart"
            />
          </div>
          <div class="chart">
            <BarChart 
              class="barChart"
            />
          </div>
        </div>
        <div class="right-box">
          <div class="table">
            <Table 
            
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header'
import PieChart from './pieChart/index.vue'
import BarChart from './barChart/index.vue'
import Table from './table/index.vue';
export default {
  components: { 
    Header,
    PieChart,
    BarChart,
    Table
  },
  data() {
    return {
      provinceList: [
        {
          id: 'sc',
          name: '四川省',
        },
        {
          id: 'bj',
          name: '北京市',
        },
      ],
      provinceId: 'sc',
      scenicList: [
        {
          id: '001',
          province: 'sc',
          name: '武侯祠',
        },
        {
          id: '002',
          province: 'bj',
          name: '天安门',
        },
        {
          id: '003',
          province: 'sc',
          name: '九寨沟',
        },
        {
          id: '004',
          province: 'bj',
          name: '故宫',
        },
        {
          id: '005',
          province: 'sc',
          name: '熊猫基地',
        },
        {
          id: '006',
          province: 'bj',
          name: '颐和园',
        },

      ],
      scenicId: '001',
    }
  },
  computed: {
    computedScenicList() {
      return this.scenicList.filter(item => item.province === this.provinceId)
    }
  },
  methods: {
    handleProvinceChange() {
      this.scenicId = ''
      if (this.provinceId && this.computedScenicList.length) {
        this.scenicId = this.computedScenicList[0].id
      }
    },
    goBack() {
      this.$router.push('/xm')
    }
  }

}
</script>

<style lang="scss" scoped>
.overviewPage {
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw * 1440 / 1440);
  height: calc(100vh * 900 / 900);
  box-sizing: border-box;
}

.overviewHeader {
  height: 48px !important;
  z-index: 999;

  position: fixed;
  top: 0;
  left: 0;

  width: calc(100% - 48px);
  background-color: #fff;
}

.overviewContainer {
  flex: 1;
  margin: 72px 20px 24px;
  
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  background-color: #fff;
}
.title-header{
  width: calc(100% - 32px);
  height: 24px;
  line-height: 24px;
  padding: 12px 16px;
  font-size: 16px;
  color: #19272e;

  background-color: #fff;
  border-bottom: 1px solid #EBEEF0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;

  img {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
}
.search-box {
  width: calc(100% - 32px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px 16px;

}
::v-deep .el-form-item {
  margin-bottom: 0 !important;
}
.main-box {
  background-color: #fefefd;
  border: 1px solid #EBEEF0;
  border-radius: 4px;
  padding: 16px;
  margin: 0 16px 24px;
  height: 665px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.left-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 30%;
  // width: 432px;
  min-width: 600px;

}
.right-box {
  display: flex;
  flex-direction: column;
  width: 60%;
  // width: 864px;
}

.chart {
  background-color: #f5f7f9;
  height: 293px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .pieChart {
    width: 293px;
    height: 293px;
  }
  .barChart {
    width: 600px;
    height: 293px;
  }
}
.table {
  background-color: #f5f7f9;
  height: 632px;
  padding: 16px;
}
</style>