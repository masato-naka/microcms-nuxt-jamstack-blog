<template>
  <main>
    <h1>About 2</h1> 
    {{ testFunc() }}
  </main>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods:{
    testFunc(){
      console.log(this.$store)
    }
  },
  ...mapMutations({
      blog: 'blog/blog'
  })  
}
</script>