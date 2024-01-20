import { createStore } from 'vuex'
import { carType, dollarRate } from './defaultSettings'
//const dollarRate = 38
export default createStore({
   state: {
      carsList: [],
      filterSettings: {
         carType: carType,
         bodyTypes: [],
         carBrand: null,
         carModel: null,
         years: {
            //=== 1 задаю для того щоб список фільтрувався коли я вибираю лише до якої дати мусить бути автомобль
            minYear: 1,
            maxYear: new Date().getFullYear(),
         },
      },
   },
   getters: {
      carsList: ({ carsList }) => carsList,
      getUahPrice: () => (price) => price * dollarRate,
      filterSettings: ({ filterSettings }) => filterSettings,
      //====
      filteredCarsList: (state) => {
         const { carType, bodyTypes, carBrand, carModel, years } = state.filterSettings
         return state.carsList.filter((carData) => {
            //let res = true
            //let carType = state.filterSettings.carType
            //if (carType) res = carData.vehicleType.toLowerCase() === carType.toLowerCase()
            //if (!res) return res
            //let bodyTypes = state.filterSettings.bodyTypes
            //if (bodyTypes.length >= 1) {
            //   res = bodyTypes.includes(carData.bodyType)
            //}
            //if (!res) return res

            //let carBrand = state.filterSettings.carBrand
            //if (carBrand) {
            //   res = carBrand.toLowerCase() === carData.brand.toLowerCase()
            //}
            //if (!res) return res

            //let carModel = state.filterSettings.carModel
            //if (carModel) res = carData.model.toLowerCase() === carModel.toLowerCase()
            //if (!res) return res

            //let years = state.filterSettings.years
            //if (years.minYear || years.maxYear) {
            //   res = carData.year >= years.minYear && carData.year <= years.maxYear
            //}
            //return res
            //=====================================================================

            return (
               (!carType || carType.toLowerCase() === carData.vehicleType.toLowerCase()) &&
               (bodyTypes.length === 0 || bodyTypes.includes(carData.bodyType)) &&
               (!carBrand || carBrand.toLowerCase() === carData.brand.toLowerCase()) &&
               (!carModel || carData.model.toLowerCase() === carModel.toLowerCase()) &&
               (!years.minYear || !years.maxYear || (carData.year >= years.minYear && carData.year <= years.maxYear))
            )
         })
      },
   },
   mutations: {
      onSetCarsList(state, list) {
         state.carsList = list
      },
      onSetCarType(state, type) {
         state.filterSettings.carType = type
         console.log(state.filterSettings)
         state.filterSettings.bodyTypes = []
      },
      onSetBodyTypes(state, types) {
         state.filterSettings.bodyTypes = types
      },
      onSetCarBrand(state, brand) {
         state.filterSettings.carBrand = brand
         state.filterSettings.carModel = null
      },
      onSetCarModel(state, model) {
         state.filterSettings.carModel = model
      },
      onsetYear(state, { type, value }) {
         state.filterSettings.years[type + 'Year'] = value
      },
   },
   actions: {
      setCarsList({ commit }, list) {
         commit('onSetCarsList', list)
      },
      setCarType({ commit }, type) {
         commit('onSetCarType', type)
      },
      setBodyTypes({ commit }, types) {
         commit('onSetBodyTypes', types)
      },
      setCarBrand({ commit }, brand) {
         commit('onSetCarBrand', brand)
      },
      setCarModel({ commit }, model) {
         commit('onSetCarModel', model)
      },
      setYear({ commit }, { type, value }) {
         commit('onsetYear', { type, value })
      },
   },
})
