<template>
  <div class="ads">
    <div class="ads__overlay">
      <div class="ads__overlay__progress"></div>
      <img src="/svg/close.svg" class="ads__overlay__button-close" @click="close" />
    </div>
    <div class="ads__content" :style="{width: `${windowSizes.winW}px`, height: `${windowSizes.winH}px`}">
      <video
        class="ads__content__video"
        v-if="isVideoType(ads[`type${orientation}`])"
        autoplay
        playsinline
        preload="auto"
        muted
        :style="{width: `${windowSizes.winW}px`, height: `${windowSizes.winH}px`}"
      >
        <source :src="contentSrc(ads[`file${orientation}`])" :type="ads[`type${orientation}`]" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
      <img
        v-else
        :src="contentSrc(ads[`file${orientation}`])"
        class="ads__content__image"
      />
    </div>
  </div>
</template>
<script>
import Config from '../core/Config'
import windowSizes from '../core/utils/windowSizes';

export default {
  name: 'Ads',
  props: {
    ads: Object,
  },
  data() {
    return {}
  },
  computed: {
    windowSizes() {
      return windowSizes();
    },
    orientation() {
      const winSize = this.windowSizes;
      return  winSize.winW >= winSize.winH ? 'H' : 'V';
    }
  },
  methods: {
    isVideoType(path) {
      return ['mp4', 'quicktime', 'webm'].includes(path.split('/')[1]);
    },
    contentSrc(path) {
      return Config.url.baseurl(path);
    },
    close() {
      this.$emit('close-banner');
    }
  }
}

</script>
<style lang="scss">
.ads {
  overflow: hidden;

  &__overlay {
    &__button-close {
      position: absolute;
      right: 0;
      height: 40px;
      background: radial-gradient(black, transparent);
      border-radius: 50px;
      margin: 10px;
    }
  }

  &__content {
    &__image {
      height: 100%;
    }
  }
}

</style>
