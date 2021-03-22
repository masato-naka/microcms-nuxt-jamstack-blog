<template>
  <main>
    <h1 class="text-xl font-bold">tag - {{ tag.name }}の記事一覧</h1>
    <ul>
      <li v-for="post in postTag.contents" :key="post.id">
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
    let test = this.$route.params.id
    console.log(test)   
  },
  async asyncData({ $config , params }){
    let tagId = params.id
    const resTag = await axios.get(
        $config.apiRoot + '/tag/' + tagId,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    const postTag = await axios.get(
      $config.apiRoot + '/blog/' +
      '?limit=10'+
      '&fields=id,title,publishedAt' +
      '&orders=publishedAt' +
      '&filters=tags[contains]' + tagId,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    return{
      tag: resTag.data,
      postTag: postTag.data
    }
  },
}

</script>