<template>
  <general-list-page
    delete-confirm-text="Пользователя"
    :headers="headers"
    :repository="$usersRepository"
  >
    <template #create-edit-sheet="{ editedUserId }">
      <create-edit-sheet
        :item-id="editedUserId"
        header-title="Пользователя"
        :repository="$usersRepository"
        :default-item="defaultUser"
      >
        <template #default="{ item }">
          <form-item label="ФИО пользователя или название склада">
            <flag-text-field
              v-model="item.first_name"
              :height="40"
              placeholder="ФИО Пользователя или название склада"
            />
          </form-item>

          <form-item label="Роль пользователя">
            <flag-select
              v-model="item.role"
              placeholder="Роль пользователя"
              :height="40"
              :items="roles"
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
      roles: [
        { text: 'Admin', value: 'admin' },
        { text: 'Warehouse Worker', value: 'worker' },
        { text: 'Forwarder', value: 'forwarder' },
        { text: 'Seller', value: 'seller' },
      ],
      headers: [
        {
          text: 'Имя',
          value: 'first_name',
        },
        {
          text: 'Роли',
          value: 'role',
        },
      ],
      defaultUser: {
        first_name: '',
        role: '',
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
