<template>
  <general-list-page
    :show-create="false"
    :show-edit="false"
    delete-confirm-text="Стратегию"
    :headers="headers"
    :repository="customHistoryReposytory"
    @update-items="onUpdateItems"
  >
    <template #top>
      <v-row>
        <v-col cols="12">
          <flag-select
            v-model="selectedHeaders"
            multiple
            label="Настроить столбцы"
            :items="headersList"
          />
        </v-col>
      </v-row>
    </template>
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
      fixedHeaders: [
        {
          text: 'Название Стратегии',
          value: 'name',
        },
      ],
      selectedHeaders: [],
      listItems: [],
      customHistoryReposytory: {
        ...this.$history,
        index: async (params) => {
          let items = await this.$history.index(params)
          items = items.map((el) => {
            const resp = JSON.parse(el.response_values)

            const normalizedResp = {}
            for (const [key, value] of Object.entries(resp)) {
              const normKey = key.replace(' ', '_')
              normalizedResp[normKey] = value
            }

            return {
              ...el,
              response_values: normalizedResp,
            }
          })
          return items
        },
      },
    }
  },
  computed: {
    headers() {
      const normalizedSelectedHeaders = this.selectedHeaders.map((el) => ({
        text: el,
        value: 'response_values.' + el,
      }))
      return [...this.fixedHeaders, ...normalizedSelectedHeaders]
    },
    headersList() {
      if (!this.listItems.length) return []
      return Object.keys(this.listItems[0].response_values)
    },
  },
  methods: {
    onStratUse(item) {},
    onUpdateItems(items) {
      console.log(
        '🚀 ~ file: index.vue ~ line 85 ~ onUpdateItems ~ onUpdateItems'
      )
      this.listItems = items
    },
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
