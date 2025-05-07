<template>
    <div class="calendar">
        <div class="legend">
            <div>
                <div class="circle" style="background: #33e3ff; margin-right: 5px"></div>
                <div>优秀</div>
            </div>
            <div>
                <div class="circle" style="background: #2b8eff; margin-right: 5px"></div>
                <div>正常</div>
            </div>

            <div>
                <div class="circle" style="background: #ff2828; margin-right: 5px"></div>
                <div>超标</div>
            </div>

            <div>
                <div class="circle" style="background: #7f7f7f; margin-right: 5px"></div>
                <div>无数据</div>
            </div>
        </div>
        <el-calendar v-model="monthValue">
            <template slot="dateCell" slot-scope="{ date, data }">
                <p v-if="source.goodList.includes(data.day)" class="good status">
                    {{ data.day.split('-').slice(2).join('-') }}</p
                >
                <p v-if="source.normalList.includes(data.day)" class="normal status">
                    {{ data.day.split('-').slice(2).join('-') }}
                </p>
                <p v-if="source.overList.includes(data.day)" class="over status">
                    {{ data.day.split('-').slice(2).join('-') }}</p
                >
                <p v-if="source.noneList.includes(data.day)" class="none status">
                    {{ data.day.split('-').slice(2).join('-') }}</p
                >
                <p v-if="source.nullList.includes(data.day)" class="empty status">
                    {{ data.day.split('-').slice(2).join('-') }}
                </p>
            </template>
        </el-calendar>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            source: Object,
            monthValue: String,
        },
        data() {
            return {}
        },
        created() {
            console.log("this.source", this.source)
            console.log("this.monthValue", this.monthValue)
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-table tr {
    border: none !important;
}
::v-deep .el-calendar-table td {
    border: none !important;
}
.calendar {
    height: 100%;
    .legend {
        display: flex;
        width: 100%;
        justify-content: space-around;
        color: #fff;
        font-size: 14px;
        & > div {
            display: flex;
            align-items: center;
        }
        .circle {
            width: 12px;
            height: 12px;
            border-radius: 6px;
        }
    }
    ::v-deep {
        thead {
            display: none;
        }
        .el-calendar__header {
            display: none;
        }
        .el-calendar {
            width: 100%;
            background: rgba(235, 238, 245, 0);
            pointer-events: none;
            height: 100%;
            // margin-top: 20px;
        }
        .el-calendar__body {
            padding: 20px 0 0 0;
        }
        .el-calendar-table__row {
            background: rgba(235, 238, 245, 0);
            height: 55px;
            display: flex;
            justify-content: space-between;
        }
        .el-calendar-day {
            height: calc(100vw * 44 / 1920);
            width: calc(100vw * 44 / 1920);
            min-width: 28px;
            min-height: 28px;
            position: relative;
            &:hover {
                background: none;
            }
            .status {
                height: calc(100vw * 44 / 1920);
                width: calc(100vw * 44 / 1920);
                min-width: 32px;
                min-height: 32px;
                position: absolute;
                border-radius: 4px;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .good {
                background: rgba(51, 227, 255, 0.24);
                color: #33e3ff;
                &:hover {
                    background: rgba(51, 227, 255, 0.5);
                }
            }
            .normal {
                background: rgba(43, 142, 255, 0.2);
                color: #2b8eff;
                &:hover {
                    background: rgba(43, 142, 255, 0.5);
                }
            }
            .over {
                background: rgba(255, 40, 40, 0.24);
                color: #ff2828;
                &:hover {
                    background: rgba(255, 40, 40, 0.5);
                }
            }
            .none {
                background: rgba(127, 127, 127, 0.2);
                color: #7f7f7f;
                &:hover {
                    background: rgba(127, 127, 127, 0.5);
                }
            }
            .empty {
                background: rgba(43, 142, 255, 0.1);
                color: #3a4d6e;
            }
        }
        .is-selected {
            background: rgba(43, 142, 255, 0) !important;
        }
    }
}
</style>
