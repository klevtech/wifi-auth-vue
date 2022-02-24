<template>
  <auth-template :patternData="templateData"/>
</template>
<script>

import AuthTemplate from '../components/AuthTemplate.vue'

export default {
  name: 'TemplateWrapper',
  props: {
    templateData: Object,
  },
  components: {
    AuthTemplate
  }
}

</script>
<style></style>
