<template>
  <div>
    <el-button type="primary" @click="openVideoDialog">播放视频</el-button>
    <el-dialog
      title="视频播放"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="closeVideoDialog"
    >
      <video ref="videoPlayer" controls autoplay style="width: 100%;"></video>
      <div>
        <el-button @click="takeScreenshot">截屏</el-button>
        <el-button @click="toggleMute">静音</el-button>
        <el-slider v-model="volume" :min="0" :max="100" @change="adjustVolume"></el-slider>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      volume: 100,
      isMuted: false
    };
  },
  methods: {
    openVideoDialog() {
      this.dialogVisible = true;
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.src = 'your_video_url_here';
    },
    closeVideoDialog() {
      this.dialogVisible = false;
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.pause();
      videoPlayer.src = '';
    },
    takeScreenshot() {
      // 截屏逻辑
      // 可以使用第三方库或 HTML5 Canvas 来实现
    },
    toggleMute() {
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.muted = !videoPlayer.muted;
      this.isMuted = videoPlayer.muted;
    },
    adjustVolume() {
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.volume = this.volume / 100;
      this.isMuted = videoPlayer.volume === 0;
    }
  }
};
</script>
