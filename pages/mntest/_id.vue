<template>
  <div>
    <h1>MNtest ID</h1>
    <nuxt-link to="/mntest/">もどる</nuxt-link>
    <h2>{{ posts.title.rendered }}</h2>
    <div v-html="posts.content.rendered">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  async asyncData({ $config , params }) {
    const posts = await axios.get(
        $config.apiMNtest + 'wp/v2/posts/' + params.id,
    ).then((res) =>{
      return { posts: res.data}
    })
    console.log(posts)
    return posts
  },  
}
</script>