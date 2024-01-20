<template>
   <div>
      <div class="filter-item">
         <div class="filter-item__title">Тип тронспрта</div>
         <select v-model="vehicleType">
            <option :value="null">Усі типи</option>
            <option
               v-for="bodyAndVehicleType in bodyTypesAndVehicleTypes"
               :value="bodyAndVehicleType.vehicleTypeName"
               :key="bodyAndVehicleType.id"
            >
               {{ bodyAndVehicleType.vehicleTypeName }}
            </option>
         </select>
      </div>
      <div class="filter-item">
         <div class="filter-item__title">Тип кузова</div>
         <label v-for="bodyType in bodyTypes" :key="bodyType">
            <input v-model="selectredBodyTypes" :value="bodyType" type="checkbox" /> {{ bodyType }}</label
         >
      </div>
      <div class="filter-item">
         <div class="filter-item__title">Марка</div>
         <select v-model="selectedCarBrand">
            <option v-for="carsBrandAndModels in carsBrandsAndModels" :key="carsBrandAndModels.id">
               {{ carsBrandAndModels.name }}
            </option>
         </select>
      </div>
      <div class="filter-item">
         <div class="filter-item__title">Модель</div>
         <select v-model="selectedCarModel">
            <option v-for="carModel in carModels" :value="carModel" :key="carModel">{{ carModel }}</option>
         </select>
      </div>
   </div>
   <div class="filter-item">
      <div class="filter-item__title">рік</div>
      <div>
         <select @change="onSetYear('min', $event)">
            <option selected disabled :value="0">від</option>
            <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
         </select>
         <select @change="onSetYear('max', $event)">
            <option selected disabled :value="0">до</option>
            <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
         </select>
      </div>
   </div>
</template>

<script>
import { bodyTypesAndVehicleTypes, carsBrandsAndModels } from './data/carsData'
import { mapActions, mapGetters } from 'vuex'
const startYear = 1997
export default {
   name: 'FilterBlock',
   data() {
      return {
         bodyTypesAndVehicleTypes,
         carsBrandsAndModels,
         years: [],
      }
   },

   computed: {
      ...mapGetters(['filterSettings']),
      vehicleType: {
         get() {
            return this.filterSettings.carType
         },
         set(newCartype) {
            this.setCarType(newCartype)
         },
      },
      bodyTypes() {
         if (this.vehicleType)
            return this.bodyTypesAndVehicleTypes.find((item) => item.vehicleTypeName === this.vehicleType).bodyTypes
         return null
      },
      carModels() {
         if (this.filterSettings.carBrand)
            return carsBrandsAndModels.find((item) => item.name === this.selectedCarBrand).models

         return []
      },
      selectredBodyTypes: {
         get() {
            return this.filterSettings.bodyTypes
         },
         set(newTypes) {
            this.setBodyTypes(newTypes)
         },
      },
      selectedCarBrand: {
         get() {
            return this.filterSettings.carBrand
         },
         set(newBrand) {
            this.setCarBrand(newBrand)
         },
      },
      selectedCarModel: {
         get() {
            return this.filterSettings.carModel
         },
         set(model) {
            this.setCarModel(model)
         },
      },
   },
   methods: {
      ...mapActions(['setCarType', 'setBodyTypes', 'setCarBrand', 'setCarModel', 'setYear']),
      generateYears() {
         const curYear = new Date().getFullYear()
         for (let i = curYear; i >= startYear; i--) {
            this.years.push(i)
         }
      },
      onSetYear(type, e) {
         let year = parseFloat(e.target.value)
         this.setYear({ type, value: year })
      },
   },
   watch: {},

   created() {
      this.generateYears()
   },
}
</script>

<style lang="scss" scoped></style>
