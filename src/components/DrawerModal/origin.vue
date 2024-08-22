<template>
  <div>
      <div class="core-modal-mask"></div>
      <transition
          @after-leave="afterLeave"
          @after-enter="afterEnter"
          name="modal-appear-scale"
          @before-enter="beforeEnter"
      >
          <div
              class="core-modal-wrap"
              v-if="isShow"
              :style="{ ...modalAnimationScaleStyleTransformOrigin }"
          >
              <div
                  v-draggable="options"
                  class="core-modal"
                  :style="{ width: width + 'px' }"
                  :class="[
                      widthCtrlEnum[widthCtrl] ? `core-modal-${widthCtrlEnum[widthCtrl]}` : '',
                  ]"
              >
                  <div class="core-modal-header">
                      <h2>{{ title }}</h2>
                      <a class="close-icon ivu-modal-close" @click="close">
                          <i class="ivu-icon el-icon-close"></i>
                      </a>
                  </div>
                  <div class="modal-body-swaper">
                      <div class="core-modal-body" ref="scs-modal-body">
                          <div class="content-body">
                              <slot></slot>
                          </div>
                      </div>
                  </div>

                  <div class="core-modal-footer">
                      <el-button
                          class="core-modal-footer-btn"
                          :ref="item.ref"
                          @click="handleClick(item)"
                          v-for="(item, index) in actions"
                          :key="index"
                          :type="item.theme"
                          :icon="item.icon"
                          :loading="item.loading"
                          >{{ item.text }}</el-button
                      >
                  </div>
              </div>
          </div>
      </transition>
  </div>
</template>
<script>
  import drag from '@/directive/drag'

  let clickPosition
  document.addEventListener(
      'click',
      function (e) {
          if (!e.target.dataset['modelAnimation']) {
              var path = e.path || (e.composedPath && e.composedPath())
              let target = path.find(
                  (i) =>
                      (i && i.dataset && i.dataset['modelAnimation']) ||
                      ['BUTTON'].indexOf(i.nodeName) > -1
              )
              if (!target) return
          }
          clickPosition = {
              x: e.clientX,
              y: e.clientY,
          }
      },
      true
  )

  export default {
      name: 'page-modal',
      data() {
          return {
              options: {
                  trigger: '.core-modal-header',
                  body: '.core-modal-wrap',
                  recover: true,
              },
              overflowHidden: false,
              bodyHeight: null,
              allowMaxHeight: true,
              isShow: false,
              actions: [],
              title: '',
              width: '50%',
              defaultSetWidth: '50%',
              throttleTimer: null,
              timer: null,
              widthCtrlEnum: {
                  small: 'small',
                  big: 'big',
              },
              modalAnimationScaleStyleTransformOrigin: {
                  transformOrigin: '',
              },
          }
      },
      props: {
          widthCtrl: {
              type: String,
          },
      },
      mounted() {
          this.isShow = true
      },
      methods: {
          beforeEnter() {
          },
          // 计算高度节流
          calcHeightThrottle() {
              if (this.throttleTimer) {
                  return
              } else {
                  this.throttleTimer = setTimeout(() => {
                      this.calcHeight()
                      clearTimeout(this.throttleTimer)
                      this.throttleTimer = null
                  }, 300)
              }
          },
          calcHeight() {
              let wrapHeight = this.$el.children[1].clientHeight
              let contentHeight =
                  this.$el.children[1].children[0].children[1].children[0].clientHeight
              let bodyMaxHeight = wrapHeight - 268
              if (contentHeight < bodyMaxHeight) {
                  this.bodyHeight = contentHeight + 24
              } else {
                  this.bodyHeight = bodyMaxHeight
              }
              this.autoWidth()
          },
          close() {
              this.isShow = false
              clearTimeout(this.throttleTimer)
              clearInterval(this.timer)
              setTimeout(() => {
                  window.removeEventListener('resize', this.calcHeightThrottle)
                  document.body.removeChild(this.$el)
              }, 1000)
          },
          setTitle(title) {
              this.title = title
          },
          setPageActions(actions) {
              this.actions = actions
          },
          setWidth(width) {
              this.width = width
              this.defaultSetWidth = width
          },
          setAllowMaxHeight(state) {
              this.allowMaxHeight = state
          },
          handleClick(item) {
              item.handle()
          },
          afterLeave() {
              this.$destroy()
          },
          afterEnter() {
              this.isShow = true
          },
          autoWidth() {
              if (this.defaultSetWidth > document.body.clientWidth - 20) {
                  this.width = document.body.clientWidth - 20
              } else {
                  this.width = this.defaultSetWidth
              }
          },
      },
      watch: {
          width(val, oldVal) {
              this.autoWidth()
          },
      },
      directives: {
          draggable: drag.draggable,
      },
  }
