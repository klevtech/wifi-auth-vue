<template>
  <ads :ads="ads" v-if="needShowAds" @close-banner="closeBanner"></ads>
  <template-wrapper v-else :templateData="pattern" />
</template>

<script>
import TemplateWrapper from '../components/TemplateWrapper.vue'
import Ads from '../components/Ads.vue'

export default {
  name: 'Main',
  components: {
    TemplateWrapper,
    Ads,
  },
  data() {
    return {
      pattern: {
        accentColor: "#005BAE",
        actionCodeText: "Введите код",
        actionPhoneText: "Введите номер телефона",
        additionalText1: "Кредит без обеспечения. Ставка (% годовых) – 5,5% при сумме кредита от 3 000 000,01 до 5 млн руб., для клиентов получающих заработную плату на банковские карты и счета Банка ГПБ (АО) и оформивших кредит через сайт банка и от 5,9% при оформлении кредита в офисе Банка ГПБ (АО), от 6,9% при сумме кредита от 3 000 000,01 до 5 млн руб., для остальных клиентов, от 7,9% - при сумме от 300 000 до 3 млн руб., от 8,9% - при сумме 100 000-299 999,99 руб., увеличивается на 6-7 п.п. для клиентов без личного страхования, в зависимости от категории заемщика. Срок кредита: от 13 до 84 мес. Подробнее на gazprombank.ru и по тел. 8-800-300-60-90 (беспл. Звонок на терр. РФ). Информация на 01.07.2021. Не оферта. Банк ГПБ (АО). Генеральная лицензия Банка России №354. Реклама.\nИдентификация пользователей запрашивается в соответствиии с Федеральным законом Российской Федерации от 05.05.2021г. № 97-ФЗ, постановлениями Правительства РФ № 758 от 31.07.2014г. и № 801 от 12.08.2014г.",
        additionalText2: "Сервис предоставлен: market-wifi.com",
        backgroundColor: "null",
        backgroundImage: "/store/files/33/d66118e1cb4ed500a3e9ad7f2409663e5d910aa4.png",
        confirmBorderColor: "#00A6FF",
        confirmBorderColorHover: "",
        confirmButtonColorHover: "#0C71CC",
        confirmCodeText: "Подтвердить номер",
        confirmPhoneText: "Авторизация по звонку",
        confirmTextColor: "#FFFFFF",
        confirmTextColorHover: "#091C58",
        createDate: "2021-11-16T18:12:24+03:00",
        errorColor: "",
        errorText: "Вы ввели неверный код",
        favicon: "/store/files/44/48704c5f9d5d3ea638c0f083c3361503ca908c20.png",
        governmentDecree: "Идентификация пользователей запрашивается в соответствии с Федеральным законом Российской Федерации от 05.05.2014 г. № 97-ФЗ, постановлениями Правительства РФ № 758 от 31.07.2014 и № 801 от 10.08.2014.",
        header: "СПОНСОР ВАШЕГО БЕСПЛАТНОГО WIFI ГАЗПРОМБАНК",
        logo: "/store/files/46/06348b621c8b4d8cc455d7ba316716161730d6de.png",
        patternGroupId: null,
        patternId: "1",
        patternLocationId: null,
        patternName: "ГазПром Синий1",
        patternOwner: "",
        patternOwnerId: "1",
        patternOwnerTypeId: null,
        patternScale: "reseller",
        patternStatus: "online",
        personalAgreement: "Подключаясь к WiFi сети, я даю согласие на обработку предоставленных мною персональных данных, в соответствии с Политикой конфиденциальности персональных данных.",
        placeholderCodeText: "Введите код",
        placeholderPhoneText: "Введите номер телефона",
        primaryColor: "#1B2B85",
        secondaryColor: "",
        tabTitle: "FREE WiFi",
      },
      ads: {
        bannerId: "11",
        fileH: "/store/banners/08562bedb8b60ce05c1d/31a1b452-5efb-4b15-8d69-ecb04fa85b14.jpg",
        fileV: "/store/banners/08562bedb8b60ce05c1d/6588c1ad-ce0e-438f-99aa-023be465ba82.jpg",
        // fileV: "/store/banners/c273b6e669ac32a6dd5e/29d732e4-3740-4edc-952b-6c77c37394d0.mp4",
        typeH: "image/jpeg",
        typeV: "image/jpeg",
        // typeV: "video/mp4",
        nosound: false
      },
      needShowAds: true
    }
  },
  computed: {
  },
  created() {
    // const locationId = Number(this.$route.params.id);
    // получить id площадки из url редиректа
    // сделать запос на получение get-pattern-location Получение шаблона по id площадки
    // TemplateService.getPattern({ locationId: this.$route.params.id })
  },
  methods: {
    closeBanner() {
      this.needShowAds = false;
    }
  }
};
</script>
