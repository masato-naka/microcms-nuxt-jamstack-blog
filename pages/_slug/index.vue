<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="body"></div>
  </main>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  async asyncData({ params }:{params: any}) {
    const { data } = await axios.get(
      `https://unifatestblog.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers:{ 'X-API-KEY' : '85261492-bf2d-412f-bdc8-2b6e6edb21ea'}
      }
    )
    return data
  }
}

</script>