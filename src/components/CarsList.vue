<template>
   <div class="auto-list">
      <div v-for="carData in filteredCarsList" :key="carData.id" class="auto-list__item car">
         <div class="car__image"><img :src="carData.imageSrc" /></div>
         <div class="car__content">
            <div class="car__name">{{ carData.name }}</div>
            <div class="car__descr">{{ carData.derc }}</div>
            <div class="car__prices prices">
               <div class="prices__price-in-dollar">{{ carData.price }} $</div>
               <div class="prices__price-in-uah">{{ getUahPrice(carData.price) }} грн</div>
            </div>
            <div class="car__references references">
               <div class="references__item">{{ carData.carMileage }}</div>
               <div class="references__item">{{ carData.city }}</div>
               <div class="references__item">{{ carData.fuel }}</div>
               <div class="references__item">{{ carData.transmission }}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   name: 'CarsList',
   computed: {
      ...mapGetters(['carsList', 'getUahPrice', 'filteredCarsList']),
   },
}
</script>

<style lang="scss" scoped></style>
