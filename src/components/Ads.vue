<template>
  <div class="ads">
    <div class="ads__overlay">
      <div class="ads__overlay__progress"></div>
      <img v-if="showCloseButton" src="/svg/close.svg" class="ads__overlay__button-close" alt="Закрыть баннер" @click="showNextBanner" />
      <img v-if="pixelUrl" class="ads__overlay__pixel" :src="pixelUrl" alt="">
    </div>
    <div class="ads__content" :style="{width: `${windowSizes.winW}px`, height: `${windowSizes.winH}px`}" @click="handleBannerClick">
      <img
        v-if="isImageType"
        :src="contentSrc(currentBanner.file)"
        class="ads__content__image"
        alt="Баннер"
      />
      <video
        class="ads__content__video"
        v-else
        autoplay
        playsinline
        preload="auto"
        muted
        @click="clickVideo"
        :style="{width: `${windowSizes.winW}px`, height: `${windowSizes.winH}px`}"
      >
        <source :src="contentSrc(currentBanner.file)" :type="ads[`type${orientation}`]" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>

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
    return {
      currentBannerCount: 0,
      showCloseButton: false,
      pixelUrl: ''
    }
  },
  computed: {
    windowSizes() {
      return windowSizes();
    },
    orientation() {
      const winSize = this.windowSizes;
      return winSize.winW >= winSize.winH ? 'H' : 'V';
    },
    currentBanner() {
      return this.ads.banners[this.currentBannerCount];
    },
    isImageType() {
      return ['peg', 'jpg', 'png', 'gif'].includes(this.currentBanner.file.substr(-3))
    },
  },
  methods: {
    close() {
      this.$emit('close-banner');
    },
    contentSrc(path) {
      return Config.url.baseurl(path);
    },
    clickVideo() {
      if (this.currentBanner.url) {
        return window.open(this.currentBanner.url, '_blank');
      }
    },
    handleBannerClick() {
      this.sendClickStatistics()
    },
    sendClickStatistics() {
      // get URL: baseurl/click/{locationId}/{bannerId}/
    },
    showNextBanner() {
      this.showCloseButton = false;
      let banner;

      if (this.currentBannerCount < this.ads.banners.length) {
        banner = this.ads.banners[this.currentBannerCount];

        if (typeof banner.pixelurl === 'string' && '' !== banner.pixelurl) {
          const currentDate = Date.now()
          this.pixelUrl = banner.pixelurl.replace(/\[timestamp\]/g, currentDate.toString())
        }

        if (banner.length > 0) {
          setTimeout(() => {
            this.showCloseButton = true;
          }, (banner.length - 5) * 1000)
        }

        this.currentBannerCount += 1;
      } else {
        this.close();
      }
    }
  },
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

    &__pixel {
      margin-top: -1px;
      width: 1px;
      height: 1px;
      opacity: 0;
    }
  }

  &__content {
    &__image {
      height: 100%;
    }
  }
}

</style>
