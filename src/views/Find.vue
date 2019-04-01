<template>
  <div>发现</div>
</template>

<script>
  export default {
    name: 'Find',
    created () {
      this.$store.state.showHeader = false
      this.$store.state.showBottomNav = true
    }

  }
</script>

<style scoped>

</style>
