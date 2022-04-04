<template>
  <div />
</template>

<script>
export default {
  async asyncData({ $warehouseRepository, params }) {
    const warhouse = await $warehouseRepository.show(params.id)
  },
}
</script>

<style></style>
