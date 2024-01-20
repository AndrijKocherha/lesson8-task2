<template>
   <div class="cars-manager">
      <filter-block />
      <cars-list />
   </div>
</template>

<script>
import CarsList from './CarsList.vue'
import FilterBlock from './FilterBlock.vue'
import { carsList } from './data/carsData'
import { mapActions } from 'vuex'
export default {
   name: 'CarsShopManager',
   methods: {
      ...mapActions(['setCarsList']),
   },
   created() {
      this.setCarsList(carsList)
   },
   components: { CarsList, FilterBlock },
}
</script>

<style lang="scss" scoped></style>
