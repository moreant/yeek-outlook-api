<template>
  <v-container class="mt-10" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>发送邮箱</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="ID" name="login" type="text" />
              <v-text-field label="密码" name="password" type="text" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="sendEmail" color="primary">发送</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Call',
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  methods: {
    async sendEmail () {
      this.axios({
        method: 'post',
        url: 'https://outlook.office.com/api/v2.0/me/sendmail',
        data: {
          Message: {
            Subject: 'Meet for lunch?',
            Body: {
              ContentType: 'Text',
              Content: 'The new cafeteria is open.'
            },
            ToRecipients: [
              {
                EmailAddress: {
                  Address: 'moreant@foxmail.com'
                }
              }
            ]
          }
        },
        headers: {
          'Content-type': 'application/json'
          // Authorization: `Bearer ${this.token}`
        }

      })
    }
  }

}
</script>

<style>
</style>
