<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" sm="6" xs="12">
          <img alt src="@/assets/outlook.png" style="width:128px;height:128px" />
          <h1>Yeek Outlook API</h1>
          <p>
            加入 Office 356 开发者 E5 订阅。获得 Office356 全家桶的使用权，以及
            OneDrive 的 5T 的云空间。仅需要简单的调用 Outlook API 即可续订 90 天
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="4" xs="12">
          <v-card class="mx-auto" outlined>
            <v-card-title primary-title>登录你的应用</v-card-title>
            <v-card-text>
              <p>仅支持登录 Microsoft<span class>工作</span>账号</p>
              <v-form v-model="valid">
                <v-text-field
                  :rules="rules"
                  clearable
                  label="应用程序 ID (client_id)"
                  outlined
                  v-model="clientId"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="valid" @click="dialog = true" text
                >路人体验</v-btn
              >
              <v-btn :disabled="!valid" :href="uri" text>登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">请记住路人账号的信息</v-card-title>
          <v-card-text>
            <br />
            <h3>账号：test@yeek.top</h3>

            <h3>密码：123yeek.top</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">算了</v-btn>
            <v-btn color="green darken-1" text :href="uri"
              >记住了</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    valid: false,
    rules: [v => !!v || '请填写应用 ID ，或者使用"路人体验"'],
    clientId: '',
    temp: false,
    dialog: false
  }),
  computed: {
    redirectUri () {
      return encodeURIComponent(process.env.VUE_APP_BASE_URL)
    },
    uri () {
      return (
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?' +
        `client_id=${this.clientId || process.env.VUE_APP_CLIENT_ID}` +
        '&response_type=token' +
        `&redirect_uri=${this.redirectUri}login` +
        '&scope=openid+' +
        'https%3A%2F%2Fgraph.microsoft.com%2Fuser.read +' +
        'https%3A%2F%2Fgraph.microsoft.com%2FMail.ReadWrite+' +
        'https%3A%2F%2Fgraph.microsoft.com%2Fmail.send' +
        '&response_mode=fragment' +
        `&nonce=${(Math.random() * 10000) | 0}` +
        'prompt=consent'
      )
    }
  },
  methods: {

  }
}
</script>
