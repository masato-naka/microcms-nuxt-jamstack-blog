<template>
  <main class="main m-4">
    categoryID
  </main> 
</template>

<script>
import axios from 'axios'

export default {
  layout: 'blog',
  created(){
    let test = this.$route.params['categories']
    console.log(test)    
  },

  async asyncData( {$config }) {
    const { data } = await axios.get(
        $config.apiRoot + `/categories/`,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    console.log(data)
    return data
  },
}

</script>