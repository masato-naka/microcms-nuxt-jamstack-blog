<template>
  <div>
    <h1>MN test</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <nuxt-link :to="`${post.id}`">
          {{ post.title.rendered }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  async asyncData({ $config }) {
    const posts = await axios.get(
        $config.apiMNtest + 'wp/v2/posts?orderby=date&per_page=10',
    ).then((res) =>{
      return { posts: res.data}
    })
    console.log(posts)
    return posts
  },
}

</script>
