<template>
  <div>
    <label class="sr-only" for="locale-switcher">Language Select</label>
    <select id="locale-switcher" class="bg-transparent cursor-pointer" v-model="locale" @change="$i18n.locale = locale">
      <option value="en-US">English</option>
      <option value="es-AR">Español</option>
      <option value="pt-BR">Português</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  data() {
    return { locale: 'en-US' }
  }
}
</script>
