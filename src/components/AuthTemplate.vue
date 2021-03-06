<template>
  <div class="main">
    <div class="main__template">
      <div :style="patternStyles.backgroundBody" class="main__template_content">
        <div class="main__template_content-form">
          <div
              v-if="patternData.logo"
              class="main__template_content-logo"
          >
            <img :src="getUrlImageByPath(patternData.logo)" alt="logo" class="main__template_content-logo-img"/>
          </div>
          <span
              v-if="patternData.header"
              :style="patternStyles.primaryColor"
              class="main__template_content-title">
              {{ patternData.header }}
            </span>
          <div class="login-form">
            <div
                :style="patternStyles.placeholder"
                class="login-form__input-wrapper">
              <input
                  id="phone"
                  ref="phoneInput"
                  v-model="phone"
                  :placeholder="patternData.placeholderPhoneText"
                  :style="patternStyles.placeholder"
                  autocomplete="off"
                  class="login-form__phone-input"
                  name="phone"
                  required
                  type="tel"
                  v-maska="['+7 (###) ##-##-##', '+7 (###) ###-##-##']"
              />
              <img v-if="isPhoneValid && phoneSend"
                   :style="patternStyles.fillIconCheck"
                   class="login-form__input-wrapper_check"
                   src="../assets/svg/check.svg"
              />
            </div>
            <div
                v-if="phoneSend"
                :class="{'login-form__input-wrapper_invalid': codeError}"
                :style="patternStyles.placeholder"
                class="login-form__input-wrapper code">
              <input
                  v-model="code"
                  :placeholder="patternData.placeholderCodeText"
                  :style="patternStyles.placeholder"
                  autocomplete="off"
                  class="login-form__code-input"
                  v-maska="'####'"
              />
              <img v-if="isPhoneValid && codeSend && code && !codeError"
                   :style="patternStyles.fillIconCheck"
                   class="login-form__input-wrapper_check"
                   src="../assets/svg/check.svg"
              />
            </div>
            <span v-if="codeError" class="code-error">
              {{ patternData.errorText }}
            </span>
            <div v-if="isPhoneValid && hasReceivedCode && !codeError" :style="patternStyles.accentColor" class="retry-block">
              <span v-if="timerId" class="retry-block__timer">
                Выслать повторно через {{ timeLeft }} секунд
              </span>
              <span
                  v-else-if="showRetry"
                  class="retry-block__resend"
                  @click="sendPhone"
              >
                Выслать повторно
              </span>
            </div>
            <button
                v-if="!phoneSend"
                :disabled="!isPhoneValid"
                :style="patternStyles.button"
                class="login-form__button"
                @click="sendPhone"
            >
              {{ patternData.confirmPhoneText }}
            </button>
            <button v-if="phoneSend" :style="patternStyles.button" class="login-form__button" @click="sendCode">
              Войти
            </button>
            <span
                :style="patternStyles.primaryColor"
                class="login-form__hint-text"
            >
                {{ hintText }}
            </span>
            <div class="agreement">
              <input v-model="agreementCheck" type="checkbox"/>
              <span
                  :style="patternStyles.primaryColor"
                  class="agreement__text"
              >
                  Подключаясь к WiFi сети, я даю согласие на обработку предоставленных мною персональных данных, в соответствии с
                  <a
                      :style="patternStyles.primaryColor"
                      href="https://auth.market-wifi.com/policyprivacy.html">
                    Политикой конфиденциальности
                  </a>
                  персональных данных.;
                </span>
            </div>
          </div>
        </div>
        <div class="main__template_content-information">
          <div
              v-if="patternData.additionalText1"
              :style="patternStyles.secondaryColor"
              class="additionalInfo"
          >
            {{ patternData.additionalText1 }}
          </div>
          <div
              :style="patternStyles.secondaryColor"
              class="terms"
          >
            {{ terms }}
          </div>
          <div
              :style="patternStyles.secondaryColor"
              class="provider"
          >
            Сервис предоставлен:
            <a
                :style="patternStyles.secondaryColor"
                href="https://market-wifi.com/"
                style="text-decoration: none;"
            >
              market-wifi.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '../core/Config'

