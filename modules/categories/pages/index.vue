<template>
  <general-list-page
    delete-confirm-text="Категорию"
    :headers="headers"
    :repository="$categoryRepository"
  >
    <template #create-edit-sheet="{ editedItem }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="Категориии"
        :repository="$categoryRepository"
        :default-item="defaultCategory"
      >
        <template #default="{ item }">
          <form-item label="Название категории">
            <flag-text-field
              v-model="item.name"
              :height="40"
              placeholder="Название категории"
            />
          </form-item>
        </template>
      </create-edit-sheet>
    </template>
  </general-list-page>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'

export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
  },

  data() {
    return {
      headers: [
        {
          text: 'Имя',
          value: 'name',
        },
      ],
      defaultCategory: {
        name: '',
      },
    }
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
