<template>
  <main class="main m-4">
    <h1 class="text-xl font-bold">category - {{ category.name }}の記事一覧</h1>
    <ul>
      <li v-for="post in posts.contents" :key="post.id">
        <nuxt-link :to="`/post/${post.id}`">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
    <nuxt-link to="/">戻る</nuxt-link>
  </main> 
</template>

<script>
import axios from 'axios'

export default {
  layout: 'blog',
  created(){
    let test = this.$route.params['categories']
    console.log(test)    
    console.log(this.posts)
  },
  async asyncData( {$config , params }) {
    let categoryId = params['categories']
    const res = await axios.get(
        $config.apiRoot + `/categories/` + categoryId,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )

    const posts = await axios.get(
      $config.apiRoot + '/blog/' +
      '?limit=10'+
      '&fields=id,title,publishedAt' +
      '&orders=publishedAt' +
      '&filters=category[equals]' + categoryId,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    return{
      category: res.data,
      posts: posts.data
    }
  },
}

</script>