const DEFAULT_TIMEOUT = 45;
export default {
  name: 'AuthTemplate',
  props: {
    patternData: Object,
  },
  components: {},
  data() {
    return {
      phoneSend: false,
      showRetry: false,
      timeLeft: DEFAULT_TIMEOUT,
      timerId: null,
      codeError: false,
      hasReceivedCode: false,
      codeSend: false,
      agreementCheck: true,
      code: '',
      phone: '',

      checkbox: false,
      hintText: '* Код - последние 4 цифры звонящего номера телефона. Отвечать на звонок не надо.',
      terms: 'Идентификация пользователей запрашивается в соответствии с Федеральным законом Российской Федерации от 05.05.2014 г. № 97-ФЗ, постановлениями Правительства РФ № 758 от 31.07.2014 и № 801 от 10.08.2014.',
    };
  },
  computed: {
     preparedPhone() {
      if (this.phone) {
        return this.phone.match(/\d+/gi).join('');
      }

      return '';
    },
    isPhoneValid() {
      if (this.preparedPhone.length === 11 && this.agreementCheck) {
        this.codeError = false;
        return true;
      } else {
        this.stopTimer()
        this.hasReceivedCode = false;
        this.phoneSend = false;
        this.codeError = false;
        this.codeSend = false;
        return false;
      }
    },
    patternStyles() {
      return {
        favicon: {
          backgroundImage: this.getImageByPath(this.patternData.favicon),
        },
        backgroundBody: {
          backgroundImage: this.getImageByPath(this.patternData.backgroundImage),
          backgroundColor: this.patternData.backgroundColor,
        },
        primaryColor: {
          color: this.patternData.primaryColor,
        },
        secondaryColor: {
          color: this.patternData.secondaryColor,
        },
        accentColor: {
          color: this.patternData.accentColor,
        },
        placeholder: {
          color: '#3A3937',
          '--placeholder-border-color': this.patternData.accentColor,
        },
        button: {
          '--color': this.patternData.confirmTextColor,
          '--background-color': this.patternData.accentColor,
          '--border-color': this.patternData.confirmBorderColor || 'transparent',
          '--color-hover': this.patternData.confirmTextColorHover,
          '--background-color-hover': this.patternData.confirmButtonColorHover,
          '--border-color-hover': this.patternData.confirmBorderColorHover || 'transparent',
        },
        fillIconCheck: {
          fill: this.patternData.accentColor,
        },
        fillCheckboxBack: {
          fill: '#FFFFFF',
        },
        fillCheckboxTick: {
          fill: this.patternData.accentColor,
        },
      };
    }
  },
  created() {
    setTimeout(() => {
      document.title = this.patternData.tabTitle // меняет название вкладки
      const favicon = document.getElementById("favicon");
      favicon.href = this.getUrlImageByPath(this.patternData.favicon);
    }, 100)
  },
  methods: {
    // Возвращает ссылку на изображение
    getImageByPath(imagePath) {
      if (/blob/.test(imagePath)) {
        return `url('${imagePath}')`;
      }

      return `url('${Config.url.baseurl(imagePath)}')`;
    },
    getUrlImageByPath(imagePath) {
      if (/blob/.test(imagePath)) {
        return imagePath;
      }

      return Config.url.baseurl(imagePath);
    },
    sendPhone() {
      console.warn('phone-send')
      this.phoneSend = true;
      this.hasReceivedCode = true;
      this.code = '';
      this.startTimer()
    },
    sendCode() {
      if (this.code === '1234') {
        this.codeError = false;
        console.warn('send code');
        this.codeSend = true;
      } else {
        this.codeError = true;
      }
    },
    startTimer() {
      this.timerId = setInterval(() => {
        const timeLeft = this.timeLeft;

        if (timeLeft <= 1) {
          this.stopTimer();

          return;
        }

        this.timeLeft = timeLeft - 1;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
      this.timeLeft = DEFAULT_TIMEOUT;
      this.showRetry = true;
    }
  }
}
</script>

<style lang="scss">
.main {
  height: 100%;

  &__template {
    position: absolute;
    top: 44px;
    left: 14px;
    right: 14px;
    bottom: 11px;
    display: flex;
    flex-direction: column;

    &_content {
      border-radius: 0 0 46px 46px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 16px 16px 16px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    &_content-title {
      font-size: 30px;
      font-weight: bold;
      line-height: 32px;
      text-align: center;
      display: block;
      margin-bottom: 10px;
    }

    &_content-logo {
      height: auto;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      margin-bottom: 10px;
    }

    &_content-logo-img {
      display: block;
      margin: 0 auto;
      max-width: 85%;
      max-height: 120px;
    }

    &_empty {
      text-align: center;
      color: #77708FFF;
      margin-top: 22px;
    }
  }
}

.login-form {
  display: flex;
  flex-direction: column;

  &__input-wrapper {
    width: 100%;
    padding: 10px 0 5px 0;
    background: #fff;
    border: none;
    border-bottom: 2px solid var(--placeholder-border-color);
    outline: none;
    position: relative;

    &_invalid {
      border-bottom: 2px solid #F56C6C;
    }

    &_check {
      position: absolute;
      height: 16px;
      width: 16px;
      right: 4px;
      top: 12px;
    }
  }

  .code {
    margin-top: 12px;
  }

  &__text {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0;
    text-align: center;
    display: block;
    margin-top: 4px;
  }

  &__phone-input {
    border: none;
    width: 100%;
    font-size: 20px;
    text-align: center;
    outline: none;
  }

  &__code-input {
    border: none;
    width: 100%;
    font-size: 20px;
    text-align: center;
    outline: none;
  }

  &__button {
    margin-top: 20px;
    border-radius: 12px;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0;
    text-align: center;
    padding: 20px;
    color: var(--color);
    background-color: var(--background-color);
    border: 2px solid var(--border-color);

    &:disabled {
      background: #ccc;
    }
  }

  &__button:hover {
    color: var(--color-hover);
    background-color: var(--background-color-hover);
    border: 2px solid var(--border-color-hover);
  }

  &__hint-text {
    padding-top: 18px;
    font-size: 13px;
    text-align: center;
  }
}

.agreement {
  display: flex;
  align-items: flex-start;
  padding: 15px 0 15px 0;

  &__check {
    font-size: 14px;
    padding-left: 1.2em;
    cursor: pointer;
  }

  &__check_input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__check_box {
    position: absolute;
    margin-left: -16px;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 50%;
    background-color: #fff;
  }

  &__checked {
    position: absolute;
    margin-left: -16px;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 50%;
  }

  &__text {
    margin-left: 5px;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0;
    text-align: left;
    display: block;
  }
}

.retry-block {
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  color: var(--accent-color);
}

.code-error {
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  color: #F56C6C;
}

.terms, .additionalInfo {
  font-size: 8px;
  line-height: 10px;
  margin-bottom: 8px;
}

.provider {
  font-size: 8px;
  line-height: 10px;
  text-align: center;
}
</style>
