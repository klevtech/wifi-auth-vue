<template>
  <!-- ToDO сделать общую обёртку над страницами авторизации, так как их может быть несколько-->
  <!-- <ads /> -->
  <auth-template/>
</template>

<script>
import AuthTemplate from '../components/AuthTemplate.vue'
export default {
  components: {
    AuthTemplate,
  },
  setup() {
    return {};
  },
};
</script>
