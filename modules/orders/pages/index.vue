<template>
  <general-list-page
    delete-confirm-text="Заказ"
    :headers="headers"
    :repository="$ordersRepository"
  >
    <template #create-edit-sheet="{ editedItem }">
      <create-edit-sheet
        :item-id="editedItem"
        header-title="Заказа"
        :repository="$ordersRepository"
        :default-item="defaultOrder"
      >
        <template #default="{ item }">
          <form-item label="Название склада">
            <flag-text-field
              v-model="item.name"
              :height="40"
              placeholder="Название склада"
            />
          </form-item>

          <form-item label="Стутус заказа">
            <flag-select
              v-model="item.category"
              disabled
              item-text="name"
              placeholder="Категория товара"
              :height="40"
              :items="categories"
              return-object
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
    /*
    ("created", "Created"),
        ("shipped", "Shipped"),
        ("no_shipped", "No shipped"),
        ("completed", "Completed"),
        ("failed", "Failed"),

    */
    return {
      statusList: [
        { text: 'Created', value: 'created' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'No shipped', value: 'no_shipped' },
        { text: 'Completed', value: 'completed' },
        { text: 'Failed', value: 'failed' },
      ],
      headers: [
        {
          text: 'Название склада',
          value: 'name',
        },
        {
          text: 'Адресс',
          value: 'adress',
        },
      ],
      defaultOrder: {
        // status = models.CharField(choices=STATUSES, max_length=12)
        // products = models.ManyToManyField(Product, through="order_product")
        // seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
        // forwarder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, default=None, related_name="forwarders")
        // warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
        status: '',
        products: [],
        seller: null,
        forwarder: null,
        warehouse: null,
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
