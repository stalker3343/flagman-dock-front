<template>
  <v-input :rules="innerRules" hide-details="auto" :value="value">
    <input
      v-bind="$attrs"
      ref="input"
      v-imask="{ mask: Date, lazy: true }"
      class="date-input"
      :value="value"
      :placeholder="rowName"
      @accept="$emit('input', $event.detail.value)"
      @blur="editMode = false"
      @focus="editMode = true"
    />
  </v-input>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { IMaskDirective } from 'vue-imask'

export default defineComponent({
  directives: {
    imask: IMaskDirective,
  },
  inheritAttrs: false,
  props: {
    isRequired: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    rowName: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    innerRules() {
      const rules = this.rules
      if (this.isRequired) {
        rules.push((v) => !!v || 'Заполните поле')
      }
      return rules
    },
  },
})
</script>

<style lang="scss" scoped>
.date-input {
  outline: none;
  &::placeholder {
    color: rgb(0, 0, 0, 0.38);
  }
}
</style>
