<template>
  <main class="main">
    <h1 class="title bg-gray-300 hover:bg-gray-400">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="category">{{ category && category.name }}</div>
    <div class="post" v-html="body"></div>
    <nuxt-link to="/">戻る</nuxt-link>
    <br><br>
    <div class="todo">
      <h2 class="mb-2 px-2 text-xl">New Todo</h2>
      <form class="mb-4 px-4">
        <input type="text" class="p-2 border" />
        <button class="ml-2 p-2 rounded text-white bg-blue-500">submit</button>
      </form>
      <h2 class="mb-2 px-2 text-xl">List Todo</h2>
      <ul class="py-2 px-4">
        <li class="p-2 border">
          <p class="border-b">todo 1</p>
          <p class="text-sm">2020 05/12</p>
        </li>
        <li class="mt-2 p-2 border">
          <p class="border-b">todo 2</p>
          <p class="text-sm">2020 05/12</p>
        </li>
        <li class="mt-2 p-2 border">
          <p class="border-b">todo 3</p>
          <p class="text-sm">2020 05/12</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData( {$config , params }) {
    const { data } = await axios.get(
      `https://unifatestblog.microcms.io/api/v1/blog/${params.slug}`,
      {
        headers:{ 'X-API-KEY' : $config.apiKey }
      }
    )
    return data
  }
}

</script>