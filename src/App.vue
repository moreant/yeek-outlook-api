<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Outlook API</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-tabs :optional="true">
        <v-tab to="/home">首页</v-tab>
        <v-tab to="/setting">应用设置</v-tab>
        <v-tab to="/call">调用</v-tab>
      </v-tabs>

      <router-view></router-view>
      <v-row class="mt-10" justify="center">
        <v-col cols="6">
          <v-card class="mx-auto" outlined>
            <v-card-text>
              <v-text-field ref="uri" v-model="uri" clearable label="调用API 的 Uri" outline></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="call" text>调用</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    uri: ''
  }),
  methods: {
    call () {
      console.log(this.uri)
    }
  }
}
</script>

<style lang="scss">
</style>
