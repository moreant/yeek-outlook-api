<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" sm="6" xs="12">
          <v-avatar color="orange" size="128">
            <img
              alt
              src="https://outlook.office.com/api/v2.0/me/photo/$value"
            />
          </v-avatar>
          <h1>欢迎使用，{{ infos.alias }}</h1>
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
              <p>发送自 Outlook-Api</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :disabled=!valid @click="sead">发送</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    url: 'https://outlook.office.com/api/v2.0/me/sendmail',
    valid: false,
    rules: [
      v => !!v || '这项是必须的'
    ],
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
    infos () {
      return this.$store.state.infos
    }
  },
  methods: {
    sead () {
      return new Promise((resolve, reject) => {
        this.axios({
          method: 'POST',
          url: 'https://outlook.office.com/api/v2.0/me/sendmail',
          data: {
            Message: {
              Subject: this.form.subject,
              Body: {
                ContentType: 'HTML',
                Content:
                  '<html>' +
                  `<p>${this.form.content}</p>` +
                  '<p>发送自 <a href="https://www.github.com/moreant/outlook-api">Outlook-API</a></p>' +
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
