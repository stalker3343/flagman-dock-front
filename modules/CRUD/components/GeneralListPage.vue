<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <v-container>
      <v-row v-if="showCreate">
        <v-col class="d-flex" cols="12">
          <v-spacer />
          <flag-btn color="primary-main" @click="isCreateEditSheetOpen = true">
            <v-icon>mdi-plus</v-icon>
            Создать
          </flag-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="page-wrapper">
            <v-alert v-if="$fetchState.error" class="py-4" type="error">
              Ошибка: {{ $fetchState.error.message }}
            </v-alert>
            <!-- <table-list-action-bar
              :is-shown="isActionBarShow"
              @delete="onMultipleDelete"
            /> -->
            <app-form-wrapper ref="formWrapper" :request-errors="[400, 404]">
              <template #default="{ isLoading }">
                <v-skeleton-loader v-if="$fetchState.pending" type="table" />

                <flag-table
                  v-model="selected"
                  :loading="isLoading"
                  show-select
                  :hide-default-footer="true"
                  :items="items"
                  :headers="innerActions"
                >
                  <template #item.actions="{ item }">
                    <slot name="actions" :item="item" />

                    <v-icon
                      v-if="showEdit"
                      class="mr-2"
                      @click="onEditItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon @click="onDeleteItem(item)"> mdi-delete </v-icon>
                  </template>
                  <template #no-data>
                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
                  </template>
                </flag-table>
              </template>
            </app-form-wrapper>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <flag-right-sheet v-model="isCreateEditSheetOpen" width="40%">
      <slot name="create-edit-sheet" :edited-user-id="editedUserId" />
    </flag-right-sheet>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    deleteConfirmText: {
      type: String,
      required: true,
    },
    repository: {
      type: Object,
      required: true,
    },
    showCreate: {
      type: Boolean,
      default: false,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [], //
      selected: [],
      isCreateEditSheetOpen: false,
      editedUserId: null,
    }
  },
  async fetch() {
    this.items = await this.repository.index()
  },
  computed: {
    innerActions() {
      return [
        ...this.headers,
        {
          value: 'actions',
          sortable: false,
          align: 'right',
          width: 200,
        },
      ]
    },
  },
  methods: {
    onEditItem(item) {
      this.isCreateEditSheetOpen = true
      this.editedUserId = item.id
    },

    async deleteEntity(id) {
      const res = await this.$refs.formWrapper.makeRequest(
        async () => await this.repository.delete(id)
      )
      if (res) {
        this.$notify.success({ text: 'Удаление прошло успешно' })
        this.$fetch()
      }
    },

    onDeleteItem(item) {
      this.$confirm({
        text: `Вы уверенны, что хотите удалить ${this.deleteConfirmText}?`,
      }).then((res) => {
        if (res) {
          this.deleteEntity(item.id)
        }
      })
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
