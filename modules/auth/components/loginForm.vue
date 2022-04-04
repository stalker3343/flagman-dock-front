<template>
  <login-register-form-wrapper title="Вход">
    <div class="mx-auto">
      <v-form ref="form" @submit.prevent="login">
        <flagman-text-field
          ref="emailInput"
          v-model="form.username"
          :loading="loadingEmailValidation"
          name="username"
          :error-messages="validationRes.getErrors('username')"
          autocomplete="on"
          class="form-field"
          placeholder="Логин"
          label="Логин"
          @blur="validate('username')"
        />

        <flagman-text-field
          v-model="form.password"
          :error-messages="[
            ...validationRes.getErrors('password'),
            ...passswordErrors,
          ]"
          class="form-field"
          placeholder="Пароль"
          autocomplete="on"
          label="Пароль"
          name="password"
          type="password"
          @blur="validate('password')"
        />

        <flagman-btn
          :loading="loading"
          type="submit"
          :height="56"
          color="primary-main"
          block
        >
          Войти
        </flagman-btn>
        <div class="d-flex justify-center align-center mt-4">
          <div class="mr-2">Забыли пароль?</div>
          <flagman-btn
            color="dark-base"
            outlined
            :to="{
              name: 'restore-password',
              query: {
                username: form.username,
              },
            }"
          >
            Восстановить
          </flagman-btn>
        </div>
      </v-form>
    </div>
  </login-register-form-wrapper>
</template>

<script>
import LoginRegisterFormWrapper from './LoginRegisterFormWrapper.vue'
import getSuite from './suite'
import { getErrorInformation } from '@/utils/proccesErrors'
// import { USER_ROLES_DICTIONARY } from '@/modules/users/const'

export default {
  components: {
    LoginRegisterFormWrapper,
  },
  layout: 'clear',
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      loading: false,
      loadingEmailValidation: false,
      validationRes: null,
      validationSuite: null,
      passswordErrors: [],
    }
  },
  created() {
    // this.$commonRepository
    this.validationSuite = getSuite({}, this.$notify)
    this.validationRes = this.validationSuite.get()
  },
  methods: {
    validate(name) {
      this.passswordErrors = []
      return new Promise((resolve, reject) => {
        this.validationRes = this.validationSuite(
          this.form,
          name,
          this.validationSuite
        )
        if (name === 'username') {
          this.loadingEmailValidation = true
        }

        this.validationRes.done((res) => {
          this.loadingEmailValidation = false
          this.validationRes = res
          resolve()
        })
      })
    },

    async login() {
      await this.validate()
      const isValid = this.validationRes.isValid()
      if (!isValid) {
        this.$nextTick(() => {
          const errorElm = document.querySelector('.error--text')
          this.$scrollIntoView(errorElm)
        })
        return
      }
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: this.form,
        })

        // const redirectObj = {
        //   name: 'user-details',
        //   params: { id: this.$auth.user.id },
        // }
        // const isPartner = this.$auth.hasScope(USER_ROLES_DICTIONARY.PARTNER)
        // if (isPartner)
        //   redirectObj.query = {
        //     role: USER_ROLES_DICTIONARY.PARTNER,
        //     tab: 'academy',
        //   }
        // this.$router.push(redirectObj)
      } catch (error) {
        const { isErrorHandlingRequire, isRequestError, errorsList } =
          getErrorInformation(error, [400, 403])

        if (!isErrorHandlingRequire) return

        if (isRequestError) {
          this.passswordErrors = errorsList
          // this.$nextTick(() => {
          //   this.$scrollIntoView(this.$refs.errContainer.$el)
          // })
        } else {
          this.$notify.error({
            text: 'Произошла ошибка: ' + errorsList.join(';'),
          })
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 20px !important;
}
</style>
