<template>
    <div class="header-box">
        <div class="item-box left-box">
            <!-- <img :src="logoPath" alt="" style="height: 38px" /> -->
            <!-- <div class="title-text">{{ title }}</div> -->
            <!-- <img src="~@/assets/image/login/logo-login.png" alt="" class="logo"> -->
            <div class="log"><img src="./logo.png" alt=""> <span style="color: #ffffff54;"> | </span>{{ computedLogoTxt }}</div>
        </div>
        <div class="item-box right-box">
            <el-tooltip effect="light" :content="computedQA" placement="bottom">
                <img 
                    src="../../../assets/image/operation/aiQA.png" 
                    class="aiQA"
                    @click="goAIQA"
                />
            </el-tooltip>
            <el-tooltip effect="light" :content="computedLanguageChange" placement="bottom">
                <img 
                    src="../../../assets/image/language.svg" 
                    class="language"
                    @click="changeLanguage"
                />
            </el-tooltip>
            <el-popover
                popper-class="custom"
                width="400"
                trigger="hover"
                placement="right-end"
                v-if="alarmCount > 0"
            >
                <div class="alarm-content">
                    <div class="alarmItem-content">
                      <div 
                          class="alarmItem" 
                          v-for="(item, index) in alarmList"
                          :key="index"
                          style="margin-bottom: 8px;"
                      >
                          <div class="alarmInfo">
                              <!-- 【告警历史】 -->
                              {{ computedAlarmText1 }}
                              {{ item.statusName }}！
                              {{ item.projectName }}的
                              <!-- {{ item.message }}发生了 -->
                              {{ item.message }}
                              {{ computedAlarmText2 }}
                              {{ item.remark }}！
                              （{{ item.alarmTime }}）
                          </div>
                          <div 
                              style="
                                  display: flex; 
                                  align-items: center; 
                                  justify-content: center;
                                  margin-top: 8px;
                              "
                          >
                          <el-button size="mini" round type="primary" icon="el-icon-warning-outline"
                              v-if="!item.isKnow"
                              @click="handleAlarmKnow(item.id)"
                          >{{ computedKnowInfo }}</el-button>
                          <!-- <el-button size="mini" round type="success" icon="el-icon-check"
                              v-if="item.isKnow"
                          >已知晓</el-button> -->
                          <el-button size="mini" round type="info" icon="el-icon-right"
                              @click="handleAlarmCheck(item)"
                          >去查看</el-button>
                          </div>
                      </div>
                    </div>
                    <div class="knowAll">
                        <el-button size="small" round type="primary" icon="el-icon-warning-outline"
                            style="width: 100%;"
                            @click="handleAlarmKnowAll"
                        >{{ computedKnowAll }}</el-button>
                    </div>
                </div>
                <span 
                    style="margin-right: 26px" 
                    @click="handleAlarm"
                    slot="reference"
                >
                    <el-badge 
                        :value="alarmCount" 
                        :max="999" 
                        class="item"
                    >
                        <i
                            class="iconfont icon-xiaoxi"
                            style="font-size: 24px; color: #fff"
                        />
                    </el-badge>
                </span>
            </el-popover>
            <el-tooltip effect="light" :content="computedNoInfo" placement="bottom" v-else>
                <span 
                    style="margin-right: 26px"
                >
                    <i  
                        class="iconfont icon-xiaoxi"
                        style="font-size: 24px; color: #fff"
                    />
                </span>
            </el-tooltip>

            <img src="../../../assets/image/touxiang.png" class="user-avatar" />
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userName }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="onReset">
                        <span style="display: block">{{ computedAccountSetting }}</span>
                    </el-dropdown-item>

                    <el-dropdown-item @click.native="onLogout">
                        <span style="display: block">{{ computedLogout }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { findDefaultProject } from '@/api/projectInfoMessage.js'
    import Cookies from 'js-cookie'
    import settings from '@/settings'
    import { getAlarmHistoryBell, getAlarmHistoryKnow, getAlarmHistoryKnowAll } from '@/api/alarmHistory'
import dayjs from 'dayjs'
import store from '@/store'
    export default {
        name: 'PaHeader',
        data() {
            return {
                alarmCount: 0,
                alarmList: [],
                cityList: [],
                userData: '',
                interval: 60000,
                heartbeat: null,
                // title: settings.title,
                title: "华创建投智慧节能管理云平台",
                languageFlag: true,
            }
        },
        computed: {
            ...mapGetters(['projectId']),
            logoPath() {
                return this.$store.state.logoPath
            },
            userName: {
                get() {
                    const { nickName = '' } = this.$store.state.userInfo || {}
                    return nickName
                },
            },
            currentCityCode: {
                get() {
                    return this.$store.state.currentCityCode
                },
                set(val) {},
            },
            computedLogoTxt() {
                return this.$store.state.language == 'zh'? '智慧节能管理云平台' : '智慧节能管理雲平台';
            },
            computedQA() {
                return this.$store.state.language == 'zh'? '智能问答' : '智慧問答'; 
            },
            computedLanguageChange() {
                return this.$store.state.language == 'zh'? '语言切换' : '語言切換';
            },
            computedKnowInfo() {
                return this.$store.state.language == 'zh'? '知晓信息' : '知曉信息'; 
            },
            computedKnowAll() {
                return this.$store.state.language == 'zh'? '全部知晓' : '全部知曉'; 
            },
            computedNoInfo() {
                return this.$store.state.language == 'zh'? '暂无信息' : '暫無信息';
            },
            computedAccountSetting() {
                return this.$store.state.language == 'zh'? '账户设置' : '賬戶設置';
            },
            computedLogout() {
                return this.$store.state.language == 'zh'? '退出登录' : '退出登錄'; 
            },
            computedAlarmText1() {
                return this.$store.state.language == 'zh'? '【告警历史】' : '【告警歷史】'; 
            },
            computedAlarmText2() {
                return this.$store.state.language == 'zh'? '发生了' : '發生了'; 
            }
        },
        created() {
            this.handleAlarm()  
            this.changeLanguage()
        },
        mounted() {
            this.intervalId = setInterval(() => {
                // this.getAlarmCount()
                this.handleAlarm()
            }, 5* 60000); // 5分钟自动调用一次
        },
        destroyed() {
            clearInterval(this.heartbeat)
            // 清理定时器
            if (this.intervalId) {
              clearInterval(this.intervalId);
            }
        },
        methods: {
            goAIQA(){
                this.$router.push('/device/aiDialog')
            },
            getAlarmCount() {
                getAlarmHistoryBell().then(
                    ({ code, data }) => {
                        if (code === 200) {
                            // this.alarmCount = data.untreated || 0
                        
                            this.alarmList = data || []
                            this.alarmCount = this.alarmList.length || 0
                        }
                    }
                )
            },
            handleAlarmKnow(id) {
                getAlarmHistoryKnow(id).then(
                    ({ code, data }) => {
                        if (code === 200) {
                            this.$message.success("已知晓信息");
                            this.getAlarmCount()
                        }
                    }
                )
            },
            handleAlarmKnowAll() {
                const ids = this.alarmList.map(item => item.id)
                console.log("ids", ids)
                getAlarmHistoryKnowAll(ids).then(
                    ({ code, data }) => {
                        if (code === 200) {
                            this.$message.success("已知晓所有信息");
                            this.getAlarmCount()
                        }
                    }
                )
            },
            handleAlarmCheck(item) {
                console.log(item)
                this.$router.push({
                  path: '/systemLog/alarmHistory',
                  query: {
                    id: item.id,
                    startDate: dayjs(item.alarmTime).format('YYYY-MM-DD'),
                    endDate: dayjs(item.alarmTime).format('YYYY-MM-DD'),
                  },
                });
            },
            changeCity(newCity) {
                this.$store.dispatch('setCurrentCityCodeState', newCity)
            },
            async heartbeatFn() {
                const result = await this.$requestPost(
                    `/cloud-im/user/online?imUserId=${this.userData.imUserId}`,
                    {}
                )
            },
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            // 退出登录
            onLogout() {
                // this.$confirm('确认退出当前账号吗？', '安全退出', {
                this.$confirm(
                    this.$store.state.language == 'zh' ? '确认退出当前账号吗？' : '確認退出當前賬號嗎？',
                    '安全退出',
                {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        this.logout()
                        clearInterval(this.heartbeat)
                    })
                    .catch(() => {
                        // this.logout()
                        clearInterval(this.heartbeat)
                    })
            },
            async logout() {
                this.$store.dispatch('userLoginOut').then(() => {
                    this.$message({
                        message: '退出成功',
                        type: 'success',
                    })
                    setTimeout(() => {
                        this.$router.push(`/login`)
                    }, 1000)
                })
            },
            // 账户设置
            onReset() {
                this.$router.push('/mine/reset')
            },
            handleAlarm() {
                // this.$router.push('/systemLog/alarmHistory')
                this.getAlarmCount()
                this.setRealLists()
            },
            setRealLists() {
                store.dispatch('realTimeList', {})
            },
            changeLanguage(){
                if(this.languageFlag){
                    this.$store.state.language = "zhTW"
                    this.$i18n.locale = this.$store.state.language
                    this.languageFlag = false
                }else{
                    this.$store.state.language = "zh"
                    this.$i18n.locale = this.$store.state.language
                    this.languageFlag = true
                }
                // if(currentLanguage == "zh-CN" || currentLanguage.startsWith("zh")){
                // if(currentLanguage == "zh-CN"){
                //     // this.$i18n.locale = "zh"
                //     this.$i18n.locale = "zhTW"
                //     // Cookies.set('language', 'zh')
                // }else{
                //     // this.$i18n.locale = "zhTW"
                //     this.$i18n.locale = "zh"
                //     // Cookies.set('language', 'zhTW')
                // }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .alarm-content {
    //   padding: 4px !important;
      max-height: 300px !important;
      .alarmItem-content {
        padding: 0 16px !important;
        max-height: 250px !important;
        overflow-y: auto !important;
      }
      .knowAll {
        width: 100%;
        margin-top: 16px;
      }
    }
    .log {
        width: 500px;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 48px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        img{
            vertical-align: middle;
            height: 48px;
        }
    }
    .logo {
        width: 190px;
        height: 32px;
    }
    .pa-logo {
        color: #fff !important;
    }
    .header-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: $header-height;
        position: fixed;
        top: 0;
        left: 0;
        // z-index: 2000;
        z-index: 10;
        background: $header-bg-color;
        .line {
            width: 1px;
            height: 26px;
            background: #ffffff;
            opacity: 0.2;
            margin: 0 15px;
        }
        .right-box {
            margin-right: 16px;
        }
        .left-box {
            margin-left: 16px;
        }
    }

    .item-box {
        display: flex;
        align-items: center;
    }

    .header-title {
        // width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            height: 100%;
        }
    }
    .title-text {
        font-weight: 600;
        color: #ffffff;
        font-size: 16px;
        margin-left: 15px;
    }
    .aiQA {
        height: 26px;
        margin-right: 26px;
        cursor: pointer;
    }
    .language {
        width: 24px;
        height: 24px;
        margin-right: 26px;
        cursor: pointer;
    }
    .user-avatar {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }

    .el-dropdown {
        font-size: 14px;
        color: #fff;
    }

    .el-icon--right {
        margin-left: 8px;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .icon-off-line-icon,
    .icon-on-line-icon {
        color: #fff;
    }

    .icon-xiaoxi {
        cursor: pointer;
    }

    .cityBox {
        ::v-deep .el-input__inner {
            background: transparent;
            color: #fff !important;
        }
    }
</style>
