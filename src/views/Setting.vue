<template>
  <v-container class="mt-10" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>应用信息</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="ID" name="login" type="text" />
              <v-text-field label="密码" name="password" type="text" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="save" color="primary">保存</v-btn>
            <v-btn :href="login" color="primary">登录</v-btn>
            <v-btn :href="logout" color="primary">注销</v-btn>
          </v-card-actions>
        </v-card>
        <a @click="q" href="javascript:;">aaa</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    msClientId: '6a0431fc-7814-484d-bbbc-3253a4641231',
    msClientSecret: 'R6ci/DxhZ0WiIs4zR?yfA==sKTmk1txJ',
    msRedirectUri: encodeURIComponent('http://localhost:8080/login/')
  }),
  computed: {
    login () {
      return (
        `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this.msClientId}` +
        '&response_type=token' +
        `&redirect_uri=${this.msRedirectUri}` +
        '&scope=openid+' +
        'https%3a%2f%2foutlook.office.com%2fMail.ReadWrite+' +
        'https%3a%2f%2foutlook.office.com%2fmail.send' +
        '&response_mode=fragment' +
        `&nonce=${(Math.random() * 10000) | 0}` +
        'prompt=consent'
      )
    },
    logout () {
      return 'https://login.microsoftonline.com/common/oauth2/v2.0/logout?' +
      `post_logout_redirect_uri=${this.msRedirectUri}`
    }
  },
  methods: {
    save () {}
  }
}
</script>

<style>
</style>