</script>
<style lang="scss">
  .core-modal-mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 1011;
      background-color: rgba(33, 33, 33, 0.6);
  }

  .core-modal-wrap {
      position: fixed;
      overflow: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1011;
      height: 100%;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      outline: 0;
      border-radius: 3px;
      .core-modal {
          
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          max-width: 1400px;
          min-width: 450px;
          width: 800px;
          border-radius: 3px;
          margin: 0 auto;
          color: #000 !important;
          background-color: #fff;
          transition: transform 0.8s cubic-bezier(0.36, 0.66, 0.04, 1);

          display: flex;
          flex-flow: column nowrap;
          min-height: 70vh;
          max-height: 85vh;
          overflow: hidden;
          &-small {
              width: 600px;
          }
          &-big {
              width: 1000px;
          }
          .close-icon.ivu-modal-close {
              font-size: 16px;
              position: static;
              cursor: pointer;
              padding: 10px 0px 10px 10px;
          }
          & > div {
              background-color: #fff;
          }

          .core-modal-header {
              height: 48px;
              line-height: 1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              flex: 0 0 48px;
              background-color: #fff;
              color: #000;
              padding: 0 24px;
              &::after {
                  content: '';
                  position: absolute;
                  left: -24px;
                  right: -24px;
                  bottom: 0;
                  height: 1px;
                  background: #000;
              }
              h2 {
                  font-size: 14px;
              }
          }

          .core-modal-footer {
              padding: 24px 24px 16px 24px;
              text-align: right;
              flex-grow: 0;
              flex-shrink: 0;

              .core-modal-footer-btn {
                  margin-left: 8px;
              }
          }
          .modal-body-swaper {
              flex-grow: 1;
              overflow: hidden;
              display: flex;
          }
          .core-modal-body {
              color: #000;
              transition: 0.3s;
              padding-top: 20px;
              flex: 1 1 auto;
              width: 100%;
              overflow-y: auto;
              overflow-x: hidden;
              display: flex;
              //弹框的下面的那条线
              border-bottom: 1px solid #000;
              .content-body {
                  padding: 0 24px;
                  position: relative;
                  flex: 1 1 auto;
              }
          }
      }
  }

  .ivu-btn-default,
  .ivu-btn-primary {
      margin-right: 8px;
      height: 32px;
  }

  .ivu-btn-primary {
      color: #fff;
      background-color: #4573f5;
      border-color: #4573f5;
  }

  ::v-deep .pa-select .el-input__inner {
      height: 32px;
      line-height: 32px;
      border-radius: 2px;
      padding: 0 12px;
  }
  .modal-appear-scale {
      &-enter {
          transform: scale(0);
          opacity: 0.5;
          &-to {
              transform: scale(1);
              opacity: 1;
          }
          &-active {
              transition:
                  transform 0.65s cubic-bezier(0.17, 0.885, 0.32, 1.05),
                  opacity 0.4s cubic-bezier(0.67, 0.985, 0.42, 1);
          }
      }
      &-leave {
          transform: scale(1);
          opacity: 1;
          &-to {
              transform: scale(0);
              opacity: 0;
          }
          &-active {
              transition:
                  transform 0.65s cubic-bezier(0.17, 0.885, 0.32, 1.05),
                  opacity 0.4s cubic-bezier(0.67, 0.985, 0.42, 1);
          }
      }
  }
</style>
