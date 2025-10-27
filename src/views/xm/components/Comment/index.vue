<template>
  <div class="commentPage">
    <Header class="commentHeader"/>
    <div class="commentContainer">
      <div class="title-header">
        <p>用户评价</p>
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
        <div class="rate-content">
          <div class="rate-item">
            <p class="rate-title">景色评分：</p>
            <el-rate
              v-model="scenicRate"
              :colors="colors"
              show-text
              :texts="texts"
            />
            <!-- <el-rate
              v-model="scenicRate"
              :icon-classes="iconClasses"
              void-icon-class="icon-rate-face-off"
              :colors="colors"
            /> -->
          </div>
          <div class="rate-item">
            <p class="rate-title">价格评分：</p>
            <el-rate
              v-model="priceRate"
              :colors="colors"
              show-text
              :texts="texts"
            />
          </div>
          <div class="rate-item">
            <p class="rate-title">设施评分：</p>
            <el-rate
              v-model="facilityRate"
              :colors="colors"
              show-text
              :texts="texts"
            />
          </div>
          <div class="rate-item">
            <p class="rate-title">服务评分：</p>
            <el-rate
              v-model="serviceRate"
              :colors="colors"
              show-text
              :texts="texts"
            />
          </div>
          <div class="rate-item">
            <p class="rate-title">推荐评分：</p>
            <el-rate
              v-model="recommendRate"
              :colors="colors"
              show-text
              :texts="texts"
            />
          </div>
        </div>
        <div class="comment-content">
          <p class="comment-title">评价及反馈：</p>
          <div class="comment-box">
            <el-input 
              v-model="comment" 
              placeholder="请输入评价及反馈"
              type="textarea" 
              :rows="5" 
              resize="none"
              maxlength="500"
              show-word-limit
            />
          </div>
        </div>
      </div>
      <div class="submit-box">
        <el-button type="primary" class="submit-btn">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header'
export default {
  components: { 
    Header 
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

      colors: [
        '#99A9BF', 
        '#F7BA2A', 
        '#FF9900',
      ],
       iconClasses: [
        'icon-rate-face-1', 
        'icon-rate-face-2', 
        'icon-rate-face-3',
      ], 
      texts: ['极其失望', '感觉失望', '觉得一般', '感觉满意', '非常满意'],
      scenicRate: 0, // 景色评分
      serviceRate: 0, // 服务评分
      priceRate: 0, // 价格评分
      facilityRate: 0, // 设施评分
      recommendRate: 0, // 推荐评分
      comment: '',
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
.commentPage {
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100vw * 1440 / 1440);
  height: calc(100vh * 900 / 900);
  box-sizing: border-box;
}

.commentHeader {
  height: 48px !important;
  z-index: 999;

  position: fixed;
  top: 0;
  left: 0;

  width: calc(100% - 48px);
  background-color: #fff;
}

.commentContainer {
  flex: 1;
  // padding: 0 20px;
  margin: 72px 20px 24px;
  // margin-top: 72px; // 48 + 24
  // margin-bottom: 24px;
  
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
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
  height: 600px;
}
.rate-content {
  color: #19272e;
  width: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}
.rate-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .rate-title {
    width: 96px;
    text-align: left;
    font-weight: bold;
  }
}
.comment-content {
  width: calc(100% - 64px);
  display: flex;
  .comment-title {
    width: 96px;
    color: #19272e;
    text-align: left;
    font-weight: bold;
  }
  .comment-box {
    flex: 1;
  }
}

.submit-box {
  display: flex;
  justify-content: center;
  .submit-btn {
    width: 120px;
  }
}
</style>