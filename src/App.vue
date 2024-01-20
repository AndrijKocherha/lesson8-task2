<template>
   <div>
      <cars-shop-manager />
   </div>
</template>

<script>
import CarsShopManager from './components/CarsShopManager.vue'

export default {
   name: 'App',
   components: { CarsShopManager },
}
</script>

<style lang="scss">
body {
   font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
}
@import './assets/style';
</style>
