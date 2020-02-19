<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <a class="bar-title" href="/">Outlook API</a>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.bar-title {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5em;
}
</style>
