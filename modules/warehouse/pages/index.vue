<template>
  <general-list-page
    :show-create="false"
    :show-edit="false"
    delete-confirm-text="Стратегию"
    :headers="headers"
    :repository="$history"
  >
    <template #actions="item">
      <v-icon class="mr-3" @click="onStratUse(item)"> mdi-check </v-icon>
    </template>
  </general-list-page>
</template>

<script>
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'

export default {
  components: {
    GeneralListPage,
  },
  data() {
    return {
      headers: [
        {
          text: 'Название Стратегии',
          value: 'name',
        },
      ],
    }
  },
  methods: {
    onStratUse(item) {},
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;

  border-radius: 10px;
  padding: 10px 20px;
}
</style>
