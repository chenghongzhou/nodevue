<template>
  <div>
    <Conent :conentlist=conentlist></Conent>

  </div>
</template>

<script>
import Conent from './Conent.vue'
export default {
  name: 'Index',
  props:['conentlist'],
  components: {
    Conent
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
