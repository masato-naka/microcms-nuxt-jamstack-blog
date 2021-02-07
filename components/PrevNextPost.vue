<template>
  <div>
    <div v-if="prev !== undefined">
      <nuxt-link :to="`/post/${prev.id}`">←前の記事（{{ prev.title }}）</nuxt-link>
    </div>
    <div v-if="next !== undefined">
      <nuxt-link :to="`/post/${next.id}`">→次の記事（{{ next.title }}）</nuxt-link>
    </div> 
  </div>
</template>

<script>
export default {
  props: ['next','prev'],
  data() {
    return{
      test: {
        nextTest : 'testだぞ'
      }
    }
  },
  mounted(){
    console.log(this.test.nextTest)
  } 
}
</script>