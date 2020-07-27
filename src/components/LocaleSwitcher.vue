<template>
  <label>
    <select class="bg-transparent" v-model="locale" @change="$i18n.locale = locale">
      <option value="en-US">English</option>
      <option value="es-AR">Español</option>
      <option value="pt-BR">Português</option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  data() {
    return { locale: 'en-US' }
  }
}
</script>
