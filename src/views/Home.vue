<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" sm="6" xs="12">
          <v-avatar size="128">
            <img ref="img" alt />
          </v-avatar>
          <h1>欢迎使用，{{ infos.name }}</h1>
          <p>请选择你想调用的 API (暂时只有发送邮件)</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" sm="4" xs="12">
          <v-card class="mx-auto pa-5" outlined>
            <v-card-title primary-title>发送邮件</v-card-title>
            <v-card-text>
              <p>发件人: {{ infos.emailAddress }}</p>
              <v-form v-model="valid">
                <v-text-field
                  v-model="form.address"
                  :rules="emailRules"
                  clearable
                  label="收件人"
                  outlined
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="form.subject"
                  :rules="rules"
                  clearable
                  label="主题"
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="form.content"
                  :rules="rules"
                  clearable
                  label="正文"
                  outlined
                  rows="3"
                ></v-textarea>
              </v-form>
              <p>发送自 Yeek-Outlook-API</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :disabled="!valid" @click="sead">发送</v-btn>
            </v-card-actions>
          </v-card>
          <br />
          <p class="text-center">
            <a :href="url" @click="logout">注销</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    valid: false,
    rules: [v => !!v || '这项是必须的'],
    emailRules: [
      v => !!v || '电子邮箱是必须的',
      v => /.+@.+\..+/.test(v) || '这不是电子邮箱'
    ],
    form: {
      subject: '',
      content: '',
      address: ''
    }
  }),
  computed: {
    url () {
      return (
        'https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=' +
        encodeURIComponent(process.env.VUE_APP_BASE_URL)
      )
    },
    infos () {
      return this.$store.state.infos
    }
  },
  mounted () {
    this.photo()
  },
  methods: {
    logout () {
      this.$store.dispatch('removeToken')
    },
    async photo () {
      await this.axios({
        method: 'get',
        url: 'https://graph.microsoft.com/v1.0/me/photo/$value',
        responseType: 'blob'
      }).then(response => {
        const url = window.URL || window.webkitURL
        const blobUrl = url.createObjectURL(response)
        this.$refs.img.src = blobUrl
      })
    },
    sead () {
      // this.valid = false
      return new Promise((resolve, reject) => {
        this.axios({
          method: 'POST',
          url: 'https://graph.microsoft.com/v1.0/me/sendMail',
          data: {
            Message: {
              Subject: this.form.subject,
              Body: {
                ContentType: 'HTML',
                Content:
                  '<html>' +
                  `<p>${this.form.content}</p>` +
                  '<p>发送自 <a href="https://www.github.com/moreant/yeek-outlook-api">Yeek-Outlook-API</a></p>' +
                  '</html>'
              },
              ToRecipients: [
                {
                  EmailAddress: {
                    Address: this.form.address
                  }
                }
              ]
            },
            SaveToSentItems: 'true'
          }
        }).catch(error => {
          if (error === 400) {
            console.log('发送失败')
          }
        })
      })
    }
  }
}
</script>

<style></style>
